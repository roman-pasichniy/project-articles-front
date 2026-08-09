import ArticleDetails from "@/components/articles/ArticleDetails/ArticleDetails";
import ArticleRecommendations from "@/components/articles/ArticleRecommendations/ArticleRecommendations";
import Container from "@/components/common/Container/Container";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";

export default async function ArticlePage({ params }: PageProps<"/articles/[articleId]">) {
  const { articleId } = await params;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Container>
          <p className={styles.eyebrow}>Article ID: {articleId}</p>
          <h1 className={styles.title}>Article title</h1>
          <ArticleDetails articleId={articleId} />
          <ArticleRecommendations />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
