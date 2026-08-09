import { useInfiniteQuery } from "@tanstack/react-query";
import { IAuthor } from "@/types/author";

interface FetchAuthorsResponse {
  data: IAuthor[];
  nextPage: number | null;
}

const LIMIT = 20; // Жорстка умова вашого технічного завдання

const fetchAuthorsRequest = async ({ pageParam = 1 }): Promise<FetchAuthorsResponse> => {
  // Робимо запит до бекенду з урахуванням поточної сторінки та ліміту в 20 елементів
  const res = await fetch(`/api/authors?page=${pageParam}&limit=${LIMIT}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch authors");
  }
  
  const data = await res.json();
  
  return {
    data,
    // Якщо сервер повернув менше 20 елементів, значить дані в БД закінчилися
    nextPage: data.length === LIMIT ? pageParam + 1 : null,
  };
};

export function useInfiniteAuthors() {
  return useInfiniteQuery({
    queryKey: ["authors", "list"], // Унікальний ключ для кешування React Query
    queryFn: fetchAuthorsRequest,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}