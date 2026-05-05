/**
 * BadgeCard — Redesign premium (Tailwind pur)
 * - Icône Lucide React (remplacement "!" dans cercle)
 * - État vide illustré avec message encourageant
 */

import { Award, Sparkles } from "lucide-react";

const BadgeCard = () => {
  return (
    <section className="bg-white border-2 border-green-100 rounded-3xl shadow-sm p-6 md:p-7">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Award size={18} className="text-amber-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 font-titre">Badges</h2>
      </div>
      <div className="w-10 h-1 bg-amber-300/60 rounded-full mb-6" />

      {/* État vide */}
      <div className="flex flex-col items-center text-center py-6 gap-4">
        <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center">
          <Sparkles size={24} className="text-gray-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1 font-contenu">Aucun badge pour le moment</p>
          <p className="text-xs text-gray-400 font-contenu">
            Continuez à partager des produits pour débloquer vos premiers badges !
          </p>
        </div>
      </div>
    </section>
  );
};

export default BadgeCard;
