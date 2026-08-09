import Link from "next/link";
import Image from "next/image";
import styles from "./authors-item.module.css"; 

type AuthorsItemProps = { 
  id: string | number; // Потрібен для динамічного посилання на сторінку автора
  name?: string;       // Ім'я автора
  avatarUrl?: string;  // Посилання на контентне зображення аватара
};

export default function AuthorsItem({ 
  id, 
  name = "Author name", 
  avatarUrl 
}: AuthorsItemProps) {
  return (
    <li className={styles.itemWrapper}>
      {/* Критерій 3: Клік по картці з автором переадресовує юзера на сторінку з профілем автора */}
      <Link href={`/authors/${id}`} className={styles.cardLink}>
        <article className={styles.card}>
          
          {/* Критерій 1: Зображення, яке реалізоване як контентне за допомогою Next.js Image */}
          <div className={styles.avatar}>
            <Image
              src={avatarUrl || "/placeholder.svg"} // Заглушка в public/, якщо немає картинки
              alt={`Avatar of ${name}`}
              fill // Дозволяє контентному зображенню адаптивно заповнити весь блок
              className={styles.image}
              sizes="(max-width: 768px) 50vw, 160px"
              priority={false}
            />
          </div>

          {/* Критерій 2: Ім'я автора */}
          <h3 className={styles.authorName}>{name}</h3>
          
        </article>
      </Link>
    </li>
  );
}