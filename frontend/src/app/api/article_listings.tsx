import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { DailyArticles } from "../../types/daily_articles";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { cur_day } = req.query;

    try {
      // Connect to MongoDB
      const client = await MongoClient.connect(process.env.MONGODB_URI!);
      const db = client.db("news-db");

      // Fetch articles for the specified day from MongoDB
      const result = await db
        .collection<DailyArticles>("daily_articles")
        .find({ date: cur_day })
        .toArray();

      // Close the MongoDB connection
      await client.close();

      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
