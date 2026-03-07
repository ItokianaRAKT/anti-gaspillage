import { useState, useEffect } from "react";
import { getCategories } from "../../services/category.service";

interface Category {
    id_category: string;
    name_category: string;
}

const Filtre = () => {
    const [selected, setSelected] = useState("Toutes les catégories");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then(data => setCategories(data));
    }, []);

    return (
        <div className="flex overflow-x-auto mb-6 px-4 gap-2 scrollbar-hide
                        md:flex-wrap md:justify-center md:overflow-visible md:mb-8 md:gap-0">
            <button
                onClick={() => setSelected("Toutes les catégories")}
                className={`
                    whitespace-nowrap shrink-0
                    px-4 py-2 text-lg md:text-2xl rounded-[10px] transition-all duration-300
                    ${selected === "Toutes les catégories"
                        ? "text-primaryGreen scale-105 font-semibold"
                        : "hover:scale-105"
                    }
                `}
            >
                Toutes les catégories
            </button>

            {categories.map((cat) => (
                <button
                    key={cat.id_category}
                    onClick={() => setSelected(cat.id_category)}
                    className={`
                        whitespace-nowrap shrink-0
                        px-4 py-2 text-lg md:text-2xl rounded-[10px] transition-all duration-300
                        ${selected === cat.id_category
                            ? "text-primaryGreen scale-105 font-semibold"
                            : "hover:scale-105"
                        }
                    `}
                >
                    {cat.name_category}
                </button>
            ))}
        </div>
    );
};

export default Filtre;