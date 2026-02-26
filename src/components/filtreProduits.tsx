import { useState } from "react";
const categories = [
    "Toutes les catégories",
    "Pains et patisseries",
    "Fruits et légumes",
    "Plats faits maison",
    "Invendus de commerçe"
]; 

const Filtre = () => {
    const [selected, setSelected] = useState("Toutes les catégories");
    return (
        <div className="flex justify-center mb-[3%]">
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`
            px-4 py-2 text-2xl rounded-[10px] transition-all duration-300 
            ${
              selected === cat
                ? " text-primaryGreen text-2xl scale-105"
                : "hover:scale-105"
            }
          `}>
            {cat}
          </button>
            ))}
        </div>
    )
}
export default Filtre