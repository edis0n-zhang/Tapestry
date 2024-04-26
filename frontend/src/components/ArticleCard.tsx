"use client";

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
import { usePathname } from "next/navigation";

interface ArticleCardProps {
  articleID: string;
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  articleID,
  title,
  description,
}) => {
  const pathname = usePathname();

  return (
    <Card className="group w-full max-w-full overflow-hidden rounded-lg border dark:border-zinc-700 dark:bg-zinc-900 bg-zinc-50 dark:text-slate-100 text-slate-900 shadow-md dark:shadow-zinc-700/20">
      <Link
        className="flex gap-0.5"
        href={`${pathname}/${articleID}`}
        prefetch={true}
      >
        <div className="w-full">
          {/* <Link className="block" href="#"> */}
          <div className="p-4">
            <h3 className="delay-50 text-md md:text-lg font-semibold transition duration-300 ease-in-out group-hover:text-blue-400 dark:group-hover:text-blue-600 line-clamp-2 md:line-clamp-1">
              {title}
            </h3>
            <p className="mt-2 md:mt-3 line-clamp-4 text-sm text-gray-500 md:line-clamp-2">
              {description}
            </p>
          </div>
          {/* </Link> */}
        </div>
      </Link>
    </Card>
  );
};

export default ArticleCard;
