import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //  IMPORTANT
});

// =====================
// REQUEST INTERCEPTOR
// =====================
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =====================
// RESPONSE INTERCEPTOR
// =====================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = useAuthStore.getState().refresh;
        if (!refresh) throw new Error("No refresh token");

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh/`,
          { refresh }
        );

        useAuthStore.getState().setTokens(
          data.access,
          data.refresh ?? refresh
        );

        original.headers.Authorization = `Bearer ${data.access}`;

        return api(original);
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;