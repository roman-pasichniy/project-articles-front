import Image from "next/image";
import Link from "next/link";
import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import type { Article } from "@/types/article";
import styles from "./ArticlesItem.module.css";

type ArticlesItemProps = {
  article: Article;
};

export default function ArticlesItem({ article }: ArticlesItemProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {article.img ? (
          <Image
            className={styles.image}
            src={article.img}
            alt={article.title}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1439px) 33vw, 33vw"
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      <div className={styles.textContent}>
        <h3 className={styles.title}>{article.title}</h3>

        <p className={styles.description}>{article.desc}</p>
      </div>

      <div className={styles.actions}>
        <Link className={styles.learnMore} href={`/articles/${article._id}`}>
          Learn more
        </Link>

        <ButtonAddToBookmarks articleId={article._id} />
      </div>
    </article>
  );
}
