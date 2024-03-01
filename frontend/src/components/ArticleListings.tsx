import ArticleCard from "./ArticleCard";

interface Article {
  id: number;
  title: string;
  description: string;
}

interface ArticleListingProps {
  Articles: Article[];
}

const ArticleListings: React.FC<ArticleListingProps> = ({ Articles }) => {
  return (
    <div className="flex-col">
      {Articles.map((Article) => (
        <div key={Article.id} className="mb-10">
          <ArticleCard
            id={Article.id}
            title={Article.title}
            description={Article.description}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleListings;
