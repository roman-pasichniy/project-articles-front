import Link from "next/link";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  return <nav className={styles.menu} aria-label="Мобільна навігація"><Link href="/">Home</Link><Link href="/articles">Articles</Link><Link href="/authors">Creators</Link></nav>;
}
