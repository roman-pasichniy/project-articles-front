import AddArticleForm from "@/components/articles/AddArticleForm/AddArticleForm";
import Container from "@/components/common/Container/Container";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";

export default async function EditArticlePage({ params }: PageProps<"/articles/[articleId]/edit">) {
  const { articleId } = await params;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Container>
          <h1 className={styles.title}>Edit article</h1>
          <p className={styles.articleId}>Article ID: {articleId}</p>
          <AddArticleForm />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
