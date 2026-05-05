/**
 * Login — Redesign premium
 * - Icônes Lucide React (remplacement emojis)
 * - Panneau gauche avec pattern décoratif SVG
 * - Formulaire avec focus states élégants
 * - Bouton de chargement amélioré
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { User, Lock, Eye, EyeOff, AlertCircle, Loader2, Leaf, ArrowRight } from "lucide-react";

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
      navigate("/");
      const profile = await authService.getProfile();
      setUser(profile);
      navigate("/");
    } catch (error) {
      setApiError("Identifiants invalides. Vérifiez votre nom d'utilisateur et mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all duration-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primaryGreen/20 ${
      hasError ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-primaryGreen"
    }`;

  return (
    <div className="min-h-screen flex font-contenu">
      
      {/* Panneau gauche décoratif */}
      <div
        className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a4a2e 0%, #2E6F40 60%, #4caf7d 100%)" }}
      >
        {/* Cercles décoratifs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/3" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Leaf size={20} className="text-white" />
          </div>
          <span className="text-white text-lg font-bold tracking-tight font-titre">AntiGaspillage</span>
        </div>

        {/* Citation centrale */}
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-white/80 text-sm font-medium mb-3 uppercase tracking-widest">Notre mission</p>
            <h2 className="text-white text-4xl font-light font-titre leading-tight">
              Ensemble, réduisons<br />
              <span className="font-bold">le gaspillage</span><br />
              alimentaire.
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "1 000+", label: "Produits sauvés" },
              { value: "500+", label: "Membres actifs" },
              { value: "0 Ar", label: "Pour s'inscrire" },
              { value: "90j", label: "Suivi communauté" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className="text-white/60 text-xs mt-0.5 font-contenu">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-md">

          {/* Logo mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primaryGreen flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800 font-titre">AntiGaspillage</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 font-titre">Bon retour 👋</h1>
              <p className="text-gray-500 text-sm">Connectez-vous à votre compte pour continuer.</p>
            </div>

            {/* Erreur API */}
            {apiError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
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
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="votre_username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className={inputClass(!!errors.username)}
                  />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.username[0]}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <button type="button" onClick={() => navigate("/forgot-password")} className="text-xs text-primaryGreen hover:text-primaryGreen/80 font-medium transition-colors">
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`${inputClass(!!errors.password)} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.password[0]}</p>}
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-primaryGreen/20 hover:shadow-lg hover:shadow-primaryGreen/25 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Connexion...</>
                ) : (
                  <> Se connecter <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-primaryGreen font-semibold hover:text-primaryGreen/80 transition-colors">
                S'inscrire gratuitement
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
