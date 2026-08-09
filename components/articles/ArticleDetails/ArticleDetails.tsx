import styles from "./ArticleDetails.module.css";

type ArticleDetailsProps = { articleId?: string };

export default function ArticleDetails({ articleId }: ArticleDetailsProps) {
  return <article className={styles.article}>Article details {articleId ? `for ${articleId}` : ""}</article>;
}
