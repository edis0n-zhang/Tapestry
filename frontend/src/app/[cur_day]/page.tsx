import Header from "../../components/Header";
import ArticleListings from "../../components/ArticleListings";
import { DatePicker } from "../../components/DatePicker";

import { DailyArticles } from "../../types/daily_articles";

import Head from "next/head";

interface ArticleListingsPageProps {
  params: { cur_day: string };
}

import { Open_Sans } from "next/font/google";

const sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const ArticleListingsPage = async ({ params }: ArticleListingsPageProps) => {
  try {
    const { cur_day } = params;

    // not working here???
    const day_string = cur_day.toString(); // trying my best...

    // Check if cur_day is a valid date string in YYYY-MM-DD format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(day_string)) {
      throw new Error(
        "Invalid date format. Please provide a date in YYYY-MM-DD format.",
      );
    }

    // SORRY FOR THIS ABSOLUTE MESS
    // cur_day is the date passed in the url in YYYY-MM-DD format
    // formattedPastDate is the date (LA Time) from 2 days ago in YYYY-MM-DD format
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); // subtract one day

    const formattedPastDate = twoDaysAgo.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const curDayDate = new Date(cur_day);
    const currentDayDate = new Date(formattedPastDate);
    const diff = Math.abs(curDayDate.getTime() - currentDayDate.getTime());
    const dayDiff = Math.ceil(diff / (1000 * 3600 * 24));

    const [month, day, year] = formattedPastDate.split("/");
    const formattedPreviousDate = `${year}-${month}-${day}`;

    if (cur_day > formattedPreviousDate) {
      throw new Error(`Report coming out in ${dayDiff} days`);
    }

    const apiKey = process.env.MONGODB_API_KEY!; // Replace <API_KEY> with your actual API key
    const url =
      "https://us-west-2.aws.data.mongodb-api.com/app/data-wipruvo/endpoint/data/v1/action/findOne";

    const headers = {
      "Content-Type": "application/json",
      "api-key": apiKey,
    };

    const body = {
      collection: "daily_articles",
      database: "news-db",
      dataSource: "news-db",
      filter: { date: cur_day },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch articles from MongoDB");
    }

    const data: DailyArticles = (await response.json()).document; // Properly handle the JSON parsing

    return (
      <div
        className={`min-h-screen dark:bg-zinc-900 bg-zinc-50  ease-in-out duration-300 text-zinc-900 dark:text-zinc-50 ${sans.className}`}
      >
        <Head>
          <meta property="og:image" content="/favicon.ico" />
        </Head>
        <Header />
        <div
          className={`mt-2 md:mt-3 flex h-full flex-col px-8 md:px-24 lg:px-48 ${sans.className}`}
        >
          <div className="mt-2">
            <DatePicker />
          </div>
          <div className="mt-5 flex-grow">
            <ArticleListings articles={data.articles} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle any errors that occurred during data fetching
    console.error("Error fetching articles:", error);
    return (
      <div
        className={`min-h-screen dark:bg-zinc-900 bg-zinc-50 ease-in-out duration-300 text-zinc-900 dark:text-zinc-50 ${sans.className}`}
      >
        <Header />
        <div
          className={`mt-2 md:mt-3 flex h-full flex-col px-8 md:px-24 lg:px-48 ${sans.className}`}
        >
          <div className="mt-2">
            <DatePicker />
          </div>
          <div className="mt-2 md:mt-3 flex-grow">
            <p>{`${error}`}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ArticleListingsPage;
