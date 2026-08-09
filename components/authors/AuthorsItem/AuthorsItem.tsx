import styles from "./AuthorsItem.module.css";

type AuthorsItemProps = { name?: string };

export default function AuthorsItem({ name = "Author name" }: AuthorsItemProps) {
  return <article className={styles.card}><div className={styles.avatar} /><h3>{name}</h3></article>;
}
