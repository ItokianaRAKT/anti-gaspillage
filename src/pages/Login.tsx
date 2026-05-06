/**
 * Login — Style "Bubbles" adapté Tsinjo
 * - Fond page : même vert que le navbar
 * - Carte centrale arrondie : gauche vert + cercles déco / droite formulaire blanc
 * - Logique front inchangée
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Leaf,
  ArrowRight,
} from "lucide-react";
import logo from "../assets/logo/logo-dark-transparent.png";

export default function Login() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const setUser = useAuthStore((s) => s.setUser);
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
      await fetchUser();
      const profile = await authService.getProfile();
      setUser(profile);
      navigate("/");
    } catch {
      setApiError(
        "Identifiants invalides. Vérifiez votre nom d'utilisateur et mot de passe.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (err?: boolean) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-contenu bg-gray-50 outline-none transition-all duration-200
     focus:bg-white focus:ring-2 focus:ring-primaryGreen/20
     ${err ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-primaryGreen"}`;

  return (
    /* Fond navbar — plein écran, centré, padding-top = hauteur navbar */
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-24 pb-10 font-contenu"
      style={{
        background: "#ffff",
      }}
    >
      {/* ── Carte principale ── */}
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex min-h-[520px]">
        {/* ════ GAUCHE — vert + bulles ════ */}
        <div
          className="hidden lg:flex lg:w-[42%] flex-col justify-between p-10 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #0d2e1a 0%, #1a4a2e 50%, #2E6F40 100%)",
          }}
        >
          {/* Bulles décoratives — inspirées du mockup */}
          <div
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div
            className="absolute -bottom-6 left-24 w-44 h-44 rounded-full"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
          <div
            className="absolute top-10 -right-12 w-48 h-48 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <div
            className="absolute top-32 right-8 w-20 h-20 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.13)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            >
              <Leaf size={18} className="text-white" />
            </div>
            <img
              src={logo}
              alt="Tsinjo"
              className="h-8 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Texte central */}
          <div className="relative z-10">
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-3 font-contenu"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Bienvenue
            </p>
            <h2 className="text-white text-3xl font-bold font-titre leading-tight mb-3">
              Tsinjo
              <br />
              <span className="font-light">Anti-Gaspillage</span>
            </h2>
            <p
              className="text-sm leading-relaxed font-contenu"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              Plateforme communautaire pour réduire le gaspillage alimentaire à
              Madagascar.
            </p>
          </div>
        </div>

        {/* ════ DROITE — formulaire blanc ════ */}
        <div className="flex-1 bg-white flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-sm">
            {/* Logo mobile */}
            <div className="lg:hidden flex items-center gap-2 mb-7">
              <div className="w-8 h-8 rounded-xl bg-primaryGreen flex items-center justify-center">
                <Leaf size={15} className="text-white" />
              </div>
              <img src={logo} alt="Tsinjo" className="h-7 w-auto" />
            </div>

            <div className="mb-7">
              <h1 className="text-2xl font-bold text-gray-900 font-titre mb-1">
                Se connecter
              </h1>
              <p className="text-sm text-gray-400 font-contenu">
                Accédez à votre espace Tsinjo.
              </p>
            </div>

            {apiError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5">
                <AlertCircle
                  size={15}
                  className="text-red-500 mt-0.5 shrink-0"
                />
                <p className="text-red-600 text-sm font-contenu">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 font-contenu">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="votre_username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    className={inputCls(!!errors.username)}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-contenu">
                    <AlertCircle size={11} />
                    {errors.username[0]}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-contenu">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-primaryGreen hover:underline font-contenu"
                  >
                    Oublié ?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className={`${inputCls(!!errors.password)} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-contenu">
                    <AlertCircle size={11} />
                    {errors.password[0]}
                  </p>
                )}
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm font-titre transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, #0d2e1a 0%, #2E6F40 100%)",
                  boxShadow: "0 4px 20px rgba(46,111,64,0.35)",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Connexion...
                  </>
                ) : (
                  <>
                    Se connecter <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400 font-contenu">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-primaryGreen font-semibold hover:underline font-titre"
              >
                S'inscrire →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
