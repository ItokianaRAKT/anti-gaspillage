import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
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
}

const CarteProduit = ({ id_product, nom, stock, adresse, prix, image }: ComposantsCartes) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const ajouterArticle = useCartStore((state) => state.ajouterArticle);
  const access = useAuthStore((s) => s.access);

  const handleOpenModal = () => {
    if (!access) {
      setShowAuthModal(true);
      return;
    }
    setIsOpen(true);
  };

  const handleAjouter = () => {
    // id_reservation null → pas encore réservé, juste dans le panier local
    ajouterArticle({ id_product, id_reservation: null, nom, prix, quantite: quantity, adresse, image });
    setIsOpen(false);
    setQuantity(1);
  };

  return (
    <section className="mb-[3%]">
      {showAuthModal && <AuthRequiredModal onClose={() => setShowAuthModal(false)} />}

      <div className="w-full text-xl border border-gray-200 rounded-2xl p-3 shadow-sm">
        <img src={image} alt="Image" className="w-full rounded-2xl m-auto aspect-square object-cover" />
        <p className="font-semibold mt-2 truncate">{nom}</p>
        <p className="text-gray-500 text-base">Dispo: {stock}</p>
        <p className="text-gray-500 text-base truncate">{adresse}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="font-medium">{prix === 0 ? "Gratuit" : `${prix} Ar`}</p>
          <button onClick={handleOpenModal} className="text-primaryGreen text-2xl hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-xs relative">
            <p className="mb-2 font-semibold">{nom} — {adresse}</p>
            <p className="mb-2">Quantité</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-1 bg-gray-200 rounded-lg text-xl">-</button>
              <span className="text-lg font-bold">{quantity}</span>
              <button onClick={() => setQuantity(prev => Math.min(stock, prev + 1))} className="px-3 py-1 bg-gray-200 rounded-lg text-xl">+</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Stock disponible : {stock}</p>
            <div className="flex justify-between">
              <button onClick={() => setIsOpen(false)} className="text-red-400 text-2xl"><FontAwesomeIcon icon={faXmark} /></button>
              <button onClick={handleAjouter} className="text-primaryGreen text-2xl">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CarteProduit;