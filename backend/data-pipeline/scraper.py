# scraper.py
# This helps scrape an input news article and will return the headline and text of the article
# Note: Some news URLs like axios, washington times, etc. don't allow scraping. 


import requests
from bs4 import BeautifulSoup

def scrape__article(article_url):
    """
    Scrapes a news article for its headline and article text.

    Parameters:
    - article_url (str): The URL of the news article to scrape.

    Returns:
    - tuple: headline(str), article_text(str)
    """
    try:
        # Fetch the content of the article
        response = requests.get(article_url)
        response.raise_for_status()  # Check for HTTP request errors
        web_page = response.content

        # Parse the content with BeautifulSoup
        soup = BeautifulSoup(web_page, 'html.parser')

        # Extract the headline
        headline = soup.find('h1').text

        # Extract the article text
        # This assumes the article text is within <p> tags
        article_text = ' '.join(p.text for p in soup.find_all('p'))

        return headline, article_text
    except requests.RequestException as e:
        print(f'Error fetching the article: {e}')
        return None, None
    except Exception as e:
        print(f'Error parsing the article: {e}')
        return None, None

# Example usage

# article_url = input('input URL: ')
# headline, article_text = scrape__article(article_url)
# print(f'Headline: {headline}')
# print(f'Article Text: {article_text}')
