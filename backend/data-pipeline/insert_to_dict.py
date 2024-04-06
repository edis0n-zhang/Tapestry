import getembeddings
import json

epsilon = 0.5

organized_headlines = {}
used_articles = {}

def organize_headlines(file_name):
    with open(file_name, 'r') as file:
        data = json.load(file)
    
    #Iterate through each article
    for article in range(len(data['articles'])):
        article_id = data['articles'][article]['source']['id'] + str(article) + getembeddings.date
        #If this article is already in another category, we skip it.
        if article_id in used_articles:
            continue
        #Send query using given article_id
        query_response = getembeddings.index.query(
            id= article_id,
            top_k=14,
            include_values=False
        )
        similar_headlines = []
        for match in range(len(query_response["matches"])):
            #If the current article is not close enough to be on the same subject, skip other query results and begin new query
            if (query_response["matches"][match]["score"] < epsilon):
                break

            response_id = query_response['matches'][match]['id']
            #If the articles already exist in the dictionary, don't add them again
            if (response_id in used_articles or response_id==article_id):
                continue
            #if both conditions have been passed, then append article to the list of similar headlines
            similar_headlines.append(response_id)

        #add similar_headlines list to dict
        if len(similar_headlines) >= 2:
            organized_headlines[article_id] = similar_headlines
            for headline in similar_headlines:
                used_articles[headline] = True


for file_name in getembeddings.json_files:
    print('Current file:', file_name)
    organize_headlines('data/' + file_name)

print(organized_headlines)
print()
print()
#print(used_articles)


sorted_dict = dict(sorted(organized_headlines.items(), key = lambda x : len(x[1]), reverse=True))
with open("sorted_headlines.json", "w") as outfile:
    json.dump(sorted_dict, outfile)

# websites = [[]]
# for key, items in sorted_dict.items():
#     l1 = key + items
#     fetch_response = getembeddings.index.fetch(l1)
#     fetch_response['vectors']
