import Container from "@/components/common/Container/Container";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link className={styles.logo} href="/" aria-label="Harmoniq — головна">
            Harmoniq
          </Link>

          <nav className={styles.navigation} aria-label="Основна навігація">
            <Link href="/">Home</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/authors">Creators</Link>
            <Link href="/login">Log in</Link>
          </nav>

          <button className={styles.menuButton} type="button" aria-label="Відкрити меню">
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>
    </header>
  );
}
