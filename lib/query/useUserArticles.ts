import type { ArticlesResponse } from "@/types/article";
import { getUserArticles } from "../api/users";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useUserArticles(userId: string, perPage = 10) {
  return useInfiniteQuery({
    queryKey: ["userArticles", userId, perPage],

    queryFn: ({ pageParam }) => getUserArticles(userId, pageParam, perPage),

    initialPageParam: 1,

    getNextPageParam: (lastPage: ArticlesResponse) => {
      const { page, totalPages } = lastPage.pagination;

      return page < totalPages ? page + 1 : undefined;
    },
  });
}
