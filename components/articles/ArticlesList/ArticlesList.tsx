import ArticlesItem from "../ArticlesItem/ArticlesItem";
import styles from "./ArticlesList.module.css";

export default function ArticlesList() {
  return <ul className={styles.list}>{[1, 2, 3].map((item) => <li key={item}><ArticlesItem /></li>)}</ul>;
}
