import Header from "../../components/Header";
import ArticleListings from "../../components/ArticleListings";
import { DatePicker } from "../../components/DatePicker";

import { MongoClient } from "mongodb";
import { DailyArticles } from "../../types/daily_articles";

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
      .collection<DailyArticles>("daily_articles")
      .find({ date: cur_day })
      .toArray();

    // Close the MongoDB connection
    await client.close();

    return (
      <div className="min-h-screen dark:bg-black">
        <Header />
        <div className="mt-5 flex h-full flex-col px-10 md:px-48">
          <div className="mt-2">
            <DatePicker />
          </div>
          <div className="mt-5 flex-grow">
            <ArticleListings articles={articles[0].articles} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle any errors that occurred during data fetching
    console.error("Error fetching articles:", error);
    return (
      <div className="min-h-screen dark:bg-black">
        <Header />
        <div className="mt-5 flex h-full flex-col px-10 md:px-48">
          <div className="mt-2">
            <DatePicker />
          </div>
          <div className="container mx-auto px-4 py-8">
            <p>No articles for this date.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ArticleListingsPage;
