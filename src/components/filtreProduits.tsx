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
        <div>
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`
            px-4 py-2 rounded-[10px] transition-all duration-300 
            ${
              selected === cat
                ? "bg-green-100 text-black shadow-lg "
                : " hover:bg-green-100 hover:scale-105"
            }
          `}>
            {cat}
          </button>
            ))}
        </div>
    )
}
export default Filtre