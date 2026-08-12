import Image from "next/image";
import Link from "next/link";
import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import styles from "./ArticlesItem.module.css";

type ArticlesItemProps = {
  articleId?: string;
  title?: string;
  description?: string;
  photo?: string;
  author?: string;
};

export default function ArticlesItem({
  articleId = "preview",
  title = "Article title",
  description = "A short description of the article will appear here.",
  photo = "/images/dandelion-sunset.webp",
  author = "Harmoniq author",
}: ArticlesItemProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={photo}
          alt={title}
          fill
          sizes="(min-width: 1440px) 288px, (min-width: 768px) 336px, 100vw"
        />
      </div>

      <div className={styles.textContent}>
        <p className={styles.author}>{author}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        <Link className={styles.learnMore} href={`/articles/${articleId}`}>
          Learn more
        </Link>
        <ButtonAddToBookmarks articleId={articleId} />
      </div>
    </article>
  );
}
