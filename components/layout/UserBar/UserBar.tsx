"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "./UserBar.module.css";

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
  const firstLetter = name.charAt(0).toUpperCase() || "U";

  return (
    <div className={styles.userBar}>
      {/* Посилання на профіль: містить аватарку та ім'я */}
      <Link href="/profile" className={styles.profileLink}>
        <span className={styles.avatar}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={32}
              height={32}
              className={styles.avatarImg}
            />
          ) : (
            <span className={styles.avatarLetter}>{firstLetter}</span>
          )}
        </span>
        <span className={styles.userName}>{name}</span>
      </Link>

      {/* Вертикальний розділювач */}
      <span className={styles.divider} aria-hidden="true" />

      {/* Кнопка виходу */}
      <button
        type="button"
        onClick={onLogoutClick}
        className={styles.exitBtn}
        aria-label="Exit"
      >
        <svg className={styles.exitIcon}>
          <use href="/icons/sprite.svg#icon-log-out" />
        </svg>
      </button>
    </div>
  );
}
