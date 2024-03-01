import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface ArticleProps {
  id: number;
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleProps> = ({ id, title, description }) => {
  return (
    <Card className="w-full max-w-full overflow-hidden rounded-lg border">
      <div className="flex gap-0.5">
        <div className="w-2/3">
          <Link className="block transition-opacity hover:opacity-90" href="#">
            <div className="p-4">
              <h3 className="truncate text-lg font-semibold hover:text-blue-400 dark:hover:text-blue-600">
                {id}. {title}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                {description}
              </p>
            </div>
          </Link>
        </div>
        <div className="w-1/3">
          <Image
            src="../public/next.svg"
            alt="My SVG Image"
            width={100}
            height={100}
          />
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
