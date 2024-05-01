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
  To a group of broke college students, keeping this website up is expensive.

  For just 5 dollars we can keep the servers up for 5 days.

  If you want to support a more open hub for news, please consider donating. Your support is greatly appreciated.
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
