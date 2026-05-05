/**
 * CartePanier — Redesign premium
 * - Icônes Lucide React
 * - Card plus épurée et élégante
 * - Modal confirmation amélioré
 */

import { useState } from "react";
import { Trash2, X, Check, MapPin } from "lucide-react";

interface CartItemProps {
  nom: string;
  image: string;
  prix: number;
  quantite: number;
  onSupprimer: () => void;
}

export default function CartItem({ nom, image, prix, quantite, onSupprimer }: CartItemProps) {
  const total = prix * quantite;
  const [isOpen, setIsOpen] = useState(false);
  const isGratuit = prix === 0;

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <img
        src={image}
        alt={nom}
        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shrink-0"
      />

      {/* Infos */}
      <div className="flex flex-col grow min-w-0 gap-1">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">{nom}</h3>
        <p className="text-xs text-gray-400 font-contenu">Quantité : {quantite}</p>
      </div>

      {/* Prix */}
      <div className="text-right shrink-0">
        <p className={`text-base font-bold ${isGratuit ? "text-primaryGreen" : "text-gray-800"}`}>
          {isGratuit ? "Gratuit" : `${total} Ar`}
        </p>
        {quantite > 1 && !isGratuit && (
          <p className="text-xs text-gray-400">{prix} Ar / unité</p>
        )}
      </div>

      {/* Supprimer */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all duration-200 shrink-0"
        aria-label="Supprimer"
      >
        <Trash2 size={16} />
      </button>

      {/* Modal confirmation */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl w-full max-w-xs shadow-2xl overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <p className="font-bold text-gray-900 mb-1">{nom}</p>
              <p className="text-gray-500 text-sm">Retirer cet article du panier ?</p>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-4 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <X size={15} /> Annuler
              </button>
              <div className="w-px bg-gray-100" />
              <button
                onClick={() => { onSupprimer(); setIsOpen(false); }}
                className="flex-1 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <Check size={15} /> Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
