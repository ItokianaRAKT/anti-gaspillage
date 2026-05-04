/**
 * AuthRequiredModal — Redesign premium
 * - Icône Lucide React (remplacement emoji 🔒)
 * - Design modal plus soigné
 * - Animation d'entrée
 */

import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, X } from "lucide-react";

interface Props {
  onClose: () => void;
}

function AuthRequiredModal({ onClose }: Props) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-6 relative">

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"
        >
          <X size={15} />
        </button>

        {/* Icône */}
        <div className="w-16 h-16 rounded-2xl bg-primaryGreen/10 flex items-center justify-center">
          <Lock size={28} className="text-primaryGreen" />
        </div>

        {/* Texte */}
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-2 font-titre">
            Connexion requise
          </p>
          <p className="text-gray-500 text-sm font-contenu leading-relaxed">
            Vous devez être connecté pour effectuer cette action.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm shadow-md shadow-primaryGreen/20 hover:-translate-y-0.5 transition-all"
            style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}
          >
            Se connecter <ArrowRight size={15} />
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-500 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthRequiredModal;
