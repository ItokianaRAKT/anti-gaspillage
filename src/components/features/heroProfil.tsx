/**
 * HeroProfil — Redesign premium (Tailwind pur, suppression profil.css)
 * - Icônes Lucide React (remplacement emojis)
 * - Banner + avatar card restructurés en Tailwind
 * - Infos de contact dans une grille lisible
 */

import pdp from "../../assets/prodilPdp.jpg";
import fond from "../../assets/fondProfil.jpg";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const HeroProfil = () => {
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  if (!user) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-primaryGreen border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="relative w-full mb-20">

      {/* Bannière */}
      <div className="w-full h-48 md:h-64 lg:h-80 overflow-hidden">
        <img src={fond} alt="Fond du profil" className="w-full h-full object-cover" />
        <div className="absolute inset-0 h-48 md:h-64 lg:h-80 bg-gradient-to-b from-transparent via-transparent to-white/30" />
      </div>

      {/* Card profil */}
      <div className="relative w-full max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 -mt-16 md:-mt-20 overflow-visible">

          {/* Badge statut */}
          <div className="absolute top-4 left-5">
            <span className="inline-flex items-center gap-1.5 bg-white text-primaryGreen border border-green-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
              <CheckCircle size={12} />
              Actif
            </span>
          </div>

          {/* Avatar */}
          <div className="flex justify-center pt-6 md:pt-8 -mt-16 md:-mt-20">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-white">
              <img src={pdp} alt="Photo de profil" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Nom */}
          <div className="text-center px-6 pt-4 pb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-titre text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <div className="w-16 h-1.5 rounded-full bg-primaryGreen/60 mx-auto mt-3" />
          </div>

          {/* Infos de contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mx-5 mb-6 p-4 bg-green-50/60 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                <Mail size={14} className="text-primaryGreen" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-contenu">Email</p>
                <p className="text-sm font-medium text-gray-700 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                <Phone size={14} className="text-primaryGreen" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-contenu">Téléphone</p>
                <p className="text-sm font-medium text-gray-700">{user.tel1_user || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                <MapPin size={14} className="text-primaryGreen" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-contenu">Adresse</p>
                <p className="text-sm font-medium text-gray-700">{user.address_user || "Non renseignée"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProfil;
