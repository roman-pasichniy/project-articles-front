'use client';

import React, { useEffect, useState } from "react";
import { ArticleDetails as ArticleDetailsType } from "@/types/article";
import css from "./ArticleDetails.module.css";

interface ArticleDetailsProps {
  articleId: string;
}

export default function ArticleDetails({ articleId }: ArticleDetailsProps) {
  const [articleData, setArticleData] = useState<ArticleDetailsType | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${baseUrl}/articles/${articleId}`);
        if (!res.ok) return;

        const data = await res.json();
        setArticleData(data);
      } catch (err) {
        console.error("Error fetching article details:", err);
      }
    };

    fetchArticle();
  }, [articleId, baseUrl]);

  if (!articleData) return null;

  const contentText = articleData.content || articleData.description || "";
  const lines = contentText.split("\n");

  const formattedContent = lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <article className={css.container}>
      <h1 className={css.title}>{articleData.title}</h1>

      <div className={css.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={articleData.photo}
          alt={articleData.title}
          className={css.image}
        />
      </div>

      <div className={css.description}>{formattedContent}</div>
    </article>
  );
}