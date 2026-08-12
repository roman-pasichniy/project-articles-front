"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useUserArticles } from "@/lib/query/useUserArticles";
import ArticlesItem from "@/components/articles/ArticlesItem/ArticlesItem";
import Loader from "@/components/common/Loader/Loader";
import styles from "./AuthorArticlesList.module.css";

const ARTICLES_PER_PAGE = 10;

type AuthorArticlesListProps = {
  authorId: string;
};

export default function AuthorArticlesList({
  authorId,
}: AuthorArticlesListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useUserArticles(authorId, ARTICLES_PER_PAGE);

  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load author articles",
      );
    }
  }, [isError, error]);

  const loadMore = async () => {
    const result = await fetchNextPage();

    if (result.isSuccess) {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (isLoading) {
    return <Loader fullScreen={false} label="Loading articles" />;
  }

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];
  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <>
      <ul ref={listRef} className={styles.list}>
        {articles.map((article) => (
          <li key={article._id}>
            <ArticlesItem
              articleId={article._id}
              title={article.title}
              description={article.description}
              photo={article.photo}
              author={article.author ?? "Harmoniq author"}
            />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button type="button" onClick={loadMore} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
