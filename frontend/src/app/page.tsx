import Header from "../components/Header";
import ArticleListings from "../components/ArticleListings";
import { DatePicker } from "../components/DatePicker";

export default function Home() {
  interface Article {
    id: number;
    title: string;
    description: string;
  }

  const articleListings: Article[] = [
    {
      id: 1,
      title: "Article 1",
      description: "This is article 1",
    },
    {
      id: 2,
      title: "Article 2",
      description: "This is article 2",
    },
    {
      id: 3,
      title: "Article 3",
      description: "This is article 3",
    },
    {
      id: 4,
      title: "Article 4",
      description: "This is article 4",
    },
    {
      id: 5,
      title: "Article 5",
      description: "This is article 5",
    },
  ];

  return (
    <div>
      <Header />
      <div className="mt-5 px-10 md:px-48">
        <div className="mt-2">
          <DatePicker />
        </div>
        <ArticleListings Articles={articleListings} />
      </div>
    </div>
  );
}
