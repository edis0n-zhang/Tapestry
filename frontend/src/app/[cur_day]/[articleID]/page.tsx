import Header from "../../../components/Header";
import { Article } from "../../../types/article";
import { ExternalLink } from "lucide-react";
import readingTime from "reading-time";
import { format } from "date-fns";
import Head from "next/head";
import { Open_Sans } from "next/font/google";

const sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

interface ArticlePageProps {
  params: { articleID: string };
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  try {
    const { articleID } = params;

    const cur_day = articleID.substring(0, articleID.length - 2);

    // Check if cur_day is a valid date string in YYYY-MM-DD format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(cur_day)) {
      throw new Error(
        "Invalid date format. Please provide a date in YYYY-MM-DD format.",
      );
    }

    // Check if cur_day is ahead of the current date
    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const [month, day, year] = currentDate.split("/");
    const formattedCurrentDate = `${year}-${month}-${day}`;

    if (cur_day >= formattedCurrentDate) {
      throw new Error("Date selected is ahead of the populated dates");
    }

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
      next: { revalidate: 86400 },
    });

    const article: Article = (await response.json()).document;

    const { text: readingTimeText } = readingTime(
      Object.values(article.content).join(" "),
    );

    // Sort the news sources alphabetically
    const sortedSources = Object.entries(article.content).sort(([a], [b]) =>
      a.localeCompare(b),
    );

    // Move "Universally Agreed" to the front of the sorted sources array
    const universallyAgreedIndex = sortedSources.findIndex(
      ([source]) => source === "Universally Agreed",
    );
    if (universallyAgreedIndex !== -1) {
      const [universallyAgreed] = sortedSources.splice(
        universallyAgreedIndex,
        1,
      );
      sortedSources.unshift(universallyAgreed);
    }

    return (
      <div className="min-h-screen dark:bg-zinc-900 bg-zinc-50 dark:text-slate-100 text-slate-900">
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
            {sortedSources.map(([source, content], index) => {
              if (source === "Title") return null;
              if (content === "OUTLIER") return null;

              if (source === "Universally Agreed") {
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
    console.error("Error fetching article:", error);
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
