import AuthorsItem from "../AuthorsItem/AuthorsItem";
import styles from "./AuthorsList.module.css";

export default function AuthorsList() {
  return <ul className={styles.list}>{[1, 2, 3, 4].map((item) => <li key={item}><AuthorsItem /></li>)}</ul>;
}
