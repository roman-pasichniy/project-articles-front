"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader/Loader";
import { addArticleToBookmarks, ArticlesApiError } from "@/lib/api/articles";
import ModalErrorSave from "../ModalErrorSave/ModalErrorSave";
import styles from "./ButtonAddToBookmarks.module.css";

type ButtonAddToBookmarksProps = {
  articleId: string;
};

export default function ButtonAddToBookmarks({
  articleId,
}: ButtonAddToBookmarksProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSave = async () => {
    if (isLoading || isSaved) return;

    try {
      setIsLoading(true);
      await addArticleToBookmarks(articleId);
      setIsSaved(true);
      toast.success("Article saved");
    } catch (error) {
      if (error instanceof ArticlesApiError) {
        if (error.status === 401) {
          setIsLoginModalOpen(true);
          return;
        }

        if (error.status === 409) {
          setIsSaved(true);
          return;
        }
      }

      toast.error(
        error instanceof Error ? error.message : "Failed to save article",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className={`${styles.button} ${isSaved ? styles.saved : ""}`}
        type="button"
        aria-label={isSaved ? "Article saved" : "Save article"}
        aria-pressed={isSaved}
        disabled={isLoading || isSaved}
        onClick={handleSave}
      >
        {isLoading ? (
          <span className={styles.loader}>
            <Loader fullScreen={false} label="Saving article" />
          </span>
        ) : (
          <svg className={styles.icon} aria-hidden="true">
            <use href="/icons/sprite.svg#icon-save" />
          </svg>
        )}
      </button>

      <ModalErrorSave
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
