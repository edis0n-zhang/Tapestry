import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import { DatePicker } from "../components/DatePicker";

export default function Home() {
  return (
    <div className="px-10 md:px-64">
      <Header />

      <div className="mt-2">
        <DatePicker />
      </div>

      <div className="mt-4 flex-col">
        <ArticleCard
          title="NYC Mayor Eric Adams calls for modifying sanctuary city status"
          excerpt="test"
        />
        <ArticleCard
          title="NYC Mayor Eric Adams calls for modifying sanctuary city status"
          excerpt="test"
        />
        <ArticleCard
          title="NYC Mayor Eric Adams calls for modifying sanctuary city status"
          excerpt="test"
        />
        <ArticleCard
          title="NYC Mayor Eric Adams calls for modifying sanctuary city status"
          excerpt="test"
        />
        <ArticleCard
          title="NYC Mayor Eric Adams calls for modifying sanctuary city status"
          excerpt="test"
        />
      </div>
    </div>
  );
}
