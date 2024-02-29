import Link from "next/link";

interface ArticleProps {
  title: string;
  excerpt: string;
}

const ArticleCard: React.FC<ArticleProps> = ({ title, excerpt }) => {
  return (
    <div className="mb-6 overflow-hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <div className="p-4">
        <Link href="/articles/">
          <h3 className="text-lg font-bold">{title}</h3>
        </Link>
        <p className="line-clamp-3 text-gray-600">{excerpt}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
