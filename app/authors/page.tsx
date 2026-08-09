import AuthorsList from "@/components/authors/AuthorsList/AuthorsList";
import Container from "@/components/common/Container/Container";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";

export default function AuthorsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Container>
          <h1 className={styles.title}>Authors</h1>
          <p className={styles.description}>The authors list will be rendered here.</p>
          <AuthorsList />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
