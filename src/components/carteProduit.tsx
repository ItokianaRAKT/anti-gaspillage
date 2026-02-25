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

    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="mt-[2%] mx-[1vh] flex gap-4">
            <div className="w-[20%] text-2xl border p-[1vh]">
                <img src={image} alt="Image" className="w-full aspect-square"/>
                <p>{nom}</p>
                <p>Dispo: {stock}</p>
                <p>{adresse}</p>
                <div className="flex items-center">
                <p>{prix} Ar</p>
                <button onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faCartPlus} />
                </button>
                </div>


                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl">
                    <p>{adresse}</p>
                    <p>Quantité</p>
                    <button onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    </div>
                </div>
                )}
            </div>


        </section>
    )
}
export default CarteProduit