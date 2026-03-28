import api from "../api/axios";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

interface LoginResponse {
  access: string;
  refresh: string;
}

export const authService = {
  async login(data: LoginInput): Promise<LoginResponse> {
    const response = await api.post("/auth/login/", data);
    return response.data;
  },

  async register(data: RegisterInput): Promise<void> {
    await api.post("/auth/register/", data);
  },

  async getProfile() {
    const response = await api.get("/auth/me/");
    return response.data;
  },
};