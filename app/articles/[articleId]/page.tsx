import ArticleDetails from "@/components/articles/ArticleDetails/ArticleDetails";
import ArticleRecommendations from "@/components/articles/ArticleRecommendations/ArticleRecommendations";
import css from "./page.module.css";

interface PageProps {
  params: Promise<{ articleId: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { articleId } = await params;

  return (
    <div className={css.page}>
      <main className={css.main}>
        <ArticleDetails articleId={articleId} />
      </main>

      <aside className={css.aside}>
        <ArticleRecommendations currentArticleId={articleId} />
      </aside>
    </div>
  );
}