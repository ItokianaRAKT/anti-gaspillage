import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone1: "",
    phone2: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse(form);

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    try {
      await authService.register(parsed.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-[420px] space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-bold">Inscription</h1>

        {Object.keys(form).map((key) => (
          <div key={key}>
            <input
              type={key === "password" ? "password" : "text"}
              placeholder={key}
              className="w-full rounded border p-2"
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
            />
            {errors[key] && (
              <p className="text-sm text-red-500">
                {errors[key][0]}
              </p>
            )}
          </div>
        ))}

        <button className="w-full rounded bg-green-600 p-2 text-white hover:bg-green-700">
          S'inscrire
        </button>
      </form>
    </div>
  );
}