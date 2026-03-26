import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";

const steps = [
  { label: "Compte", icon: "👤" },
  { label: "Identité", icon: "📝" },
  { label: "Contact", icon: "📞" },
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    tel1_user: "",
    tel2_user: "",
    address_user: "",
  });

  const set = (key: keyof RegisterInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleNext = () => {
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setLoading(true);
    try {
      await authService.register(parsed.data);
      navigate("/login");
    } catch (error) {
      setApiError("Une erreur est survenue. Vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-gray-50";

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Panneau gauche */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a4a2e 0%, #2d7a4f 50%, #4caf7d 100%)" }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10 bg-white" />
        <div className="absolute bottom-20 -right-10 w-60 h-60 rounded-full opacity-10 bg-white" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">🌿</div>
          <span className="text-white text-xl font-bold tracking-tight">AntiGaspillage</span>
        </div>

        <div className="relative z-10 space-y-6">
          <p className="text-white/90 text-3xl font-light leading-relaxed">
            Rejoignez notre<br />
            <span className="font-bold text-white">communauté engagée</span><br />
            contre le gaspillage.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "1000+", label: "Produits sauvés" },
              { value: "500+", label: "Membres actifs" },
              { value: "90j", label: "Suivi communauté" },
              { value: "0 Ar", label: "Pour s'inscrire" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className="text-white/70 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau droit */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="text-2xl">🌿</span>
            <span className="text-lg font-bold text-gray-800">AntiGaspillage</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-10 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Créer un compte</h1>
              <p className="text-gray-500 text-center text-sm">Remplissez les informations ci-dessous</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center gap-1.5 ${i <= step ? "opacity-100" : "opacity-40"}`}>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                      style={{ background: i <= step ? "#2d7a4f" : "#e5e7eb", color: i <= step ? "white" : "#9ca3af" }}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className="text-xs font-medium text-gray-600 hidden sm:block">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px mx-1" style={{ background: i < step ? "#2d7a4f" : "#e5e7eb" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Erreur API */}
            {apiError && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <p className="text-red-600 text-sm">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Étape 0 — Compte */}
              {step === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom d'utilisateur</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                      <input type="text" placeholder="username" value={form.username} onChange={set("username")} className={inputClass} />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username[0]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse email</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                      <input type="email" placeholder="email@exemple.com" value={form.email} onChange={set("email")} className={inputClass} />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={set("password")}
                        className={`${inputClass} pr-12`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmer le mot de passe</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                      <input type="password" placeholder="••••••••" value={form.password2} onChange={set("password2")} className={inputClass} />
                    </div>
                    {errors.password2 && <p className="text-red-500 text-xs mt-1">{errors.password2[0]}</p>}
                  </div>

                  <button type="button" onClick={handleNext} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg, #1a4a2e, #2d7a4f)" }}>
                    Continuer →
                  </button>
                </>
              )}

              {/* Étape 1 — Identité */}
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📝</span>
                      <input type="text" placeholder="Prénom" value={form.first_name} onChange={set("first_name")} className={inputClass} />
                    </div>
                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name[0]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📝</span>
                      <input type="text" placeholder="Nom de famille" value={form.last_name} onChange={set("last_name")} className={inputClass} />
                    </div>
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name[0]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📍</span>
                      <input type="text" placeholder="Ex: Ivandry, Antananarivo" value={form.address_user} onChange={set("address_user")} className={inputClass} />
                    </div>
                    {errors.address_user && <p className="text-red-500 text-xs mt-1">{errors.address_user[0]}</p>}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition">
                      ← Retour
                    </button>
                    <button type="button" onClick={handleNext} className="flex-1 py-3 rounded-xl text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg, #1a4a2e, #2d7a4f)" }}>
                      Continuer →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 2 — Contact */}
              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone principal</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📞</span>
                      <input type="tel" placeholder="+261340000000" value={form.tel1_user} onChange={set("tel1_user")} className={inputClass} />
                    </div>
                    {errors.tel1_user && <p className="text-red-500 text-xs mt-1">{errors.tel1_user[0]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Téléphone secondaire <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📞</span>
                      <input type="tel" placeholder="+261340000001" value={form.tel2_user} onChange={set("tel2_user")} className={inputClass} />
                    </div>
                    {errors.tel2_user && <p className="text-red-500 text-xs mt-1">{errors.tel2_user[0]}</p>}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition">
                      ← Retour
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #1a4a2e, #2d7a4f)" }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Inscription...
                        </span>
                      ) : "S'inscrire ✓"}
                    </button>
                  </div>
                </>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-green-600 font-semibold hover:text-green-700 transition">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}