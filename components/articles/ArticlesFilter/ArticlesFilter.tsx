"use client";

import styles from "./ArticlesFilter.module.css";

type Category = "all" | "popular";

type ArticlesFilterProps = {
  category: Category;
  onCategoryChange: (value: Category) => void;
};

export default function ArticlesFilter({
  category,
  onCategoryChange,
}: ArticlesFilterProps) {
  return (
    <div className={styles.filter}>
      <label className={styles.field}>
      <select
          className={styles.select}
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value as Category)
          }
        >
          <option value="all">All</option>
          <option value="popular">Popular</option>
        </select>
      </label>
    </div>
  );
}