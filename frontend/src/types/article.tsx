// types/article.ts

export interface Article {
  id?: string; // Assuming ObjectId is serialized to string
  articleID: string;
  title: string;
  content: Record<string, any>; // 'dict' in Python is similar to 'Record<string, any>' in TypeScript
  sources: Record<string, any>;
  published_date: string;
}
