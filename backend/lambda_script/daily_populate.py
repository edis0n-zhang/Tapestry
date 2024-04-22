import os
from dotenv import load_dotenv
import requests
import json
from datetime import datetime, timedelta

from openai import OpenAI
from pinecone import Pinecone

import instructor
from pydantic import BaseModel, create_model

from newsapi import NewsApiClient

import tqdm  # progress bar

# Helper classes
from article_scraper import ArticleScraper

import pprint

from mongo_helper import Mongo_Helper

load_dotenv()

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
MONGODB_USERNAME = os.getenv('MONGODB_USERNAME')
MONGODB_PASSWORD = os.getenv('MONGODB_PASSWORD')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

pp = pprint.PrettyPrinter(indent=4)

def grab_news():
    api = NewsApiClient(api_key=str(NEWS_API_KEY))

    articles_by_source = {}
    us_news_sources = ["abc-news", "associated-press", "breitbart-news", "business-insider", "cbs-news", "cnn", "fortune", "fox-news", "msnbc", "nbc-news", "the-washington-times", "time", "usa-today", "vice-news"]

    for source in us_news_sources:
        # print(source)
        response_data = api.get_everything(sources = source, page_size = 100, sort_by = "publishedAt", language = "en")
        articles_by_source[source] = response_data["articles"]

    return articles_by_source

def push_headlines_to_pinecone(source_articles):
    client = OpenAI()
    pc = Pinecone()
    index = pc.Index("news-piece")
    current_time = datetime.now()

    total_article_count = sum(len(articles) for articles in source_articles.values())

    # List with values as title and description of the articles
    to_be_embedded = {}
    embedded_headlines = {}
    for source, articles in source_articles.items():
        to_be_embedded[source] = [f"{article['title']}: {article['description']}" for article in articles]

    #pass this title/description to openAI text-embedding-3-small
    for source, articles in to_be_embedded.items():
        embedded_headlines[source] = client.embeddings.create(
            model="text-embedding-3-small",
            input=articles
        )

    pbar = tqdm.tqdm(total=total_article_count, desc="Uploading Articles")

    for source, articles in source_articles.items():
        #Iterate through each article
        for i in range(len(articles)):
            article = articles[i]
            date = article["publishedAt"][:10]

            # Push the embedding vector to pinecone
            index.upsert(
                vectors=[
                    {
                        "id" : article['source']['id'] + str(i) + "-" + date,
                        "values" : embedded_headlines[source].data[i].embedding,
                        "metadata": {
                                        "headline": article["title"],
                                        "url": article['url'],
                                        "source": article['source']['name'],
                                        "date": date
                                    }
                    }
                ]
            )

            pbar.update(1)

def group_articles(source_articles, epsilon):
    organized_headlines = {}
    used_articles = set()

    client = OpenAI()
    pc = Pinecone()
    index = pc.Index("news-piece")
    previous_day = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')

    total_article_count = sum(len(articles) for articles in source_articles.values())

    pbar = tqdm.tqdm(total=total_article_count, desc="Grouping Articles")

    #Iterate through each article
    for source, articles in source_articles.items():
        pbar.update(len(articles))
        for i in range(len(articles)):

            article = articles[i]

            date = article["publishedAt"][:10]
            article_id = article['source']['id'] + str(i) + "-" + date
            #We need the article_url to check if the article is already in another category
            article_url = article['url']

            #If this article is already in another category, we skip it.
            if article_url in used_articles:
                # print(used_articles)
                # print(article_url)
                break

            #Send query using given article_id
            query_response = index.query(
                id= article_id,
                top_k=14,
                include_values=False,
                include_metadata=True,
                filter={"date" : previous_day}
            )

            similar_headlines = []
            seen_sources = set()

            for match in query_response["matches"]:
                if match['metadata']['source'] in seen_sources:
                    continue

                #If the current article is not close enough to be on the same subject, skip other query results and begin new query
                if (match["score"] < epsilon):
                    break

                response_source = match['metadata']['source']
                response_url = match['metadata']['url']

                #If the articles already exist in the dictionary, don't add them again
                if (response_url in used_articles):
                    continue

                #if both conditions have been passed, then append article to the list of similar headlines
                similar_headlines.append((response_url, response_source))
                seen_sources.add(response_source)

            #add similar_headlines list to dict
            if len(similar_headlines) >= 3:
                # similar_headlines.append((article_url, source))
                organized_headlines[len(organized_headlines)] = similar_headlines
                for url, source in similar_headlines:
                    used_articles.add(url)

    return organized_headlines

def generate_article(articles, sources):

    prompt = '''
    You are an expert journalist AI tasked with generating a comprehensive news article by combining information from multiple news sources provided by the user. Your primary objective is to create an accurate, professional, and well-structured article that presents accurate information.

    You will be passed in articles from various news sources, each containing their reporting on a specific topic. Your task is to generate a single article that summarizes the information from all sources, highlighting universally agreed-upon facts and any disputed information.

    Follow this format for the generated article:

    1. Title:
        - The title should the general topic / idea of the articles passed in
        - Should at most be 1 sentence long
    2. Universally Agreed Section:
        - This section should be in a journalistic / news style reporting and summarizing all of the information that is being reported and agreed upon by all sources.
        - Only include facts that are consistently reported across all sources.
        - This section should at most be 3 paragraphs long.
    3. Disputed Sections:
        - Create a separate "Disputed Section" for each news source provided.
        - Title each disputed section with the name of the corresponding news source.
        - Within each disputed section, write a passage containing facts or a certain perspective that only the specific news source is reporting on.

    Prioritize accuracy above all else when generating the article. Ensure that the information presented is factual and well-supported by the provided sources. Maintain a professional and neutral tone throughout the article, avoiding any bias or opinion.

    If there are any inconsistencies or contradictions between the sources, highlight these in the relevant disputed sections. Do not attempt to resolve or reconcile conflicting information; simply present it as reported by each source.

    If there are any clear outliers in the articles, as in they are reporting on an entirely different topic from the others, you can disregard it completely by setting its disputed section to "OUTLIER".

    Your article should serve as a comprehensive overview of the news event, giving the reader a clear understanding of both the universally agreed-upon facts and the unique perspectives or additional details provided by each individual source.
    '''

    content = "\n\n<hr>\n\n".join(articles)
    # prompt += content

    client = instructor.from_openai(OpenAI())

    sections = ["Title", "Universally Agreed"]

    for name in sources:
         sections.append(name)

    Article = create_model('UserInfo', **{f"{field_name}": (str, ...) for field_name in sections})

    print(f"PROMPT:\n\n\n{content}")

    article = client.chat.completions.create(
        model="gpt-4-turbo",
        response_model=Article,
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": content},
        ],
    )

    article = article.dict()

    return article

def upload_generated_articles(grouped_articles):
    article_rank = 0

    uploader = Mongo_Helper()

    daily_articles = {
        "date": (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d'),
        "articles": {}
    }

    for key, articles_and_sources in grouped_articles.items():
        # print("-----------------------------------")
        # print(article_rank)
        if article_rank > 4:
            break

        links = [x[0] for x in articles_and_sources]
        articles = [ArticleScraper(x[0], x[1]).to_text()[:10000] for x in articles_and_sources[:10]]

        # for article in articles:
            # print(article)

        source_list = [x[1] for x in articles_and_sources]
        sources = {x[1] : x[0] for x in articles_and_sources}

        # Match the schema of the articles in the database
        article = {}
        article["content"] = generate_article(articles, source_list)

        article["articleID"] = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d') + "-" + str(article_rank)
        article["published_date"] = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
        article["title"] = article["content"]["Title"]
        article["sources"] = sources

        daily_articles["articles"][article["articleID"]] = {}
        daily_articles["articles"][article["articleID"]]["title"]  = article["title"]
        daily_articles["articles"][article["articleID"]]["description"]  = article["content"]["Universally Agreed"]

        pp.pprint(article)

        uploader.upload_article(article)

        article_rank += 1

    uploader.upload_daily_articles(daily_articles)

    return daily_articles

if __name__ == "__main__":
    # source_articles = grab_news()

    # pprint.pp(source_articles)

    # with open("source_articles.json", "w") as file:
            # json.dump(source_articles, file, indent=4)

    # with open("source_articles.json", "r") as file:
        # source_articles = json.load(file)

    # push_headlines_to_pinecone(source_articles)

    # grouped_articles = dict(sorted(group_articles(source_articles, 0.5).items(), key = lambda x : len(x[1]), reverse=True))

    # with open("grouped_articles.json", "w") as file:
        # json.dump(grouped_articles, file, indent=4)

    with open("grouped_articles.json", "r") as file:
        grouped_articles = json.load(file)

    generated_articles = upload_generated_articles(grouped_articles)

    with open("generated_articles.json", "w") as file:
        json.dump(generated_articles, file, indent=4)