import { create } from "zustand";
import { login } from "../services/auth.service";

interface AuthStore {
    accessToken: string | null;
    refreshToken: string | null;
    connecter: (username: string, password: string) => Promise<void>;
    deconnecter: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    refreshToken: null,

    connecter: async (username, password) => {
        const data = await login(username, password);
        set({ accessToken: data.access, refreshToken: data.refresh });
    },

    deconnecter: () => set({ accessToken: null, refreshToken: null }),
}));

export { useAuthStore };