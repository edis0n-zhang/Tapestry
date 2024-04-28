from pinecone import Pinecone
from datetime import datetime, timedelta

"""Initial grouping structure:
    {
        group1: [(url1, source1), (url2, source2), (url3, source3)]
        group2: [(url4, source4), (url5, source5), (url6, source6)]
    }
    Proposed grouping structure:
    {
        group1: [(url1, source1, id1), (url2, source2, id2), (url3, source3, id3)]
        group2: [(url4, source4, id4), (url5, source5, id5), (url6, source6, id6)]
    }
"""
def improve_groupings(organized_headlines, epsilon=0.5):
    pc = Pinecone()
    index = pc.Index("news-piece")
    previous_day = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
    #For each grouping of articles:
    for group in organized_headlines:
        #Go through every article
        for article in group: 
            #article is a tuple (url, source, id)
            id = article[2]
            #Query that article to find similar articles
            query_response = index.query(
                id= id,
                top_k=14,
                include_values=False,
                include_metadata=True,
                filter={"date" : previous_day}
            )
            for match in query_response["matches"]:
                #match is a dictionary with keys "id", "score", "metadata". Metadata is a dictionary with keys "source", "url"
                #If the score is too low, we can stop looking for matches
                if match["score"] < epsilon:
                    break
                #If the article is already in the group, don't add it again. 
                #We can use the condition of it belonging to any of the previous sources as a high enough bar
                if match["metadata"]["source"] in [x[1] for x in group]:
                    continue
                #otherwise, append to the group
                group.append((match["metadata"]["url"], match["metadata"]["source"], match["id"]))

    return 42

#Example usage:                
#if (match["metadata"]["source"], match["metadata"]["url"]) in [(x[1], x[0]) for x in group]:
#    continue
