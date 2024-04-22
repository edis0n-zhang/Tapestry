// types/daily_articles.ts

export interface DailyArticles {
  id?: string;
  date: string;
  articles: Record<string, any>;
}
