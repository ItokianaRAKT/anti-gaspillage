import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 md:gap-6">
      <img src={image} alt={nom} className="w-20 md:w-36 aspect-square object-cover rounded-xl shrink-0" />

      <div className="flex flex-col grow min-w-0">
        <h3 className="text-base md:text-lg font-semibold truncate">{nom}</h3>
        <p className="text-gray-500 text-sm mt-1">Quantité : {quantite}</p>
      </div>

      <div className="text-base md:text-lg font-bold shrink-0">
        {prix === 0 ? "Gratuit" : `${total} Ar`}
      </div>

      <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-red-500 text-xl shrink-0">
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-xs">
            <p className="font-semibold mb-2">{nom}</p>
            <p className="text-gray-500 text-sm mb-6">Annuler cette réservation ?</p>
            <div className="flex justify-between">
              <button onClick={() => setIsOpen(false)} className="text-red-400 text-2xl">
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <button onClick={() => { onSupprimer(); setIsOpen(false); }} className="text-primaryGreen text-2xl">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}