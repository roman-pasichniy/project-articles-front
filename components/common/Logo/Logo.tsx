import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return <Link className={styles.logo} href="/" aria-label="Harmoniq — головна">Harmoniq</Link>;
}
