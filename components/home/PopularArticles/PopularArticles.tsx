import Container from "@/components/common/Container/Container";
import Link from "next/link";
import styles from "./PopularArticles.module.css";

const placeholders = ["Article one", "Article two", "Article three"];

export default function PopularArticles() {
  return (
    <section className={styles.section} id="popular-articles">
      <Container>
        <div className={styles.heading}>
          <h2 className={styles.title}>Popular Articles</h2>
          <Link className={styles.link} href="/articles">
            See all articles
          </Link>
        </div>
        <ul className={styles.list}>
          {placeholders.map((article) => (
            <li className={styles.card} key={article}>
              <div className={styles.imagePlaceholder} aria-hidden="true" />
              <h3>{article}</h3>
              <p>Article card placeholder for future API data.</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
