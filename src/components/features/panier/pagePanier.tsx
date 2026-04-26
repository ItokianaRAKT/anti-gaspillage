import CartePanier from "./cartePanier";
import { useCartStore } from "../../../store/cart.store";
import {
  annulerReservation,
  createReservation,
  collecterReservation,
} from "../../../services/reservation.service";
import { useProductStore } from "../../../store/product.store";
import { useState } from "react";
import Toast from "../../ui/Toast";

export default function CartPage() {
  const { articles, supprimerArticle, viderPanier, marquerValide } =
    useCartStore();
  const fetchProduits = useProductStore((state) => state.fetchProduits);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const totalPanier = articles.reduce(
    (acc, article) => acc + article.prix * article.quantite,
    0,
  );

  const handleSupprimer = async (id_product: string) => {
    const article = articles.find((a) => a.id_product === id_product);
    if (!article) return;

    if (article.id_reservation) {
      // Déjà validé → annuler la réservation en base
      try {
        await annulerReservation(article.id_reservation);
        fetchProduits(); // remettre le stock
      } catch {
        setToast({ message: "Erreur lors de l'annulation.", type: "error" });
        return;
      }
    }
    // Pas encore validé → suppression locale seulement
    supprimerArticle(id_product);
  };

  const handleValider = async () => {
    if (articles.length === 0) return;
    setLoading(true);
    try {
      await Promise.all(
        articles.map(async (article) => {
          if (article.id_reservation) {
            // Déjà réservé → juste collecter
            await collecterReservation(article.id_reservation);
          } else {
            // Pas encore réservé → créer puis collecter
            const data = await createReservation({
              product: article.id_product,
              quantity_reserved: article.quantite,
              estimated_recovery_time: new Date(
                Date.now() + 24 * 60 * 60 * 1000,
              ).toISOString(),
            });
            marquerValide(article.id_product, data.id_reservation);
            await collecterReservation(data.id_reservation);
          }
        }),
      );
      viderPanier();
      fetchProduits();
      setToast({
        message: "Commandes validées avec succès !",
        type: "success",
      });
    } catch {
      setToast({
        message: "Erreur lors de la validation. Réessayez.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 md:mt-45 px-4 md:px-8 pb-16">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-primaryGreen text-4xl md:text-5xl font-titre mb-8 md:mb-10 text-center">
        Mon panier
      </h1>

      {articles.length === 0 ? (
        <p className="text-center text-gray-400 text-xl mt-20">
          Votre panier est vide.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:gap-6">
            {articles.map((article) => (
              <CartePanier
                key={article.id_product}
                nom={article.nom}
                image={article.image}
                prix={article.prix}
                quantite={article.quantite}
                onSupprimer={() => handleSupprimer(article.id_product)}
              />
            ))}
          </div>

          <div className="mt-8 md:mt-10 flex flex-col items-end gap-4">
            <p className="text-xl md:text-2xl font-bold">
              Total : {totalPanier === 0 ? "Gratuit" : `${totalPanier} Ar`}
            </p>
            <button
              onClick={handleValider}
              disabled={loading}
              className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl text-lg hover:opacity-90 hover:bg-primaryGreen transition disabled:opacity-50"
            >
              {loading ? "Validation en cours..." : "Valider mes commandes"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
