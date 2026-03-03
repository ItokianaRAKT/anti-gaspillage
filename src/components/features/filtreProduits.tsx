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
        <div className="flex overflow-x-auto mb-6 px-4 gap-2 scrollbar-hide
                        md:flex-wrap md:justify-center md:overflow-visible md:mb-8 md:gap-0">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelected(cat)}
                    className={`
                        whitespace-nowrap fshrink-0
                        px-4 py-2 text-lg md:text-2xl rounded-[10px] transition-all duration-300
                        ${selected === cat
                            ? "text-primaryGreen scale-105 font-semibold"
                            : "hover:scale-105"
                        }
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}
export default Filtre