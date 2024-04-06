from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import PyMongoError
from dotenv import load_dotenv
import os

from pydantic import BaseModel, Field, HttpUrl, ValidationError
from bson import ObjectId
from typing import List, Optional
from datetime import datetime

load_dotenv()

user = str(os.getenv('MONGODB_USERNAME'))
password = str(os.getenv('MONGODB_PASSWORD'))

"""
This class is responsible for uploading articles to the MongoDB database.

Articles will be of the following schema:
{
    "_id": ObjectId("unique_article_id"),
    "title": "Article Title",
    "content": "Article Content",
    "sources": "Article Sources",
    "published_date": "Article Published Date",
}

The schema for the daily articles will be:
{
  "_id": ObjectId("unique_day_id"),
  "date": ISODate("2024-04-06T00:00:00Z"),
  "articles": [
    {
      "article_id": ObjectId("unique_article_id"),
      "title": "Article Title",
      "content": "Article Content",
      "url": "/path/to/article"
    }
  ]
}
"""

# Pydantic code to check schema of the articles
class ArticleSchema(BaseModel):
    id: Optional[ObjectId] = Field(alias="_id")
    title: str
    content: str
    sources: Optional[str]
    published_date: datetime

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class DailyArticleSchema(BaseModel):
    id: Optional[ObjectId] = Field(alias="_id")
    date: datetime
    articles: List[ArticleSchema]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class Mongo_Helper:
    def __init__(self):
        self.uri = f"mongodb+srv://{user}:{password}@news-db.qlbnkzp.mongodb.net/?retryWrites=true&w=majority&appName=news-db"

        # Create a new client and connect to the server
        self.client = MongoClient(self.uri, server_api=ServerApi('1'))


    def upload_article(self, article_data):
        try:
            article = ArticleSchema(**article_data)
            db = self.client['news-db']
            collection = db['articles']
            collection.insert_one(article.dict(by_alias=True))
        except PyMongoError as e:
            print(f"Database error: {e}")
        except ValidationError as e:
            print(f"Validation error: {e}")

    def upload_daily_articles(self, daily_articles_data):
        try:
            daily_articles = DailyArticleSchema(**daily_articles_data)
            db = self.client['news-db']
            collection = db['daily_articles']
            collection.insert_one(daily_articles.dict(by_alias=True))
        except PyMongoError as e:
            print(f"Database error: {e}")
        except ValidationError as e:
            print(f"Validation error: {e}")

# For testing purposes
# Mongo_Helper().upload_article({
#     "_id": ObjectId(),
#     "title": "Article Title",
#     "content": "Article Content",
#     "sources": "Article Sources",
#     "published_date": datetime.now()
# })