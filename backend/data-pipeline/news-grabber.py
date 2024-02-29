import os
from dotenv import load_dotenv
from newsapi import NewsApiClient
import requests
import json

load_dotenv()

NEWS_API_KEY = os.getenv('NEWS_API_KEY')

api = NewsApiClient(api_key=str(NEWS_API_KEY))

json_objects = {}
us_news_sources = ["abc-news", "associated-press", "axios", "bloomberg", "breitbart-news", "business-insider", "buzzfeed", "cbs-news", "cnn", "fortune", "fox-news", "msnbc", "nbc-news", "newsweek", "politico", "the-american-conservative", "the-hill", "the-huffington-post", "the-washington-times", "time", "usa-today", "vice-news"]

# CODE TO GET SOURCES FOR TOP_HEADLINES
# json_objects["sources"] = api.get_sources()

for source in us_news_sources:
    print(source)
    response_data = api.get_top_headlines(sources=source)
    json_objects[source] = response_data

for name, data in json_objects.items():
    json_string = json.dumps(data, indent=4)
    with open(os.path.join("data", f"{name}.json"), "w") as f:
        f.write(json_string)