import instructor
from pydantic import BaseModel, create_model
import openai
from openai import OpenAI

def generate_article(articles, sources):

    prompt = '''
    You are an expert journalist AI tasked with generating a comprehensive news article by combining information from multiple news sources provided by the user. Your primary objective is to create an accurate, professional, and well-structured article that presents the information in a clear and concise manner.

    Follow this format for the generated article:

    1. Title:
        - The title should the general topic / idea of the articles passed in
        - Should at most be 1 sentence long
    2. Universally Agreed Section:
        - This section should be in a journalistic / news style reporting and summarizing all of the information that is being reported and agreed upon by all sources.
        - Only include facts that are consistently reported across all sources.
        - This section should at most be 3 paragraphs long.
    3. Disputed Sections:
        - Create a separate "Disputed Section" for each news source provided.
        - Title each disputed section with the name of the corresponding news source.
        - Within each disputed section, include bullet points of information that only the specific news source reports, and which may not be corroborated by the other sources.

    Prioritize accuracy above all else when generating the article. Ensure that the information presented is factual and well-supported by the provided sources. Maintain a professional and neutral tone throughout the article, avoiding any bias or opinion.

    If there are any inconsistencies or contradictions between the sources, highlight these in the relevant disputed sections. Do not attempt to resolve or reconcile conflicting information; simply present it as reported by each source.

    Your article should serve as a comprehensive overview of the news event, giving the reader a clear understanding of both the universally agreed-upon facts and the unique perspectives or additional details provided by each individual source.

    '''

    content = "<hr>".join(articles)
    # prompt += content

    client = instructor.from_openai(OpenAI())

    sections = ["Title", "Universally Agreed"]
    for name in sources:
         sections.append(name)

    Article = create_model('UserInfo', **{f"{field_name}": (str, ...) for field_name in sections})

    article = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_model=Article,
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": content},
        ],
    )

    article = article.dict()

    article["Sources"] = sources

    return article

source_articles = [
    """Title: Biden and party leaders implore Speaker Johnson to help Ukraine in ‘intense’ Oval Office meeting
Source: AP News

WASHINGTON – President Joe Biden summoned the top four congressional leaders to the White House to discuss efforts to avert a partial government shutdown and pass what the president has described as desperately needed foreign aid to key U.S. allies. The four party leaders – House Speaker Mike Johnson, R-La.; House Minority Leader Hakeem Jeffries, D-N.Y.; Senate Majority Leader Chuck Schumer, D-N.Y.; and Senate Minority Leader Mitch McConnell, R-Ky. – met with Biden on Tuesday as government funding expires in just a few days and the fate of Ukraine aid is uncertain. Speaking with reporters after the meeting, Schumer said the discussion about funding Ukraine's war effort "was one of the most intense I've ever encountered in my many meetings in the Oval Office." He said the other four leaders all made it clear to Johnson "how vital" additional aid is and said they agreed Ukraine is likely to lose its war with Russia without additional help from the U.S. "We said to the speaker: 'Get it done.'" Johnson told reporters that he assured the other leaders that the House is "investigating all the various options" on Ukraine aid and that the chamber will address it "in a timely manner." "But the first priority of our country is our border and making sure it's secure," he said. Earlier this month, the Senate passed $95 billion in foreign aid, including $60 billion to support Ukraine. The package originally included border security policies, but they were stripped once Senate Republicans indicated they wouldn't vote for them, arguing the measures didn't go far enough. Negotiators have also been trying to hash out a long-term spending deal to keep the government’s doors open after Congress has kicked the can down the road with short-term extensions three times already, but talks have repeatedly hit snags over controversial policy add-ons to the legislation. Government funding related to energy and water; military construction; transportation, housing and urban development; and agriculture expire on March 1. The remaining functions are set to expire on March 8. Johnson and Schumer said that they agreed they did not want a government shutdown and that it would be possible to avoid one. Schumer said Congress will "need some CRs to get that done," a reference to the government funding extension known as a continuing resolution. Time is ticking for leaders to announce any sort of deal to fund the government, including a funding extension. If they want to dodge a shutdown by the deadline, House Republican leadership must release text of a deal sometime on Tuesday to abide by a rule for the GOP conference that requires legislation to be available for 72 hours to allow members to read it before it goes to the House floor. “There is no justification, none, for provoking a government shutdown,” Schumer warned on the Senate floor ahead of the White House meeting. Johnson, who has been pushing to attach conservative policy provisions to spending bills, needs to drop the “poison pills” from negotiations, Schumer said. Johnson is reckoning with immense pressure from conservative hard-liners to drag out the talks in a bid to secure conservative policy wins. But given the political realities of a Democrat-controlled Senate and White House, any chance of significant victories for the House GOP is unlikely. “NO PLAN TO FIGHT,” Rep. Chip Roy, R-Texas, a member of the ultraconservative House Freedom Caucus, said in a series of posts Monday on X, formerly Twitter, railing against the discussions. Johnson’s GOP counterpart in the Senate, McConnell has also warned against “poison pills” that could risk a shutdown, illustrating the little leverage House Republicans have in negotiations. Regardless, Roy insisted that “leverage is actually lost WHEN YOU DEMONSTRATE NO INTENT TO USE IT.” The Louisiana Republican has contended that talks have stalled because of new Democratic demands that were “not previously included” in the Senate’s past spending bills. At the same time, a broad foreign aid package to key U.S. allies such as Ukraine and Israel, including China deterrence measures in the Indo-Pacific, lies in wait in the House after the Senate approved it earlier this month. Johnson has refused to put the bill on the House floor, arguing the legislation must be paired with policy to address the crisis on the southern border – despite rejecting a bipartisan Senate bill that did exactly that earlier this month. House Republicans argued the last bill would have done little to stem the flow of migrants at the border. Biden has heavily lobbied Congress to pass the foreign aid bill which includes $60 billion in additional funding for Ukraine, arguing the legislation would also protect U.S. national security interests. “The consequences of inaction every day in Ukraine are dire,” Biden said before the meeting, also advocating for humanitarian assistance in Gaza to be paired with Israel aid. Military assistance for Ukraine also still enjoys wide bipartisan support from lawmakers, but the path forward is murky given Johnson’s refusal to put the Senate bill on the floor. “For 10 years our adversary has showed us by his actions that Russia’s appetite for conquest grows with eating,” McConnell, an avid supporter of Ukraine assistance, said on the Senate floor Tuesday morning of Russian President Vladimir Putin. “We can no longer afford to pretend otherwise.”""",

    """Title: Biden convenes top congressional leaders to avert government shutdown, pass Ukraine aid
Source: USA Today

WASHINGTON – President Joe Biden summoned the top four congressional leaders to the White House to discuss efforts to avert a partial government shutdown and pass what the president has described as desperately needed foreign aid to key U.S. allies. The four party leaders – House Speaker Mike Johnson, R-La.; House Minority Leader Hakeem Jeffries, D-N.Y.; Senate Majority Leader Chuck Schumer, D-N.Y.; and Senate Minority Leader Mitch McConnell, R-Ky. – met with Biden on Tuesday as government funding expires in just a few days and the fate of Ukraine aid is uncertain. Speaking with reporters after the meeting, Schumer said the discussion about funding Ukraine's war effort "was one of the most intense I've ever encountered in my many meetings in the Oval Office." He said the other four leaders all made it clear to Johnson "how vital" additional aid is and said they agreed Ukraine is likely to lose its war with Russia without additional help from the U.S. "We said to the speaker: 'Get it done.'" Johnson told reporters that he assured the other leaders that the House is "investigating all the various options" on Ukraine aid and that the chamber will address it "in a timely manner." "But the first priority of our country is our border and making sure it's secure," he said. Earlier this month, the Senate passed $95 billion in foreign aid, including $60 billion to support Ukraine. The package originally included border security policies, but they were stripped once Senate Republicans indicated they wouldn't vote for them, arguing the measures didn't go far enough. Negotiators have also been trying to hash out a long-term spending deal to keep the government’s doors open after Congress has kicked the can down the road with short-term extensions three times already, but talks have repeatedly hit snags over controversial policy add-ons to the legislation. Government funding related to energy and water; military construction; transportation, housing and urban development; and agriculture expire on March 1. The remaining functions are set to expire on March 8. Johnson and Schumer said that they agreed they did not want a government shutdown and that it would be possible to avoid one. Schumer said Congress will "need some CRs to get that done," a reference to the government funding extension known as a continuing resolution. Time is ticking for leaders to announce any sort of deal to fund the government, including a funding extension. If they want to dodge a shutdown by the deadline, House Republican leadership must release text of a deal sometime on Tuesday to abide by a rule for the GOP conference that requires legislation to be available for 72 hours to allow members to read it before it goes to the House floor. “There is no justification, none, for provoking a government shutdown,” Schumer warned on the Senate floor ahead of the White House meeting. Johnson, who has been pushing to attach conservative policy provisions to spending bills, needs to drop the “poison pills” from negotiations, Schumer said. Johnson is reckoning with immense pressure from conservative hard-liners to drag out the talks in a bid to secure conservative policy wins. But given the political realities of a Democrat-controlled Senate and White House, any chance of significant victories for the House GOP is unlikely. “NO PLAN TO FIGHT,” Rep. Chip Roy, R-Texas, a member of the ultraconservative House Freedom Caucus, said in a series of posts Monday on X, formerly Twitter, railing against the discussions. Johnson’s GOP counterpart in the Senate, McConnell has also warned against “poison pills” that could risk a shutdown, illustrating the little leverage House Republicans have in negotiations. Regardless, Roy insisted that “leverage is actually lost WHEN YOU DEMONSTRATE NO INTENT TO USE IT.” The Louisiana Republican has contended that talks have stalled because of new Democratic demands that were “not previously included” in the Senate’s past spending bills. At the same time, a broad foreign aid package to key U.S. allies such as Ukraine and Israel, including China deterrence measures in the Indo-Pacific, lies in wait in the House after the Senate approved it earlier this month. Johnson has refused to put the bill on the House floor, arguing the legislation must be paired with policy to address the crisis on the southern border – despite rejecting a bipartisan Senate bill that did exactly that earlier this month. House Republicans argued the last bill would have done little to stem the flow of migrants at the border. Biden has heavily lobbied Congress to pass the foreign aid bill which includes $60 billion in additional funding for Ukraine, arguing the legislation would also protect U.S. national security interests. “The consequences of inaction every day in Ukraine are dire,” Biden said before the meeting, also advocating for humanitarian assistance in Gaza to be paired with Israel aid. Military assistance for Ukraine also still enjoys wide bipartisan support from lawmakers, but the path forward is murky given Johnson’s refusal to put the Senate bill on the floor. “For 10 years our adversary has showed us by his actions that Russia’s appetite for conquest grows with eating,” McConnell, an avid supporter of Ukraine assistance, said on the Senate floor Tuesday morning of Russian President Vladimir Putin. “We can no longer afford to pretend otherwise.”""",

    """Title: G.O.P. Leaders Optimistic on Spending Deal After Meeting With Biden
Source: New York Times

“Well, it was both a productive and an intense meeting. A productive meeting on the government shutdown. We are making good progress. We made it very clear, the speaker said unequivocally he wants to avoid a government shutdown. The meeting on Ukraine was one of the most intense I have ever encountered in my many meetings in the Oval Office. And it was the consensus in that room, Zelensky and Ukraine will lose the war if we don’t get the arms and don’t get them quickly.” “Let me say this, when I showed up today, my purpose was to express what I believe is the obvious truth, and that is that we must take care of America’s needs first. When you talk about America’s needs, you have to talk first about our open border. So I brought that issue up repeatedly today in that room. And again, one on one with the president. I think that’s our responsibility to bring that up. The other big priority for our country, of course, is the funding of our government. And we have been working in good faith around the clock every single day for months and weeks and over the last several days, quite literally around the clock to get that job done. We’re very optimistic. I hope that the other leaders came out here and told you the same. We believe that we can get to agreement on these issues and prevent a government shutdown, and that’s our first responsibility."""
]

sources = ["AP News", "USA Today", "New York Times"]

article = generate_article(source_articles, sources)

for key, item in article.items():
    print(f"{key}: {item}\n")