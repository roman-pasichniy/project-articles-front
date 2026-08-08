import styles from "./UserBar.module.css";

type UserBarProps = { name?: string };

export default function UserBar({ name = "User" }: UserBarProps) {
  return <div className={styles.userBar}><span className={styles.avatar} /><span>{name}</span></div>;
}
