import Header from "../../components/Header";
import { Article } from "../../types/article";
import { ExternalLink } from "lucide-react";
import readingTime from "reading-time";
import { format } from "date-fns";
import Head from "next/head";
import { Open_Sans } from "next/font/google";

const sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const text = `
  At Tapestry, we hope that by openly sharing how our articles are formatted and displayed in Tapestry, we can increase transparency and gain your trust.

  How It Works

  Custom Ranking: Inspired by ranking metrics such as Twitter trends and academic citations, we assess the importance of reported events by tallying the number of sources that report on them. In developing our algorithm, we aimed for a method that is straightforward and open to public verification. We believe this approach offers the most transparent and unbiased way to rank news.

  Clustering: By utilizing embeddings, we can gather the semantic meaning of the headlines to group using an algorithm. However, without knowing the number of clusters beforehand, we can't use common techniques like K-nearest neighbors to group articles into topics. Instead, we leverage a unique algorithm that estimates each embedded headline as a centroids of a cluster to determine topic groups, where groups are within a certain cosine similarity of the centroid headline is considered to be about the same topic. We then retroactively remove duplicates by removing topics that contain articles that already belong to larger clusters.

  Generating Articles: To minimize potential bias, we employ large language models (LLMs) to generate objective articles. Furthermore, in the interest of transparency, we will make the prompts used to generate the articles open source, allowing all readers to review them. To guarantee that the generated articles adhere to specific quality standards and follow a required format, which includes being universally agreed upon and properly sourced, we utilize a library and a custom dynamic schema to iteratively refine the generation process until the desired criteria are satisfied.

  Home Page

  The home page of Tapestry is designed to be simple and easy to navigate. The top of the page features calendar where you can go back to previously populated dates, the first being from April 21st, 2024. Below the calendar, you will find the top 5 articles of the day, which are ranked in descending order based on the number of sources that report on them. The articles are displayed in a card format, with the headline and a brief summary of the article. Clicking on the card will take you to the full article.

  Article Page

  The article page is broken into two sections:
  - The Universally Agreed section which is filled with information the LLM has determined to be reported in all of the different categories.
  - Each Source section contains information that is unique to the source or the source highlights more compared to the others.

  The script, prompt, and sources that populates each article can be found here.
`;

const ArticlePage = () => {
  try {
    const { text: readingTimeText } = readingTime(text);

    return (
      <div className="ease-in-out duration-300 min-h-screen dark:bg-zinc-900 bg-zinc-50 dark:text-slate-100 text-slate-900">
        <Header />
        <div
          className={`flex h-full flex-col px-6 lg:px-96 md:px-24 ${sans.className}`}
        >
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold">{`About`}</h1>
            <div className="mt-2 md:mt-3 text-md md:text-lg text-gray-500">
              <span>Last Updated on May 1st, 2024</span>
              <span className="mx-2">·</span>
              <span>{readingTimeText}</span>
            </div>
            <div className="mt-1 md:mt-2 py-4 whitespace-pre-line">
              <p className="mt-1 text-md md:text-lg">
                {`  At Tapestry, we hope that by openly sharing how our articles are formatted and displayed in Tapestry, we can increase transparency and gain your trust.`}
              </p>
            </div>
            <div className="mt-1 md:mt-2 py-4 whitespace-pre-line">
              <h2 className="text-xl md:text-2xl font-semibold">
                How It Works
              </h2>
              <p className="mt-1 text-md md:text-lg">
                <span className="italic font-semibold">Custom Ranking:</span>
                {` Inspired by ranking metrics such as Twitter trends and academic citations, we assess the importance of reported events by tallying the number of sources that report on them. In developing our algorithm, we aimed for a method that is straightforward and open to public verification. We believe this approach offers the most transparent and unbiased way to rank news.

                  `}
                <span className="italic font-semibold">Clustering:</span>
                {` By utilizing embeddings, we can gather the semantic meaning of the headlines to group using an algorithm. However, without knowing the number of clusters beforehand, we can't use common techniques like K-nearest neighbors to group articles into topics. Instead, we leverage a unique algorithm that estimates each embedded headline as a centroids of a cluster to determine topic groups, where groups are within a certain cosine similarity of the centroid headline is considered to be about the same topic. We then retroactively remove duplicates by removing topics that contain articles that already belong to larger clusters.

                  `}
                <span className="italic font-semibold">
                  Generating Articles:
                </span>{" "}
                {`To minimize potential bias, we employ large language models (LLMs) to generate objective articles. Furthermore, in the interest of transparency, we will make the prompts used to generate the articles open source, allowing all readers to review them. To guarantee that the generated articles adhere to specific quality standards and follow a required format, which includes being universally agreed upon and properly sourced, we utilize a library and a custom dynamic schema to iteratively refine the generation process until the desired criteria are satisfied.`}
              </p>
            </div>
            <div className="mt-1 md:mt-2 py-4 whitespace-pre-line">
              <h2 className="text-xl md:text-2xl font-semibold">Home Page</h2>
              <p className="mt-1 text-md md:text-lg">
                {`  The home page of Tapestry is designed to be simple and easy to navigate. The top of the page features calendar where you can go back to previously populated dates, the first being from April 21st, 2024. Below the calendar, you will find the top 5 articles of the day, which are ranked in descending order based on the number of sources that report on them. The articles are displayed in a card format, with the headline and a brief summary of the article. Clicking on the card will take you to the full article.`}
              </p>
            </div>
            <div className="mt-1 md:mt-2 py-4 whitespace-pre-line">
              <h2 className="text-xl md:text-2xl font-semibold">
                Article Page
              </h2>
              <p className="mt-1 text-md md:text-lg">
                {`The article page is broken into two sections:
                  - The Universally Agreed section which is filled with information the LLM has determined to be reported in all of the different categories.
                  - Each Source section contains information that is unique to the source or the source highlights more compared to the others.

                  The script, prompt, and sources that populates each article can be found `}
                <a
                  href={`https://github.com/edis0n-zhang/Tapestry/blob/main/backend/gcloud-func/main.py`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="duration-300 ease-in-out text-blue-600 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-600"
                >
                  here
                  <ExternalLink size={14} className="ml-1 mb-1 inline-block" />
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return (
      <div
        className={`min-h-screen dark:bg-zinc-900 bg-zinc-50 ease-in-out duration-300 text-zinc-900 dark:text-zinc-50 ${sans.className}`}
      >
        <Header />
        <div
          className={`mt-2 md:mt-3 flex h-full flex-col px-8 md:px-24 lg:px-48 ${sans.className}`}
        >
          <div className="mt-2 md:mt-3 flex-grow">
            <p>{`${error}`}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ArticlePage;
