import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons" 
interface ComposantsCartes {
    nom: string,
    stock: number,
    adresse: string,
    prix: number,
    image: string
}

    const CarteProduit = ({nom, stock, adresse, prix, image}: ComposantsCartes) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="mb-[3%]">
            <div className="w-[15vw] text-2xl border border-black-50 rounded-2xl p-[1vh] ">
                <img src={image} alt="Image" className="w-full rounded-2xl m-auto aspect-square"/>
                <p>{nom}</p>
                <p>Dispo: {stock}</p>
                <p>{adresse}</p>
                <div className="flex justify-between items-center">
                    <p>{prix} Ar</p>
                    <button onClick={() => setIsOpen(true)}>
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                </div>


        



{isOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-72 relative">
      
      <p className="mb-2 font-semibold">{adresse}</p>

      <p className="mb-2">Quantité</p>

      <div className="flex items-center justify-center gap-4 mb-4">
        <button
        
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          className="px-3 py-1 bg-gray-200 rounded-lg"
        >
          -
        </button>

        <span className="text-lg font-bold">{quantity}</span>

        <button
          onClick={() => setQuantity(prev => Math.min(stock, prev + 1))}
          className="px-3 py-1 bg-gray-200 rounded-lg"
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Stock disponible : {stock}
      </p>

      <div className="flex justify-between">
        <button onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <button onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>

    </div>
  </div>
)}
            </div>


        </section>
    )
}
export default CarteProduit