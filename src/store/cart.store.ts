import { create } from "zustand";

interface CartItem {
    id_product: string;
    id_reservation: string;
    nom: string;
    prix: number;
    quantite: number;
    adresse: string;
    image: string;
}

interface CartStore {
    articles: CartItem[];
    ajouterArticle: (article: CartItem) => void;
    supprimerArticle: (id_product: string) => void;  
    viderPanier: () => void;
}

const useCartStore = create<CartStore>((set) => ({
    articles: [],

    ajouterArticle: (article) =>
        set((state) => ({ articles: [...state.articles, article] })),

    supprimerArticle: (id_product) =>
        set((state) => ({
            articles: state.articles.filter((a) => a.id_product !== id_product)
        })),

    viderPanier: () => set({ articles: [] }),
}));

export { useCartStore };
export type { CartItem }