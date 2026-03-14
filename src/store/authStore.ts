import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  access: string | null;
  refresh: string | null;
  user: User | null;

  isAuthenticated: boolean;

  setTokens: (access: string, refresh: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  user: null,

  get isAuthenticated() {
    return !!get().access;
  },

  setTokens: (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    set({ access, refresh });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    set({
      access: null,
      refresh: null,
      user: null,
    });
  },
}));