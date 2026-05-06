/**
 * Register — Redesign premium
 * - Icônes Lucide React (remplacement emojis)
 * - Stepper amélioré avec transitions visuelles
 * - Inputs avec focus states premium
 * - Panneau gauche cohérent avec Login
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import {
  User, Mail, Lock, Eye, EyeOff, Phone, MapPin,
  AlertCircle, Loader2, Leaf, Check, ArrowRight, ArrowLeft,
  FileText
} from "lucide-react";

const steps = [
  { label: "Compte", icon: User },
  { label: "Identité", icon: FileText },
  { label: "Contact", icon: Phone },
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState<RegisterInput>({
    username: "", email: "", password: "", password2: "",
    first_name: "", last_name: "", tel1_user: "", tel2_user: "", address_user: "",
  });

  const set = (key: keyof RegisterInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleNext = () => { setErrors({}); setStep((s) => s + 1); };

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

  const inputBase = "w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all duration-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primaryGreen/20";
  const inputClass = (hasError?: boolean) =>
    `${inputBase} ${hasError ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-primaryGreen"}`;

  const FieldRow = ({
    label, icon: Icon, error, children
  }: { label: React.ReactNode; icon: React.ElementType; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex font-contenu">

      {/* Panneau gauche */}
      <div
        className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a4a2e 0%, #2E6F40 60%, #4caf7d 100%)" }}
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Leaf size={20} className="text-white" />
          </div>
          <span className="text-white text-lg font-bold tracking-tight font-titre">AntiGaspillage</span>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-white/80 text-sm font-medium mb-3 uppercase tracking-widest">Rejoignez-nous</p>
            <h2 className="text-white text-4xl font-light font-titre leading-tight">
              Rejoignez notre<br />
              <span className="font-bold">communauté engagée</span><br />
              contre le gaspillage.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "1 000+", label: "Produits sauvés" },
              { value: "500+", label: "Membres actifs" },
              { value: "90j", label: "Suivi communauté" },
              { value: "0 Ar", label: "Pour s'inscrire" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="flex-1 flex items-start justify-center p-6 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">

          {/* Logo mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-primaryGreen flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800 font-titre">AntiGaspillage</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 font-titre">Créer un compte</h1>
              <p className="text-gray-500 text-sm">Remplissez les informations ci-dessous</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isDone = i < step;
                const isActive = i === step;
                return (
                  <div key={i} className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isDone
                            ? "bg-primaryGreen text-white"
                            : isActive
                            ? "bg-primaryGreen/15 text-primaryGreen ring-2 ring-primaryGreen/30"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isDone ? <Check size={14} /> : <Icon size={14} />}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block transition-colors ${isActive ? "text-primaryGreen" : isDone ? "text-gray-600" : "text-gray-400"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 rounded-full transition-colors duration-300 ${i < step ? "bg-primaryGreen" : "bg-gray-200"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Erreur API */}
            {apiError && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-red-600 text-sm">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Étape 0 — Compte */}
              {step === 0 && (
                <>
                  <FieldRow label="Nom d'utilisateur" icon={User} error={errors.username?.[0]}>
                    <input type="text" placeholder="username" value={form.username} onChange={set("username")} className={inputClass(!!errors.username)} />
                  </FieldRow>

                  <FieldRow label="Adresse email" icon={Mail} error={errors.email?.[0]}>
                    <input type="email" placeholder="email@exemple.com" value={form.email} onChange={set("email")} className={inputClass(!!errors.email)} />
                  </FieldRow>

                  <FieldRow label="Mot de passe" icon={Lock} error={errors.password?.[0]}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={set("password")}
                      className={`${inputClass(!!errors.password)} pr-12`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </FieldRow>

                  <FieldRow label="Confirmer le mot de passe" icon={Lock} error={errors.password2?.[0]}>
                    <input type="password" placeholder="••••••••" value={form.password2} onChange={set("password2")} className={inputClass(!!errors.password2)} />
                  </FieldRow>

                  <button type="button" onClick={handleNext}
                    className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-primaryGreen/20 hover:-translate-y-0.5 transition-all"
                    style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}>
                    Continuer <ArrowRight size={16} />
                  </button>
                </>
              )}

              {/* Étape 1 — Identité */}
              {step === 1 && (
                <>
                  <FieldRow label="Prénom" icon={User} error={errors.first_name?.[0]}>
                    <input type="text" placeholder="Prénom" value={form.first_name} onChange={set("first_name")} className={inputClass(!!errors.first_name)} />
                  </FieldRow>

                  <FieldRow label="Nom" icon={User} error={errors.last_name?.[0]}>
                    <input type="text" placeholder="Nom de famille" value={form.last_name} onChange={set("last_name")} className={inputClass(!!errors.last_name)} />
                  </FieldRow>

                  <FieldRow label="Adresse" icon={MapPin} error={errors.address_user?.[0]}>
                    <input type="text" placeholder="Ex: Ivandry, Antananarivo" value={form.address_user} onChange={set("address_user")} className={inputClass(!!errors.address_user)} />
                  </FieldRow>

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <ArrowLeft size={16} /> Retour
                    </button>
                    <button type="button" onClick={handleNext}
                      className="flex-1 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-primaryGreen/20"
                      style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}>
                      Continuer <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}

              {/* Étape 2 — Contact */}
              {step === 2 && (
                <>
                  <FieldRow label="Téléphone principal" icon={Phone} error={errors.tel1_user?.[0]}>
                    <input type="tel" placeholder="+261340000000" value={form.tel1_user} onChange={set("tel1_user")} className={inputClass(!!errors.tel1_user)} />
                  </FieldRow>

                  <FieldRow label={<>Téléphone secondaire <span className="text-gray-400 font-normal text-xs">(optionnel)</span></>} icon={Phone} error={errors.tel2_user?.[0]}>
                    <input type="tel" placeholder="+261340000001" value={form.tel2_user} onChange={set("tel2_user")} className={inputClass(!!errors.tel2_user)} />
                  </FieldRow>

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <ArrowLeft size={16} /> Retour
                    </button>
                    <button type="submit" disabled={loading}
                      className="flex-1 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-primaryGreen/20"
                      style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}>
                      {loading ? <><Loader2 size={15} className="animate-spin" /> Inscription...</> : <><Check size={15} /> S'inscrire</>}
                    </button>
                  </div>
                </>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-primaryGreen font-semibold hover:text-primaryGreen/80 transition-colors">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
