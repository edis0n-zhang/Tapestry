import getembeddings
import json
from articlescraper import ScrapedArticle
import time

epsilon = 0.5

organized_headlines = {}
used_articles = {}

def organize_headlines(file_name):
    with open(file_name, 'r') as file:
        data = json.load(file)

    #Iterate through each article
    for article in range(len(data['articles'])):
        article_id = data['articles'][article]['source']['id'] + str(article) + "-" + getembeddings.date
        #We need the article_url to check if the article is already in another category
        article_url = data['articles'][article]['url']
        #If this article is already in another category, we skip it.
        if article_url in used_articles:
            continue
        #Send query using given article_id
        query_response = getembeddings.index.query(
            id= article_id,
            top_k=14,
            include_values=False,
            include_metadata=True,
            filter={"date" : getembeddings.date}
        )
        similar_headlines = []
        for match in range(len(query_response["matches"])):
            #If the current article is not close enough to be on the same subject, skip other query results and begin new query
            if (query_response["matches"][match]["score"] < epsilon):
                break

            response_url = query_response['matches'][match]['metadata']['url']
            #If the articles already exist in the dictionary, don't add them again
            if (response_url in used_articles or response_url==article_url):
                continue
            #if both conditions have been passed, then append article to the list of similar headlines
            similar_headlines.append(response_url)

        #add similar_headlines list to dict
        if len(similar_headlines) >= 2:
            similar_headlines.append(article_url)
            organized_headlines[len(organized_headlines)] = similar_headlines
            for headline in similar_headlines:
                used_articles[headline] = True


for file_name in getembeddings.json_files:
    print('Current file:', file_name)
    organize_headlines('data/' + file_name)

print(organized_headlines)
print()
print()
#print(used_articles)

#This is a dictionary of the organized urls, sorted by the number of articles in each group
sorted_dict = dict(sorted(organized_headlines.items(), key = lambda x : len(x[1]), reverse=True))

#Write the dictionary to a json file
with open("sorted_headlines.json", "w") as outfile:
    json.dump(sorted_dict, outfile)

# websites = [[]]
# for key, items in sorted_dict.items():
#     l1 = key + items
#     fetch_response = getembeddings.index.fetch(l1)
#     fetch_response['vectors']
