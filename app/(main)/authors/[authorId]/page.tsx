import ArticlesList from "@/components/articles/ArticlesList/ArticlesList";
import AuthorInfo from "@/components/authors/AuthorInfo/AuthorInfo";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default async function AuthorPage({
  params,
}: PageProps<"/authors/[authorId]">) {
  const { authorId } = await params;

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <p className={styles.eyebrow}>Author ID: {authorId}</p>
          <AuthorInfo authorId={authorId} />
          <h2 className={styles.title}>Created articles</h2>
          <ArticlesList />
        </Container>
      </section>
    </div>
  );
}
