"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";

interface AuthNavigationProps {
  onLinkClick?: () => void;
}

export default function AuthNavigation({ onLinkClick }: AuthNavigationProps) {
  const router = useRouter();

  // Отримуємо стан та метод очищення зі стору Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  // Обробка виходу з акаунту
  const handleLogout = async () => {
    try {
      // Якщо у вас є API для логауту, викликаємо його сюди (наприклад: await logoutApi())

      // Очищаємо стан у Zustand
      clearIsAuthenticated();

      if (onLinkClick) onLinkClick();

      // Редірект на головну та оновлення серверних даних
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={css.authNav}>
      {isAuthenticated ? (
        <>
          {/* Секція для авторизованого користувача */}
          <Link
            href="/articles/new"
            onClick={onLinkClick}
            className={css.actionBtn}
          >
            Create an article
          </Link>

          <Link href="/profile" onClick={onLinkClick} className={css.userLink}>
            My profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className={css.logoutBtn}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          {/* Секція для неавторизованого користувача */}
          <Link href="/login" onClick={onLinkClick} className={css.loginLink}>
            Log in
          </Link>

          <Link
            href="/register"
            onClick={onLinkClick}
            className={css.actionBtn}
          >
            Join now
          </Link>
        </>
      )}
    </div>
  );
}
