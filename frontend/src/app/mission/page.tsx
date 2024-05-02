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
  Mission

  In the age of information overload, it's time consuming and challenging to parse the news and have an informed and balanced outlook. News sources often have subtly biased reporting; leaving out and twisting information.

  That's where we come in. We help readers stay easily informed by leveraging word embeddings and LLMs to rank and generate unbiased articles on the top topics of the day.

  By open sourcing our code, ranking algorithm, and prompt, our goal is to disrupt the opaque and biased news industry and democratize news. At Tapestry, we are committed to transparency. All of the code can and will always be able to be found at our Github.
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
            <h1 className="text-2xl md:text-3xl font-bold">Mission</h1>
            <div className="mt-2 md:mt-3 text-md md:text-lg text-gray-500">
              <span>Last Updated on May 1st, 2024</span>
              <span className="mx-2">·</span>
              <span>{readingTimeText}</span>
            </div>
            <div className="mt-1 md:mt-2 py-4 whitespace-pre-line">
              <p className="mt-1 text-md md:text-lg">
                {`We are Tapestry and our mission is to `}
                <span className="font-bold">Make News Easy</span>.
                {`

                  In the age of information overload, it's time consuming and challenging to parse the news and have an informed and balanced outlook. News sources often have subtly biased reporting; leaving out and twisting information.

                  That's where we come in, we help readers stay easily informed by leveraging word embeddings and LLMs to rank and generate unbiased articles on the top topics of the day.

                  By open sourcing our code, ranking algorithm, and prompt our goal is to disrupt the opaque and biased news industry and democratize news. At Tapestry, we are committed to transparency, all of the code can and will always be able to be found at our `}
                <a
                  href={`https://github.com/edis0n-zhang/Tapestry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="duration-300 ease-in-out text-blue-600 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-600"
                >
                  Github
                  <ExternalLink size={14} className="ml-1 mb-1 inline-block" />.
                </a>
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
