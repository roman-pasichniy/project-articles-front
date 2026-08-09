import { IAuthor } from "@/lib/query/useAuthors";
import AuthorsItem from "../AuthorsItem/authors-item";
import styles from "./authors-list.module.css";

type AuthorsListProps = {
  authors: IAuthor[];
  newItemsRef: React.RefObject<HTMLDivElement | null>;
  loadedBeforeCount: number;
};

export default function AuthorsList({ authors, newItemsRef, loadedBeforeCount }: AuthorsListProps) {
  return (
    <ul className={styles.list}>
      {authors.map((author, index) => {
        // Визначаємо перший елемент з кожної нової завантаженої порції
        const isFirstOfNewBatch = index === loadedBeforeCount && loadedBeforeCount > 0;

        return (
          // Використовуємо display: contents, щоб повісити ref для скролу.
          // Цей div не рендериться як видимий блок у DOM і не ламає CSS Grid (.list) від тімліда.
          <div 
            key={author.id} 
            ref={isFirstOfNewBatch ? newItemsRef : null} 
            style={{ display: "contents" }}
          >
            <AuthorsItem 
              id={author.id}
              name={author.name}
              avatarUrl={author.avatarUrl}
            />
          </div>
        );
      })}
    </ul>
  );
}