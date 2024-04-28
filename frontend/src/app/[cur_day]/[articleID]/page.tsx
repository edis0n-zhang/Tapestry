import Header from "../../../components/Header";

import { Article } from "../../../types/article";

import { ExternalLink } from "lucide-react";

import readingTime from "reading-time";

import { format } from "date-fns";

interface ArticlePageProps {
  params: { articleID: string };
}

import Head from "next/head";

import { Open_Sans } from "next/font/google";

const sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const ArticlePage = async ({ params }: ArticlePageProps) => {
  try {
    const { articleID } = params;

    const apiKey = process.env.MONGODB_API_KEY!;
    const url =
      "https://us-west-2.aws.data.mongodb-api.com/app/data-wipruvo/endpoint/data/v1/action/findOne";

    const headers = {
      "Content-Type": "application/json",
      "api-key": apiKey,
    };

    const body = {
      collection: "articles",
      database: "news-db",
      dataSource: "news-db",
      filter: { articleID: articleID },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    });

    const article: Article = (await response.json()).document; // Properly handle the JSON parsing

    const { text: readingTimeText } = readingTime(
      Object.values(article.content).join(" "),
    );

    return (
      <div className="min-h-screen dark:bg-zinc-900 bg-zinc-50 dark:text-slate-100  text-slate-900">
        <Header />
        <div
          className={`flex h-full flex-col px-6 lg:px-96 md:px-24 ${sans.className}`}
        >
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold">{article.title}</h1>
            <div className="mt-2 md:mt-3 text-md md:text-lg text-gray-500">
              <span>
                {`Generated on ${format(
                  new Date(article.published_date),
                  "MMMM d, yyyy",
                )}`}
              </span>
              <span className="mx-2">·</span>
              <span>{readingTimeText}</span>
            </div>
            {Object.entries(article.content).map(([source, content], index) => {
              // Skip rendering if the content key is "Title" (or adjust the condition based on your data structure)
              if (source === "Title") return null;
              if (content == "OUTLIER") return null;
              if (source == "Universally Agreed") {
                return (
                  <div key={index} className="mt-1 md:mt-2 py-4">
                    <h2 className="text-xl md:text-2xl font-semibold">
                      {source}
                    </h2>
                    <p className="mt-1 text-md md:text-lg">{content}</p>
                  </div>
                );
              }

              return (
                <div key={index} className="mt-1 md:mt-2 py-4">
                  <Head>
                    <title>Error</title>
                  </Head>
                  <a
                    href={article.sources[source]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl md:text-2xl font-semibold duration-300 ease-in-out hover:text-blue-400 dark:hover:text-blue-600 flex items-center"
                  >
                    <span>{source}</span>
                    <ExternalLink size={24} className="ml-3" />
                  </a>
                  <p className="mt-1 text-md md:text-lg">{content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle any errors that occurred during data fetching
    console.error("Error fetching article:", error);
    return (
      <div className="min-h-screen dark:bg-black">
        <Header />
        <div className="mt-5 flex h-full flex-col px-6 md:px-24 lg:px-96">
          <div className="container mx-auto px-4 py-8">
            <p>No article found.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ArticlePage;
