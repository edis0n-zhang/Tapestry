import ArticleCard from "./ArticleCard";

interface ArticleListing {
  title: string;
  description: string;
}

interface ArticleListingsProps {
  articles: Record<string, ArticleListing>;
}

const ArticleListings: React.FC<ArticleListingsProps> = ({ articles }) => {
  if (!articles) {
    return <div>No articles available.</div>;
  }

  return (
    <div>
      {Object.entries(articles).map(([articleID, article]) => (
        <div key={articleID} className="mb-5">
          <ArticleCard
            articleID={articleID}
            title={article.title}
            description={article.description}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleListings;
