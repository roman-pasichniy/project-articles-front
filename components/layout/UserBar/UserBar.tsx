import Link from "next/link";
import styles from "./UserBar.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type UserBarProps = {
  onLogoutClick: () => void;
};

export default function UserBar({ onLogoutClick }: UserBarProps) {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const name = user?.name || "User";
  const avatarUrl = user?.avatarUrl;

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
