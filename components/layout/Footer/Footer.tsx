import Container from "@/components/common/Container/Container";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <Link className={styles.logo} href="/">
            Harmoniq
          </Link>
          <p>© 2026 Harmoniq. All rights reserved.</p>
          <nav className={styles.navigation} aria-label="Навігація у футері">
            <Link href="/articles">Articles</Link>
            <Link href="/profile">Account</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
