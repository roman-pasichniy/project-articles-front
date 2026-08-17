'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, ArticleDetails as ArticleDetailsType } from "@/types/article";
import css from "./ArticleRecommendations.module.css";

interface ArticleRecommendationsProps {
  currentArticleId: string;
  onSaveToBookmarks?: (articleId: string) => void;
}

export default function ArticleRecommendations({
  currentArticleId,
  onSaveToBookmarks,
}: ArticleRecommendationsProps) {
  const [currentArticle, setCurrentArticle] = useState<ArticleDetailsType | null>(null);
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!currentArticleId) return;

    const fetchCurrentArticle = async () => {
      try {
        const res = await fetch(`${baseUrl}/articles/${currentArticleId}`);
        if (!res.ok) return;
        const data = await res.json();
        setCurrentArticle(data);
      } catch (error) {
        console.error("Failed to load current article:", error);
      }
    };

    fetchCurrentArticle();
  }, [currentArticleId, baseUrl]);


  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${baseUrl}/articles`);
        if (!res.ok) return;

        const data = await res.json();
        const articlesList: Article[] = Array.isArray(data)
          ? data
          : data.data || data.articles || [];

        const filtered = articlesList.filter((item) => item._id !== currentArticleId);
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        setRecommendations(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Failed to load recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [currentArticleId, baseUrl]);

  const publicationDate = currentArticle?.date
    ? new Intl.DateTimeFormat("uk-UA").format(new Date(`${currentArticle.date}T00:00:00`))
    : "";

 return (
  <section className={css.section}>
    <div className={css.panel}>
      <p className={css.info}>
        <strong>Author:</strong>{" "}
        {currentArticle?.owner ? (
          <Link className={css.authorLink} href={`/authors/${currentArticle.owner._id}`}>
            {currentArticle.owner.name}
          </Link>
        ) : (
          "Автор невідомий"
        )}
      </p>
      <p className={css.info}>
        <strong>Publication date:</strong> {publicationDate}
      </p>

      <h2 className={css.title}>You can also interested</h2>

      <ul className={css.list}>
        {recommendations.map((item) => (
          <li key={item._id}>
            <Link className={css.card} href={`/articles/${item._id}`}>
              <span className={css.cardText}>
                <strong className={css.cardTitle}>{item.title}</strong>
                <span className={css.cardAuthor}>{item.author || "Unknown"}</span>
              </span>
              <span className={css.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
<button
  type="button"
  tabIndex={0}
  className={css.saveButton}
  onClick={() => onSaveToBookmarks?.(currentArticleId)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      onSaveToBookmarks?.(currentArticleId);
    }
  }}
>
  <span>Save</span>
          <svg width="14" height="14" viewBox="0 0 32 32" className={css.iconHome}>
          <path 
strokeWidth="1"
            d="M15.996 4.667c2.021 0 3.842 0.232 5.148 0.461 1.109 0.195 1.975 0.948 2.255 1.996 0.467 1.75 1.006 4.704 0.926 8.863-0.088 4.606-0.843 7.751-1.473 9.602-0.11 0.324-0.339 0.485-0.594 0.525-0.269 0.042-0.605-0.048-0.879-0.328-0.797-0.818-1.788-1.785-2.716-2.552-0.463-0.382-0.926-0.727-1.351-0.98-0.399-0.237-0.868-0.458-1.316-0.458-0.44 0-0.927 0.215-1.353 0.448-0.457 0.25-0.967 0.593-1.486 0.975-1.039 0.766-2.172 1.734-3.089 2.551-0.303 0.27-0.657 0.331-0.934 0.259-0.264-0.069-0.493-0.266-0.573-0.621-0.427-1.891-0.896-4.978-0.896-9.406 0-4.351 0.509-7.247 0.947-8.93 0.264-1.014 1.1-1.742 2.181-1.934 1.31-0.232 3.153-0.47 5.202-0.47z" 
          />
        </svg>
</button>
  </section>
);
}