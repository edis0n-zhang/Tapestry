// src/app/[cur_day]/page.tsx
import Header from "../../components/Header";
import ArticleListings from "../../components/ArticleListings";
import { DatePicker } from "../../components/DatePicker";

import { MongoClient } from "mongodb";
import { Article } from "../../types/article";

interface ArticleListingsPageProps {
  params: { cur_day: string };
}

const ArticleListingsPage = async ({ params }: ArticleListingsPageProps) => {
  try {
    const { cur_day } = params;

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("news-db");

    // Fetch articles for the specified day from MongoDB
    const articles = await db
      .collection<Article>("articles")
      .find({ date: cur_day })
      .toArray();

    // Close the MongoDB connection
    await client.close();

    if (articles.length === 0) {
      // No articles found for the specified date
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">
            No articles found for {new Date(cur_day).toDateString()}
          </h1>
          <p>Please try a different date.</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen dark:bg-black">
        <Header />
        <div className="mt-5 flex h-full flex-col px-10 md:px-48">
          <div className="mt-2">
            <DatePicker />
          </div>
          <div className="mt-5 flex-grow">
            <ArticleListings Articles={articles} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle any errors that occurred during data fetching
    console.error("Error fetching articles:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Error</h1>
        <p>An error occurred while fetching articles.</p>
      </div>
    );
  }
};

export default ArticleListingsPage;
