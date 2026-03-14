import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);

  const [form, setForm] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse(form);

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    try {
      const data = await authService.login(parsed.data);

      setTokens(data.access, data.refresh);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Identifiants invalides");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-96 space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-bold">Connexion</h1>

        <div>
          <input
            className="w-full rounded border p-2"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
          {errors.username && (
            <p className="text-sm text-red-500">
              {errors.username[0]}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            className="w-full rounded border p-2"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password[0]}
            </p>
          )}
        </div>

        <button className="w-full rounded bg-green-600 p-2 text-white hover:bg-green-700">
          Se connecter
        </button>
      </form>
    </div>
  );
}