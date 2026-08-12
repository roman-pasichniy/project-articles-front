"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { getCurrentUser } from "@/lib/api/api";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // Одразу запитуємо поточного користувача
        const user = await getCurrentUser();

        if (isMounted && user) {
          setUser(user);
        }
      } catch {
        // Якщо сесія недійсна/помилка — скидаємо авторизацію
        if (isMounted) {
          clearIsAuthenticated();
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
