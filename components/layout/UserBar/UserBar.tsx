import Link from "next/link";
import styles from "./UserBar.module.css";
import Image from "next/image";

type UserBarProps = {
  name?: string;
  avatarUrl?: string;
  onLogoutClick: () => void;
};

export default function UserBar({
  name = "User",
  avatarUrl,
  onLogoutClick,
}: UserBarProps) {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "U";
  return (
    <div className={styles.userBar}>
      <Link href="/profile" className={styles.profileLink}>
        <div className={styles.avatar}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={36}
              height={36}
              className={styles.avatarImg}
            />
          ) : (
            <span>{firstLetter}</span>
          )}
        </div>
        <span className={styles.userName}>{name}</span>
      </Link>

      <span className={styles.divider} aria-hidden="true"></span>

      <button
        type="button"
        onClick={onLogoutClick}
        className={styles.exitBtn}
        aria-label="Exit"
      >
        <svg className={styles.exitIcon}>
          <use href="/icons/sprite.svg#icon-logout"></use>
        </svg>
      </button>
    </div>
  );
}
