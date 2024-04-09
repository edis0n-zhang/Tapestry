import { Button } from "@/components/ui/button";
import { Article } from "../types/article";

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

const ArticleCard: React.FC<Article> = ({ title, content, image }) => {
  return (
    <Card className="group w-full max-w-full overflow-hidden rounded-lg border">
      <Link className="flex gap-0.5" href="#">
        <div className="w-2/3">
          {/* <Link className="block" href="#"> */}
          <div className="p-4">
            <h3 className="delay-50 truncate text-lg font-semibold transition duration-300 ease-in-out group-hover:text-blue-400 dark:group-hover:text-blue-600">
              {title}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm text-gray-500">{content}</p>
          </div>
          {/* </Link> */}
        </div>
        <div className="delay-50 relative w-1/3 grayscale transition duration-300 ease-in-out group-hover:grayscale-0">
          <Image
            src={image}
            alt={"${Article.title} Image"}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
    </Card>
  );
};

export default ArticleCard;
