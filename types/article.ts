export type Article = {
  _id: string;
  photo: string;
  title: string;
  description: string;
  content?: string;
  rate?: number;
  ownerId: string;
  date: string;
  author?: string;
  category?: "popular" | "general";
};

export type ArticlesResponse = {
  data: Article[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export type GetArticlesParams = {
  page?: number;
  perPage?: number;
  category?: "popular" | "general";
  sortBy?: "date" | "rate" | "title";
  sortOrder?: "asc" | "desc";
};

export type UserArticle = {
  _id: string;
  title: string;
  description: string;
  photo: string;
  author: string;
  ownerId: string;
  date: string;
};

export type UserArticlesResponse = {
  articles: UserArticle[];
  pagination: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
};
