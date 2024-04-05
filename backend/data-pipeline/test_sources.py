import json
import getembeddings
with open("sorted_headlines.json", "r") as file:
    data = json.load(file)

websites = [[]]

for key, items in data.items():
    #group of articles that cover the same topic
    l1 = [key] + items
    group = []
    #We fetch ids for all the articles within this group
    fetch_response = getembeddings.index.fetch(ids=l1)
    #We grab the URLs for each ID, and append to websites
    for article in l1:
        group.append(fetch_response['vectors'][article]['metadata']['url'])
    websites.append(group)

