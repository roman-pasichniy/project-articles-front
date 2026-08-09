import EmptyState from "@/components/common/EmptyState/EmptyState";
import styles from "./SavedArticles.module.css";

export default function SavedArticles() {
  return <section className={styles.section}><h2>Saved articles</h2><EmptyState title="No saved articles" description="Articles you save will appear here." /></section>;
}
