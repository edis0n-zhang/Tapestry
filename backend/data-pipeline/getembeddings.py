from openai import OpenAI
import json
from pinecone import Pinecone
import datetime

client = OpenAI()
pc = Pinecone(api_key="723377a7-7c41-497a-92ff-84dfcb422bca")
index = pc.Index("headlines")
current_time = datetime.datetime.now()
date = "-" + str(current_time.year) + "-" + str(current_time.month) + "-" + str(current_time.day)


def push_headlines_to_pinecone(file_name):
    #Open the current file that we are on
    with open(file_name, 'r') as file:
        data = json.load(file)
    
    #Iterate through each article
    for i in range(len(data['articles'])):
        #Append the title and description together (if description exists)
        new_headline = data['articles'][i]['title']
        if data['articles'][i]['description'] != None:
            new_headline += ". " + data['articles'][i]['description']

        #pass this title/description to openAI text-embedding-3-small
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=new_headline
        )

        #push the embedding vector to pinecone
        index.upsert(
            vectors=[
                {
                    "id" : data['articles'][i]['source']['id'] + str(i) + date, 
                    "values" : response.data[0].embedding,
                    "metadata": {
                                    "headline": new_headline, 
                                    "url": data['articles'][i]['url'], 
                                    "source": data['articles'][i]['source']['name']
                                }
                }
            ]
        )


def get_embedding(text: list):
    client = OpenAI()
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return dict(("id", text), ("values", response.data[0].embedding))



headlines = []
json_files = ['abc-news.json', 'associated-press.json', 'breitbart-news.json', 'business-insider.json', 
              'cbs-news.json', 'cnn.json', 'fortune.json', 'fox-news.json', 'msnbc.json', 'nbc-news.json', 
              'the-washington-times.json', 'time.json', 'usa-today.json', 'vice-news.json'
              ]

if __name__ == '__main__':
    for file_name in json_files:
        print('Current file:' + file_name)
        push_headlines_to_pinecone('data/' + file_name)
    print(headlines[:5])




