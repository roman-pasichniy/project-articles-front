import type {
  ArticleDetails,
  ArticlesResponse,
  GetArticlesParams,
} from "@/types/article";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function getArticles(
  params: GetArticlesParams = {},
): Promise<ArticlesResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.perPage !== undefined) {
    searchParams.set("perPage", String(params.perPage));
  }

  if (params.category !== undefined) {
    searchParams.set("category", params.category);
  }

  if (params.sortBy !== undefined) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder !== undefined) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const query = searchParams.toString();
  const url = `${API_URL}/articles${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to load articles",
    );
  }

  return data as ArticlesResponse;
}

export async function getPopularArticles() {
  const response = await getArticles({
    page: 1,
    perPage: 4,
    category: "popular",
  });

  console.log("POPULAR API RESPONSE:", response);
  console.log("POPULAR ARTICLES:", response.data);

  return response.data;
}

export async function createArticle(formData: FormData) {
  const response = await fetch(`${API_URL}/articles`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || `Failed to create article: ${response.status}`,
    );
  }

  return response.json();
}

export class ArticlesApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ArticlesApiError";
    this.status = status;
  }
}

export async function getArticleById(
  articleId: string,
): Promise<ArticleDetails> {
  const response = await fetch(`${API_URL}/articles/${articleId}`, {
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to load article",
    );
  }

  return data as ArticleDetails;
}

export async function addArticleToBookmarks(articleId: string) {
  const response = await fetch(
    `${API_URL}/users/me/saved-articles/${articleId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to save article",
    );
  }

  return data;
}

export async function removeArticleFromBookmarks(articleId: string) {
  const response = await fetch(
    `${API_URL}/users/me/saved-articles/${articleId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to remove article from saved articles",
    );
  }

  return data;
}
