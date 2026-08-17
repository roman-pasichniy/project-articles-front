'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Article, ArticleDetails as ArticleDetailsType } from "@/types/article";
import css from "./ArticleRecommendations.module.css";
import ButtonAddToBookmarks from "@/components/articles/ButtonAddToBookmarks/ButtonAddToBookmarks";

interface ArticleRecommendationsProps {
  currentArticleId: string;
}

export default function ArticleRecommendations({
  currentArticleId,
}: ArticleRecommendationsProps) {
  const [currentArticle, setCurrentArticle] = useState<ArticleDetailsType | null>(null);
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const saveWrapperRef = useRef<HTMLDivElement>(null);

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

  const handleSaveWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const innerButton = saveWrapperRef.current?.querySelector("button");
    const target = event.target as Node;

    if (innerButton && target !== innerButton && !innerButton.contains(target)) {
      innerButton.click();
    }
  };

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
                  <span className={css.cardAuthor}>{item.owner?.name || "Unknown"}</span>
                </span>
                <span className={css.arrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={css.saveButton}
        ref={saveWrapperRef}
        onClick={handleSaveWrapperClick}
      >
        <span>Save</span>
        <ButtonAddToBookmarks articleId={currentArticleId} />
      </div>
    </section>
  );
}