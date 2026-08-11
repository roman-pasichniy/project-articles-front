"use client";

import { useState } from "react";
import ArticlesFilter from "../ArticlesFilter/ArticlesFilter";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import Loader from "@/components/common/Loader/Loader";
import Pagination from "@/components/common/Pagination/Pagination";
import { useArticles } from "@/lib/query/useArticles";
import type { GetArticlesParams } from "@/types/article";
import styles from "./ArticlesList.module.css";

const ARTICLES_PER_PAGE = 12;

type SortBy = NonNullable<GetArticlesParams["sortBy"]>;
type SortOrder = NonNullable<GetArticlesParams["sortOrder"]>;

export default function ArticlesList() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const { data, isLoading, isFetching, isError, error } = useArticles({
    page,
    perPage: ARTICLES_PER_PAGE,
    sortBy,
    sortOrder,
  });

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0 });
  };

  const changeSortBy = (value: SortBy) => {
    setSortBy(value);
    setPage(1);
  };

  const changeSortOrder = (value: SortOrder) => {
    setSortOrder(value);
    setPage(1);
  };

  if (isLoading) {
    return <Loader fullScreen={false} label="Loading articles" />;
  }

  if (isError) {
    return (
      <p role="alert">
        {error instanceof Error ? error.message : "Failed to load articles"}
      </p>
    );
  }

  return (
    <>
      <ArticlesFilter
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={changeSortBy}
        onSortOrderChange={changeSortOrder}
      />

      {!data || data.data.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className={styles.list}>
          {data.data.map((article) => (
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
      )}

      {data && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPrevious={() => changePage(page - 1)}
          onNext={() => changePage(page + 1)}
          disabled={isFetching}
        />
      )}
    </>
  );
}
