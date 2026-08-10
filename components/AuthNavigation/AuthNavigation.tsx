"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import UserBar from "../layout/UserBar/UserBar";
import LogoutModal from "../layout/LogoutModal/LogoutModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthNavigationProps {
  onLinkClick?: () => void;
}

export default function AuthNavigation({ onLinkClick }: AuthNavigationProps) {
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Отримуємо стан та метод очищення
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  // Логіка підтвердження виходу
  const handleConfirmLogout = async () => {
    try {
      setIsLoading(true);

      // 1. Очищаємо Zustand стор
      clearIsAuthenticated();

      // 2. Закриваємо модалку
      setIsLogoutOpen(false);

      if (onLinkClick) {
        onLinkClick();
      }

      // 3. Редірект на головну
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.authNav}>
      {isAuthenticated ? (
        <>
          {/* Створити статтю */}
          <Link
            href="/articles/new"
            onClick={onLinkClick}
            className={css.actionBtn}
          >
            Create an article
          </Link>

          {/* UserBar з даними залогіненого юзера */}
          <UserBar
            name={user?.name}
            avatarUrl={user?.avatarUrl}
            onLogoutClick={() => setIsLogoutOpen(true)}
          />

          {/* Ваша модалка виходу */}
          <LogoutModal
            isOpen={isLogoutOpen}
            isLoading={isLoading}
            onClose={() => setIsLogoutOpen(false)}
            onConfirm={handleConfirmLogout}
          />
        </>
      ) : (
        <>
          {/* Неавторизований стан */}
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
