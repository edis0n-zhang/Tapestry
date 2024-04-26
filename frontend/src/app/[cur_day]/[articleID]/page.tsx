import Header from "../../../components/Header";

import { MongoClient } from "mongodb";
import { Article } from "../../../types/article";

interface ArticlePageProps {
  params: { articleID: string };
}

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
      <div className="min-h-screen dark:bg-black">
        <Header />
        <div className="mt-5 flex h-full flex-col px-10 md:px-48">
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            {Object.entries(article.content).map(([source, content], index) => {
              // Skip rendering if the content key is "Title" (or adjust the condition based on your data structure)
              if (source === "Title") return null;

              return (
                <div key={index} className="mt-4 py-4">
                  <h2 className="text-2xl font-semibold">{source}</h2>
                  <p className="mt-1 text-lg">{content}</p>
                </div>
              );
            })}
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Sources:</h2>
              {Object.entries(article.sources).map(([source, url], index) => (
                <p key={index}>
                  <a href={url} className="text-blue-600 hover:underline">
                    {source}
                  </a>
                </p>
              ))}
            </div>
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
