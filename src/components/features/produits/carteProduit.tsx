/**
 * CarteProduit — Redesign premium
 * - Icônes Lucide React (remplacement FontAwesome)
 * - Carte plus moderne avec hover effect
 * - Modal plus soigné
 * - Badge "Gratuit" distinctif
 */

import { useState } from "react";
import { ShoppingCart, X, Check, MapPin, Package, Minus, Plus } from "lucide-react";
import { useCartStore } from "../../../store/cart.store";
import { useAuthStore } from "../../../store/auth.store";
import AuthRequiredModal from "../../ui/home/AuthRequiredModal";

interface ComposantsCartes {
  id_product: string;
  nom: string;
  stock: number;
  adresse: string;
  prix: number;
  image: string;
  description: string;
}

const CarteProduit = ({ id_product, nom, stock, adresse, prix, image, description }: ComposantsCartes) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const ajouterArticle = useCartStore((state) => state.ajouterArticle);
  const access = useAuthStore((s) => s.access);

  const handleOpenModal = () => {
    if (!access) { setShowAuthModal(true); return; }
    setIsOpen(true);
  };

  const handleAjouter = () => {
    ajouterArticle({ id_product, id_reservation: null, nom, prix, quantite: quantity, adresse, image });
    setIsOpen(false);
    setQuantity(1);
  };

  const isGratuit = prix === 0;

  return (
    <article className="group">
      {showAuthModal && <AuthRequiredModal onClose={() => setShowAuthModal(false)} />}

      {/* Carte produit */}
      <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={nom}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badge prix */}
          <div className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${
            isGratuit ? "bg-primaryGreen text-white" : "bg-white/95 text-gray-800 border border-gray-100"
          }`}>
            {isGratuit ? "Gratuit" : `${prix} Ar`}
          </div>
        </div>

        {/* Infos */}
        <div className="p-3">
          <p className="font-semibold text-gray-900 truncate text-sm mb-1.5">{nom}</p>
          
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <MapPin size={11} className="shrink-0" />
            <p className="text-xs truncate">{adresse}</p>
          </div>
          
          <div className="flex items-center gap-1 text-gray-400 mb-3">
            <Package size={11} className="shrink-0" />
            <p className="text-xs">Stock : {stock}</p>
          </div>

          <button
            onClick={handleOpenModal}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primaryGreen/8 text-primaryGreen text-sm font-medium hover:bg-primaryGreen hover:text-white transition-all duration-200"
          >
            <ShoppingCart size={14} />
            Ajouter
          </button>
        </div>
      </div>

      {/* Modal quantité */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl w-full max-w-xs shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{nom}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {adresse}
                  </p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
                  <X size={18} />
                </button>
              </div>
              {description && <p className="text-sm text-gray-500 mt-2 leading-relaxed">{description}</p>}
            </div>

            {/* Quantité */}
            <div className="p-5">
              <p className="text-sm font-medium text-gray-700 mb-3">Choisir la quantité</p>
              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-1">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primaryGreen transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-2xl font-bold text-gray-900 font-titre">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(stock, prev + 1))}
                  className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primaryGreen transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">{stock} disponible(s)</p>
            </div>

            {/* Total + CTA */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between mb-4 p-3 bg-primaryGreen/5 rounded-xl">
                <span className="text-sm text-gray-600 font-contenu">Total</span>
                <span className="font-bold text-primaryGreen">
                  {isGratuit ? "Gratuit" : `${prix * quantity} Ar`}
                </span>
              </div>
              <button
                onClick={handleAjouter}
                className="w-full py-3 rounded-xl bg-primaryGreen text-white font-semibold flex items-center justify-center gap-2 hover:bg-primaryGreen/90 transition-colors shadow-md shadow-primaryGreen/20"
              >
                <Check size={16} />
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default CarteProduit;
