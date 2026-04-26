import { create } from "zustand";
import { getProduits } from "../services/product.service";
import type { Product } from "../schemas/product.schema";
export { useProductStore }
interface ProductStore {
    produits: Product[];
    loading: boolean;
    erreur: string | null;
    searchActif: string | undefined;
    fetchProduits: (categoryId?: string, search?: string) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
    produits: [],
    loading: false,
    erreur: null,
    searchActif: undefined,  

    fetchProduits: async (categoryId?: string, search?: string) => {
        set({ loading: true, erreur: null, searchActif: search });
        try {
            const data = await getProduits(categoryId, search);
            set({ produits: data, loading: false });
        } catch (e) {
            set({ erreur: "Erreur lors du chargement", loading: false });
        }
    },
}))