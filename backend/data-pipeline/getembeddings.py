from openai import OpenAI
import json
from pinecone import Pinecone

client = OpenAI()
pc = Pinecone(api_key="PUT_KEY_HERE")
index = pc.Index("headlines")


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
                    "id" : data['articles'][i]['source']['name'] + str(i), 
                    "values" : response.data[0].embedding,
                    "metadata": {"headline": new_headline, "url": data['articles'][i]['url']}
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
json_files = ['abc-news.json', 'associated-press.json', 'axios.json', 'bloomberg.json', 'breitbart-news.json', 
              'business-insider.json', 'buzzfeed.json', 'cbs-news.json', 'cnn.json', 'fortune.json', 'fox-news.json',
              'google-news.json', 'msnbc.json', 'nbc-news.json', 'newsweek.json', 'politico.json', 'the-american-conservative.json',
              'the-hill.json', 'the-huffington-post.json', 'the-washington-times.json', 'time.json', 'usa-today.json', 'vice-news.json'
              ]

for file_name in json_files:
    print('Current file:' + file_name)
    push_headlines_to_pinecone('data/' + file_name)

print(headlines[:5])




