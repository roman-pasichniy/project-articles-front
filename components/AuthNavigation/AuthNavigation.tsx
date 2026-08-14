"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import UserBar from "../layout/UserBar/UserBar";
import LogoutModal from "../layout/LogoutModal/LogoutModal";
import Button from "../common/Button/Button";
import css from "./AuthNavigation.module.css";

interface AuthNavigationProps {
  onLinkClick?: () => void;
}

export default function AuthNavigation({ onLinkClick }: AuthNavigationProps) {
  const router = useRouter();

  const { user, isLoggedIn, fetchCurrentUser, logout } = useAuthStore();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user?._id) {
      fetchCurrentUser();
    }
  }, [isLoggedIn, user?._id, fetchCurrentUser]);

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout();
      setIsLogoutOpen(false);
      router.push("/");
      if (onLinkClick) onLinkClick();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={css.authNav}>
      {isLoggedIn && user ? (
        <div className={css.authenticated}>
          <div className={css.createBtnWrapper}>
            <Link href="/articles/create" onClick={onLinkClick}>
              <Button variant="fill" size="md">
                Create an article
              </Button>
            </Link>
          </div>

          <UserBar onLogoutClick={() => setIsLogoutOpen(true)} />

          {isLogoutOpen && (
            <LogoutModal
              isOpen={isLogoutOpen}
              isLoading={isLoggingOut}
              onClose={() => setIsLogoutOpen(false)}
              onConfirm={handleConfirmLogout}
            />
          )}
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
