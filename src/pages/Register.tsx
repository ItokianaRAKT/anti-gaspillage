/**
 * Register — Style "Bubbles" adapté Tsinjo
 * - Même carte que Login : gauche vert bulles / droite blanc
 * - Stepper 3 étapes compact
 * - Logique front inchangée
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  AlertCircle,
  Loader2,
  Leaf,
  Check,
  ArrowRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import logo from "../assets/logo/logo-dark-transparent.png";

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

  const set =
    (key: keyof RegisterInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
    } catch {
      setApiError("Une erreur est survenue. Vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (err?: boolean) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-contenu bg-gray-50 outline-none transition-all duration-200
     focus:bg-white focus:ring-2 focus:ring-primaryGreen/20
     ${err ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-primaryGreen"}`;

  const Field = ({
    label,
    icon: Icon,
    error,
    children,
  }: {
    label: React.ReactNode;
    icon: React.ElementType;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 font-contenu">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10"
        />
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-contenu">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );

  const BtnPrimary = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className="flex-1 py-3 rounded-xl ps-5 pe-5 text-white font-semibold text-sm font-titre transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg, #0d2e1a 0%, #2E6F40 100%)",
        boxShadow: "0 4px 16px rgba(46,111,64,0.30)",
      }}
    />
  );

  const BtnBack = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className="flex-1 py-3 rounded-xl text-gray-500 font-medium text-sm font-titre border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
    />
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-24 pb-10 font-contenu"
      style={{
        background: "#ffff",
      }}
    >
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex min-h-[560px]">
        {/* ════ GAUCHE — vert + bulles ════ */}
        <div
          className="hidden lg:flex lg:w-[42%] flex-col justify-between p-10 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #0d2e1a 0%, #1a4a2e 50%, #2E6F40 100%)",
          }}
        >
          {/* Bulles */}
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

          {/* Texte + stepper */}
          <div className="relative z-10 space-y-8">
            <div>
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-3 font-contenu"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Inscription
              </p>
              <h2 className="text-white text-3xl font-bold font-titre leading-tight mb-3">
                Rejoignez
                <br />
                <span className="font-light">la communauté</span>
              </h2>
              <p
                className="text-sm leading-relaxed font-contenu"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                Créez votre compte en 3 étapes rapides et commencez à sauver des
                repas.
              </p>
            </div>

            {/* Stepper vertical */}
            <div className="flex flex-col gap-1">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const done = i < step;
                const active = i === step;
                return (
                  <div key={i}>
                    <div className="flex items-center gap-3 py-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          background: done
                            ? "rgba(134,239,172,0.25)"
                            : active
                              ? "rgba(255,255,255,0.18)"
                              : "rgba(255,255,255,0.07)",
                          border: done
                            ? "1.5px solid rgba(134,239,172,0.60)"
                            : active
                              ? "1.5px solid rgba(255,255,255,0.40)"
                              : "1.5px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        {done ? (
                          <Check size={13} style={{ color: "#86efac" }} />
                        ) : (
                          <Icon
                            size={13}
                            style={{
                              color: active
                                ? "white"
                                : "rgba(255,255,255,0.30)",
                            }}
                          />
                        )}
                      </div>
                      <span
                        className="text-sm font-titre transition-colors"
                        style={{
                          color: active
                            ? "white"
                            : done
                              ? "rgba(255,255,255,0.65)"
                              : "rgba(255,255,255,0.28)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="ml-4 w-px h-4 transition-colors duration-300"
                        style={{
                          background:
                            i < step
                              ? "rgba(134,239,172,0.40)"
                              : "rgba(255,255,255,0.10)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ════ DROITE — formulaire blanc ════ */}
        <div className="flex-1 bg-white flex items-center justify-center p-8 md:p-12 overflow-y-auto">
          <div className="w-full max-w-sm">
            {/* Logo mobile */}
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-primaryGreen flex items-center justify-center">
                <Leaf size={15} className="text-white" />
              </div>
              <img src={logo} alt="Tsinjo" className="h-7 w-auto" />
            </div>

            {/* En-tête */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-gray-900 font-titre mb-1">
                Créer un compte
              </h1>
              <p className="text-sm text-gray-400 font-contenu">
                Étape {step + 1} sur {steps.length}
              </p>
            </div>

            {/* Stepper compact mobile/desktop */}
            <div className="flex items-center gap-2 mb-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const done = i < step;
                const active = i === step;
                return (
                  <div key={i} className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: done
                            ? "#2E6F40"
                            : active
                              ? "rgba(46,111,64,0.10)"
                              : "#f3f4f6",
                          border: active
                            ? "2px solid #2E6F40"
                            : "2px solid transparent",
                        }}
                      >
                        {done ? (
                          <Check size={12} className="text-white" />
                        ) : (
                          <Icon
                            size={12}
                            style={{ color: active ? "#2E6F40" : "#9ca3af" }}
                          />
                        )}
                      </div>
                      <span
                        className="text-xs font-titre hidden sm:block"
                        style={{
                          color: active
                            ? "#2E6F40"
                            : done
                              ? "#6b7280"
                              : "#d1d5db",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="flex-1 h-0.5 rounded-full mx-1 transition-colors duration-300"
                        style={{ background: i < step ? "#2E6F40" : "#e5e7eb" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Erreur API */}
            {apiError && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5">
                <AlertCircle
                  size={15}
                  className="text-red-500 mt-0.5 shrink-0"
                />
                <p className="text-red-600 text-sm font-contenu">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ── Étape 0 ── */}
              {step === 0 && (
                <>
                  <Field
                    label="Nom d'utilisateur"
                    icon={User}
                    error={errors.username?.[0]}
                  >
                    <input
                      type="text"
                      placeholder="username"
                      value={form.username}
                      onChange={set("username")}
                      className={inputCls(!!errors.username)}
                    />
                  </Field>
                  <Field label="Email" icon={Mail} error={errors.email?.[0]}>
                    <input
                      type="email"
                      placeholder="email@exemple.com"
                      value={form.email}
                      onChange={set("email")}
                      className={inputCls(!!errors.email)}
                    />
                  </Field>
                  <Field
                    label="Mot de passe"
                    icon={Lock}
                    error={errors.password?.[0]}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={set("password")}
                      className={`${inputCls(!!errors.password)} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </Field>
                  <Field
                    label="Confirmer le mot de passe"
                    icon={Lock}
                    error={errors.password2?.[0]}
                  >
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={form.password2}
                      onChange={set("password2")}
                      className={inputCls(!!errors.password2)}
                    />
                  </Field>
                  <BtnPrimary type="button" onClick={handleNext}>
                    Continuer
                    <ArrowRight size={15} />
                  </BtnPrimary>
                </>
              )}

              {/* ── Étape 1 ── */}
              {step === 1 && (
                <>
                  <Field
                    label="Prénom"
                    icon={User}
                    error={errors.first_name?.[0]}
                  >
                    <input
                      type="text"
                      placeholder="Prénom"
                      value={form.first_name}
                      onChange={set("first_name")}
                      className={inputCls(!!errors.first_name)}
                    />
                  </Field>
                  <Field
                    label="Nom de famille"
                    icon={User}
                    error={errors.last_name?.[0]}
                  >
                    <input
                      type="text"
                      placeholder="Nom"
                      value={form.last_name}
                      onChange={set("last_name")}
                      className={inputCls(!!errors.last_name)}
                    />
                  </Field>
                  <Field
                    label="Adresse"
                    icon={MapPin}
                    error={errors.address_user?.[0]}
                  >
                    <input
                      type="text"
                      placeholder="Ex: Ivandry, Antananarivo"
                      value={form.address_user}
                      onChange={set("address_user")}
                      className={inputCls(!!errors.address_user)}
                    />
                  </Field>
                  <div className="flex gap-3 pt-1">
                    <BtnBack type="button" onClick={() => setStep(0)}>
                      <ArrowLeft size={15} /> Retour
                    </BtnBack>
                    <BtnPrimary type="button" onClick={handleNext}>
                      Continuer
                      <ArrowRight size={30} />
                    </BtnPrimary>
                  </div>
                </>
              )}

              {/* ── Étape 2 ── */}
              {step === 2 && (
                <>
                  <Field
                    label="Téléphone principal"
                    icon={Phone}
                    error={errors.tel1_user?.[0]}
                  >
                    <input
                      type="tel"
                      placeholder="+261340000000"
                      value={form.tel1_user}
                      onChange={set("tel1_user")}
                      className={inputCls(!!errors.tel1_user)}
                    />
                  </Field>
                  <Field
                    label={
                      <>
                        Téléphone secondaire{" "}
                        <span className="text-gray-400 normal-case font-normal">
                          (optionnel)
                        </span>
                      </>
                    }
                    icon={Phone}
                    error={errors.tel2_user?.[0]}
                  >
                    <input
                      type="tel"
                      placeholder="+261340000001"
                      value={form.tel2_user}
                      onChange={set("tel2_user")}
                      className={inputCls(!!errors.tel2_user)}
                    />
                  </Field>
                  <div className="flex gap-3 pt-1">
                    <BtnBack type="button" onClick={() => setStep(1)}>
                      <ArrowLeft size={15} /> Retour
                    </BtnBack>
                    <BtnPrimary type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />{" "}
                          Inscription...
                        </>
                      ) : (
                        <>
                          <Check size={14} /> S'inscrire
                        </>
                      )}
                    </BtnPrimary>
                  </div>
                </>
              )}
            </form>

            <p className="mt-5 text-center text-sm text-gray-400 font-contenu">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-primaryGreen font-semibold hover:underline font-titre"
              >
                Se connecter →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
