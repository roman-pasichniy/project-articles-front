// import ArticleDetails from "@/components/articles/ArticleDetails/ArticleDetails";
// import ArticleRecommendations from "@/components/articles/ArticleRecommendations/ArticleRecommendations";
// import Container from "@/components/common/Container/Container";
// import styles from "./page.module.css";

// type ArticlePageProps = {
//   params: Promise<{ articleId: string }>;
// };

// export default async function ArticlePage({ params }: ArticlePageProps) {
//   const { articleId } = await params;

//   return (
//     <div className={styles.page}>
//       <section className={styles.main}>
//         <Container>
//           <p className={styles.eyebrow}>Article ID: {articleId}</p>
//           <h1 className={styles.title}>Article title</h1>
//           <ArticleDetails articleId={articleId} />
//           <ArticleRecommendations />
//         </Container>
//       </section>
//     </div>
//   );
// }
import { notFound } from "next/navigation";
import ArticleDetails from "@/components/articles/ArticleDetails/ArticleDetails";
import ArticleRecommendations from "@/components/articles/ArticleRecommendations/ArticleRecommendations";
import Container from "@/components/common/Container/Container";
import { ArticlesApiError, getArticleById } from "@/lib/api/articles";
import styles from "./page.module.css";

type ArticlePageProps = {
  params: Promise<{ articleId: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = await params;

  let article: Awaited<ReturnType<typeof getArticleById>>;

  try {
    article = await getArticleById(articleId);
  } catch (error) {
    if (
      error instanceof ArticlesApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <main className={styles.main}>
      <Container>
        <ArticleDetails
          article={article}
          sidebar={<ArticleRecommendations article={article} />}
        />
      </Container>
    </main>
  );
}
