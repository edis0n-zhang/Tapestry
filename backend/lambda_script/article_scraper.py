import newspaper
import json

class ArticleScraper:
    def __init__(self, url, source):
        article = newspaper.Article(url=url, language='en')
        article.download()
        article.parse()

        self.title = str(article.title)
        self.text = str(article.text)
        self.authors = str(article.authors)
        self.published_date = str(article.publish_date)
        self.top_image = str(article.top_image)
        self.videos = str(article.movies)
        self.keywords = str(article.keywords)
        self.summary = str(article.summary)
        self.source = source

    def to_dict(self):
        return {
            "title": self.title,
            "text": self.text,
            "authors": self.authors,
            "published_date": self.published_date,
            "top_image": self.top_image,
            "videos": self.videos,
            "keywords": self.keywords,
            "summary": self.summary,
            "source": self.source
        }

    def to_text(self):
        return f"""TITLE: {self.title} \n\nSOURCE: {self.source} \n\n{self.text}
        """

    def to_json(self):
        return json.dumps(self.to_dict(), indent=4)

# CONFIRMED WORKING
# abc
# AP
# Breitbart
# Business Insider
# CBS News
# CNN
# Fortune
# Fox News
# MSNBC
# NBC
# Washington Times
# Time
# USA Today
# Vice News

# NOT WORKING
# Axios
# Bloomberg
# NewsWeek
# Politico
# The American Conservative
# HuffPost

# url = "https://www.washingtontimes.com/news/2024/feb/14/missing-binder-at-center-of-new-claim-that-cia-dru/"
# print(ScrapedArticle(url, "Washington Times").to_text())