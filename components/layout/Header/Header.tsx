import Container from "@/components/common/Container/Container";
import Link from "next/link";
import styles from "./Header.module.css";

import css from "./Header.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        {/* Логотип */}
        <Link href="/" aria-label="Home" className={css.logo}>
          harmoniq
        </Link>

        {/* Основна навігація */}
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/" className={css.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/articles" className={css.navLink}>
                + Articles
              </Link>
            </li>
            <li>
              <Link href="/authors" className={css.navLink}>
                Creators
              </Link>
            </li>

            {/* Компонент авторизації / профілю */}
            <li className={css.authItem}>
              <AuthNavigation />
            </li>
          </ul>
        </nav>
        {/* 2. Вставляємо MobileMenu тут
        <MobileMenu /> */}
      </Container>
    </header>
  );
}
