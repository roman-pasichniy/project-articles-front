import AddArticleForm from "@/components/articles/AddArticleForm/AddArticleForm";
import Container from "@/components/common/Container/Container";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";

export default function CreateArticlePage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Container>
          <h1 className={styles.title}>Create an article</h1>
          <AddArticleForm />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
