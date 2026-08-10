import ArticlesFilter from "@/components/articles/ArticlesFilter/ArticlesFilter";
import ArticlesList from "@/components/articles/ArticlesList/ArticlesList";
import Container from "@/components/common/Container/Container";
import Pagination from "@/components/common/Pagination/Pagination";
import styles from "./page.module.css";

export default function ArticlesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <h1 className={styles.title}>Articles</h1>
          <p className={styles.description}>Browse community articles.</p>
          <ArticlesFilter />
          <ArticlesList />
          <Pagination />
        </Container>
      </section>
    </div>
  );
}
