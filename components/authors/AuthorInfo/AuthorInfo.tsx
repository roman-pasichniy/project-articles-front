import styles from "./AuthorInfo.module.css";

type AuthorInfoProps = { authorId?: string };

export default function AuthorInfo({ authorId }: AuthorInfoProps) {
  return <section className={styles.info}><h1>Author profile</h1><p>{authorId ?? "Author information"}</p></section>;
}
