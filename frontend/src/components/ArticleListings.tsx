import ArticleCard from "./ArticleCard";
import { Article } from "../types/article";

interface ArticleListingProps {
  Articles: Article[];
}

const ArticleListings: React.FC<ArticleListingProps> = ({ Articles }) => {
  return (
    <div>
      {Articles.map((Article) => (
        <div key={Article.id} className="mb-5">
          <ArticleCard
            title={Article.title}
            date={Article.date}
            content={Article.content}
            id={Article.id}
            category={Article.category}
            tags={Article.tags}
            image={Article.image}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleListings;
