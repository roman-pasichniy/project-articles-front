import styles from "./ProfileHeader.module.css";

type ProfileHeaderProps = { name?: string };

export default function ProfileHeader({ name = "User name" }: ProfileHeaderProps) {
  return <section className={styles.header}><div className={styles.avatar} /><div><h1>{name}</h1><p>Profile information</p></div></section>;
}
