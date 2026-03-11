import { create } from "zustand";
import { getProduits } from "../services/product.service";
import type { Product } from "../schemas/product.schema";

interface ProductStore {
    produits: Product[];
    loading: boolean;
    erreur: string | null;
    fetchProduits: () => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
    produits: [],
    loading: false,
    erreur: null,

    fetchProduits: async () => {
        set({ loading: true, erreur: null });
        try {
            const data = await getProduits();
            set({ produits: data, loading: false });
        } catch (e) {
            set({ erreur: "Erreur lors du chargement", loading: false });
        }
    },
}))

export {useProductStore}