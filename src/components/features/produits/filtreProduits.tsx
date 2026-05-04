/**
 * Filtre produits — Redesign premium
 * - Pills de filtre avec état actif plus visuel
 * - Scroll horizontal fluide sur mobile
 * - Micro-transitions
 */

import { useState, useEffect } from "react";
import { getCategories } from "../../../services/category.service";
import { useProductStore } from "../../../store/product.store";
import { LayoutGrid } from "lucide-react";

interface Category {
  id_category: string;
  name_category: string;
}

const Filtre = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchProduits = useProductStore((state) => state.fetchProduits);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const handleSelect = (categoryId: string | null) => {
    setSelected(categoryId);
    fetchProduits(categoryId ?? undefined, undefined);
  };

  const pillClass = (active: boolean) =>
    `whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-primaryGreen text-white shadow-sm shadow-primaryGreen/25"
        : "bg-white border border-gray-200 text-gray-600 hover:border-primaryGreen/30 hover:text-primaryGreen"
    }`;

  return (
    <div className="flex overflow-x-auto pb-2 mb-6 gap-2 scrollbar-hide md:flex-wrap md:overflow-visible md:justify-center md:mb-8">
      <button onClick={() => handleSelect(null)} className={pillClass(selected === null)}>
        <span className="flex items-center gap-1.5">
          <LayoutGrid size={14} />
          Toutes les catégories
        </span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id_category}
          onClick={() => handleSelect(cat.id_category)}
          className={pillClass(selected === cat.id_category)}
        >
          {cat.name_category}
        </button>
      ))}
    </div>
  );
};

export default Filtre;
