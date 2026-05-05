/**
 * ProfilInfo — Redesign premium (Tailwind pur)
 * - Icônes Lucide React (remplacement emoji 👤)
 * - Cartes de stats distinctes avec valeurs mises en avant
 */

import { useAuthStore } from "../../store/auth.store";
import { User, CalendarDays, Package, TrendingUp } from "lucide-react";

const ProfilInfo = () => {
  const { user } = useAuthStore();
  if (!user) return null;

  const stats = [
    {
      icon: CalendarDays,
      label: "Membre depuis",
      value: new Date(user.date_joined).toLocaleDateString("fr-FR", {
        day: "numeric", month: "long", year: "numeric",
      }),
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: TrendingUp,
      label: "Partagés (90 derniers jours)",
      value: user.saved_in_90_days ?? 0,
      suffix: " produit(s)",
      color: "bg-primaryGreen/10 text-primaryGreen",
    },
    {
      icon: Package,
      label: "Total partagés",
      value: user.total_product_saved ?? 0,
      suffix: " produit(s)",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section className="bg-white border-2 border-green-100 rounded-3xl shadow-sm p-6 md:p-7">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-primaryGreen/10 flex items-center justify-center">
          <User size={18} className="text-primaryGreen" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 font-titre">Informations</h2>
      </div>
      <div className="w-10 h-1 bg-primaryGreen/40 rounded-full mb-5" />

      {/* Stats */}
      <div className="flex flex-col gap-3">
        {stats.map(({ icon: Icon, label, value, suffix, color }) => (
          <div key={label} className={`flex items-center gap-4 p-4 rounded-2xl ${color.split(" ")[0]}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color} bg-white/60 shrink-0`}>
              <Icon size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-contenu mb-0.5">{label}</p>
              <p className="text-sm font-bold text-gray-800">
                {value}{suffix ?? ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfilInfo;
