# Python 3
import http.client, urllib.parse
import pprint

conn = http.client.HTTPConnection('api.mediastack.com')

params = urllib.parse.urlencode({
    'access_key': '22e616c9c4d9b990280e32f34041647d',
    'categories': '-general,-sports',
    'sort': 'published_desc',
    'sources': 'apnews',
    'limit': 10,
    })

conn.request('GET', '/v1/news?{}'.format(params))

res = conn.getresponse()
data = res.read()

pprint.pp(data.decode('utf-8'))