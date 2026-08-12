"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import css from "./AuthNavigation.module.css";
import UserBar from "../layout/UserBar/UserBar";
import LogoutModal from "../layout/LogoutModal/LogoutModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../common/Button/Button";

interface AuthNavigationProps {
  onLinkClick?: () => void;
}

export default function AuthNavigation({ onLinkClick }: AuthNavigationProps) {
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Отримуємо стан та метод очищення
  const { isAuthenticated, user, clearIsAuthenticated, fetchUser } =
    useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
        <div className={css.authenticated}>
          {/* Обгортка для приховування/показу кнопки на мобільних */}
          <div className={css.createBtnWrapper}>
            <Link href="/articles/new" onClick={onLinkClick}>
              <Button variant="fill" size="md">
                Create an article
              </Button>
            </Link>
          </div>

          {/* UserBar з даними залогіненого юзера */}
          <UserBar onLogoutClick={() => setIsLogoutOpen(true)} />

          {/* Ваша модалка виходу */}
          <LogoutModal
            isOpen={isLogoutOpen}
            isLoading={isLoading}
            onClose={() => setIsLogoutOpen(false)}
            onConfirm={handleConfirmLogout}
          />
        </div>
      ) : (
        <div className={css.unauthenticated}>
          <Link href="/login" onClick={onLinkClick}>
            <Button variant="outline" size="md" className={css.loginBtn}>
              Log in
            </Button>
          </Link>

          <Link href="/register" onClick={onLinkClick}>
            <Button variant="fill" size="md">
              Join now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
