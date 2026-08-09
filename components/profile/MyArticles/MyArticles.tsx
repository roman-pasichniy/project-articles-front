import EmptyState from "@/components/common/EmptyState/EmptyState";
import styles from "./MyArticles.module.css";

export default function MyArticles() {
  return <section className={styles.section}><h2>My articles</h2><EmptyState title="No articles yet" description="Articles you create will appear here." /></section>;
}
