import { create } from "zustand";
import { authService } from "../services/auth.service";

interface User {
  id_user: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  tel1_user: string;
  tel2_user: string;
  address_user: string;
  profile_pic_user: string | null;
  saved_in_90_days: number;
  total_product_saved: number;
  date_joined: string;
}

interface AuthState {
  access: string | null;
  refresh: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setTokens: (access: string, refresh: string) => void;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
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

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      const data = await authService.getProfile();
      set({ user: data });
    } catch (e) {
      console.error("Erreur chargement profil", e);
    }
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    set({ access: null, refresh: null, user: null });
  },
}));