import styles from "./Pagination.module.css";

export default function Pagination() {
  return <nav className={styles.pagination} aria-label="Pagination"><button type="button">Previous</button><span>1</span><button type="button">Next</button></nav>;
}
