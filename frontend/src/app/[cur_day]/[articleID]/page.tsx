import Header from "../../../components/Header";

import { MongoClient } from "mongodb";
import { Article } from "../../../types/article";

import { ExternalLink } from "lucide-react";

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

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("news-db");

    // Fetch articles for the specified day from MongoDB
    const articles = await db
      .collection<Article>("articles")
      .find({ articleID: articleID })
      .toArray();

    // Check if articles were found
    if (articles.length === 0) {
      throw new Error("No article found.");
    }

    const article = articles[0];

    // Close the MongoDB connection
    await client.close();

    return (
      <div className="min-h-screen dark:bg-zinc-900 bg-zinc-50 dark:text-slate-100  text-slate-900">
        <Head>
          <title>{article.title}</title>
        </Head>
        <Header />
        <div
          className={`mt-5 flex h-full flex-col px-10 lg:px-96 md:px-48 sm:px-0 ${sans.className}`}
        >
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            {Object.entries(article.content).map(([source, content], index) => {
              // Skip rendering if the content key is "Title" (or adjust the condition based on your data structure)
              if (source === "Title") return null;
              if (source == "Universally Agreed") {
                return (
                  <div key={index} className="mt-4 py-4">
                    <h2 className="text-2xl font-semibold">{source}</h2>
                    <p className="mt-1 text-lg">{content}</p>
                  </div>
                );
              }

              return (
                <div key={index} className="mt-4 py-4">
                  <Head>
                    <title>Error</title>
                  </Head>
                  <a
                    href={article.sources[source]}
                    className="text-2xl font-semibold duration-300 ease-in-out hover:text-blue-400 dark:hover:text-blue-600 flex items-center"
                  >
                    <span>{source}</span>
                    <ExternalLink size={24} className="ml-3" />
                  </a>
                  <p className="mt-1 text-lg">{content}</p>
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
        <div className="mt-5 flex h-full flex-col px-10 md:px-48">
          <div className="container mx-auto px-4 py-8">
            <p>No article found.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ArticlePage;
