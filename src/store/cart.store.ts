import { create } from "zustand";

interface CartItem {
  id_product: string;
  id_reservation: string | null;
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
  marquerValide: (id_product: string, id_reservation: string) => void;
  viderPanier: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  articles: [],

  ajouterArticle: (article) =>
    set((state) => {
      const existant = state.articles.find((a) => a.id_product === article.id_product);
      if (existant) {
        return {
          articles: state.articles.map((a) =>
            a.id_product === article.id_product
              ? { ...a, quantite: a.quantite + article.quantite }
              : a
          ),
        };
      }
      return { articles: [...state.articles, article] };
    }),

  supprimerArticle: (id_product) =>
    set((state) => ({
      articles: state.articles.filter((a) => a.id_product !== id_product),
    })),

  marquerValide: (id_product, id_reservation) =>
    set((state) => ({
      articles: state.articles.map((a) =>
        a.id_product === id_product ? { ...a, id_reservation } : a
      ),
    })),

  viderPanier: () => set({ articles: [] }),
}));

export { useCartStore };
export type { CartItem };