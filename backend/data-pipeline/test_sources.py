import json
import getembeddings
from articlescraper import ScrapedArticle
with open("sorted_headlines.json", "r") as file:
    data = json.load(file)

scraped_articles = {}
i = 1
for key, items in data.items():
    #only grabbing first 5 groups
    if (i >= 6): break
    #group of articles that cover the same topic
    l1 = [key] + items
    group = []
    #We fetch ids for all the articles within this group
    fetch_response = getembeddings.index.fetch(ids=l1)
    #For each article URL, we scrape, and add to the text to the grouping
    for article in l1:
        url = fetch_response['vectors'][article]['metadata']['url']
        source = fetch_response['vectors'][article]['metadata']['source']
        article = ScrapedArticle(url, source)
        group.append(article.to_text())

    #We add entire group to our dict
    scraped_articles[i] = group
    i += 1


