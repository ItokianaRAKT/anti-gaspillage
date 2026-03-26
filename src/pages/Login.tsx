import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export default function Login() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const [form, setForm] = useState<LoginInput>({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setLoading(true);
    try {
      const data = await authService.login(parsed.data);
      setTokens(data.access, data.refresh);
      navigate("/");
    } catch (error) {
      setApiError("Identifiants invalides. Vérifiez votre nom d'utilisateur et mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Panneau gauche — décoratif */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a4a2e 0%, #2d7a4f 50%, #4caf7d 100%)" }}
      >
        {/* Cercles décoratifs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: "white" }} />
        <div className="absolute bottom-20 -right-10 w-60 h-60 rounded-full opacity-10" style={{ background: "white" }} />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full opacity-5" style={{ background: "white" }} />

        {/* Logo */}
        <div className="mt-10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              🌿
            </div>
            <span className="text-white text-xl font-bold tracking-tight">AntiGaspillage</span>
          </div>
        </div>

        {/* Citation */}
        <div className="relative z-10">
          <p className="text-white/90 text-3xl font-light leading-relaxed mb-6">
            Ensemble, réduisons<br />
            <span className="font-bold text-white">le gaspillage alimentaire</span><br />
            à Madagascar.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">
              AG
            </div>
            <div>
              <p className="text-white text-sm font-medium">Communauté AntiGaspillage</p>
              <p className="text-white/60 text-xs">Plus de 1000 produits sauvés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Bon retour</h1>
              <p className="text-gray-500 text-sm">Connectez-vous à votre compte</p>
            </div>

            {/* Erreur API */}
            {apiError && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <p className="text-red-600 text-sm">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                  <input
                    type="text"
                    placeholder="votre_username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-gray-50"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username[0]}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-green-600 hover:text-green-700 font-medium transition"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-sm"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
                )}
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: loading ? "#ccc" : "linear-gradient(135deg, #1a4a2e, #2d7a4f)" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Connexion...
                  </span>
                ) : "Se connecter"}
              </button>
            </form>

            {/* Lien vers register */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-green-600 font-semibold hover:text-green-700 transition">
                S'inscrire gratuitement
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}