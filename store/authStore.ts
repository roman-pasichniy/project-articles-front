import { create } from "zustand";
import { User } from "@/types/user";
import { getCurrentUser } from "@/lib/api/api";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  fetchUser: async () => {
    try {
      const data = await getCurrentUser();
      set({
        user: data,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));
