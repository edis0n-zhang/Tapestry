# Tapestry
www.tapestry.news

## Description
Tapestry is a daily news briefing. Each day, we find the 5 most important topics--our criteria is which stories were the most "reported on". We then gather sources that reported on our five chosen stories, and use an LLM to generate an unbiased article for each. In every article, the LLM gives meta-analysis on each publication that covered the topic, and what each publication reported on that the other publications did not.

## Table of Contents
1. [Motivation](#motivation)
2. [Features](#features)
3. [Architecture and Implementation](#architecture-and-implementation)
6. [Contributing](#contributing)
7. [License](#license)
8. [Acknowledgments](#acknowledgments)

## Motivation
Put simply, the current news experience sucks. Too many headlines are thrown at us each day. If we were to click on an article, we’d find more opinion than journalism—and be forced to parse the facts ourselves. Here are some statistics:
- Only 7% of Americans have a great deal of trust in the news
- 46% say that news sources are very biased
- 66% are overwhelmed by the amount of news

Here at Tapestry, we believe you deserve a better news experience. One that is streamlined, unbiased, and removes all the chaos and overwhelm of the current news cycle.

## Features
- **Front Page:** Our front page is intentionally bare. You'll see the five stories of the day, ordered from most to least important.
- **Each Article:** We start with a "Universally Agreed" section which focuses on just summarizing the facts. Then, we make a section for each publication, detailing what that publication focused on their article. Here, we link to the original articles we fed into the LLM
- **Toggle Dates:** At the top of our homepage, you can easily toggle different dates to see the news for previous days. Note that the earliest available day is April 23, 2024. Also note that the most recent briefing is two days prior to the current date.
- **Navigation Menu:** Easily see our mission, our team, our about page, and switch between light and dark mode. 

## Architecture and Implementation
Our tech stack utilizes a multitude of services .
- **OpenAI Embedding Model:** We pull 1000+ article headlines from 14 different sources, and feed each of these headlines into OpenAI's embedding model, to generate vector embeddings for the headlines.
- **Pinecone Vector Database:** We store all the vector embeddings in a vector database. We sort the vectors into groups of "similar topics", and filter for the largest groups. These are the topics we'll report on.
- **OpenAI LLM (GPT4-Turbo):** We pass the articles into GPT4, and have it generate its own article based on the information from the different sources. We re-generate the article until it fits our custom schema (see [Features](#Features)).
- **MongoDB:** We use MongoDB to store our articles after we have generated them.
- **Google Cloud Functions:** We run a daily cloud-scheduler job to execute this program, through Google Cloud Functions. 

Here's a diagram to show all these steps put together:

## Contributing
We welcome contributions! Here are some guidelines to follow to ensure a smooth and collaborative experience.


Fork the Repository: Start by forking the repository to your GitHub account.
Clone Your Fork: Clone the forked repository to your local machine.
bash
Create a Branch: Create a new branch for your feature or bug fix.
Push to Your Fork: Push your changes to your forked repository.
bash
Create a Pull Request: Open a pull request against the main branch of the original repository. Provide a detailed description of your changes and the problem they solve.
Review Process: Your pull request will be reviewed by project maintainers. Please be patient and responsive to feedback.


## License
This project is licensed under the _ License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
This project was created by Edison Zhang, Jeremi Nuer, Isaac Chang, and Kyle Zhao, as a part of the project series for the Data Science UCSB and CodersSB clubs, respectively.