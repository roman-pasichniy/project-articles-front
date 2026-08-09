import styles from "./ArticlesItem.module.css";

type ArticlesItemProps = { title?: string };

export default function ArticlesItem({ title = "Article title" }: ArticlesItemProps) {
  return <article className={styles.card}><div className={styles.image} /><h3>{title}</h3></article>;
}
