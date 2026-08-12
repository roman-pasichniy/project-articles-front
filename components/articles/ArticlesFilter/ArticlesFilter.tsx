"use client";

import type { GetArticlesParams } from "@/types/article";
import styles from "./ArticlesFilter.module.css";

type SortBy = NonNullable<GetArticlesParams["sortBy"]>;
type SortOrder = NonNullable<GetArticlesParams["sortOrder"]>;

type ArticlesFilterProps = {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortByChange: (value: SortBy) => void;
  onSortOrderChange: (value: SortOrder) => void;
};

export default function ArticlesFilter({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: ArticlesFilterProps) {
  return (
    <div className={styles.filter} aria-label="Article filters">
      <label className={styles.field}>
        <span>Sort by</span>

        <select
          className={styles.select}
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value as SortBy)}
        >
          <option value="date">Date</option>
          <option value="rate">Rating</option>
          <option value="title">Title</option>
        </select>
      </label>

      <label className={styles.field}>
        <span>Order</span>

        <select
          className={styles.select}
          value={sortOrder}
          onChange={(event) =>
            onSortOrderChange(event.target.value as SortOrder)
          }
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
}
