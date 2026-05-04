/**
 * PagePanier — Redesign premium
 * - Layout récapitulatif cart + summary card
 * - Icônes Lucide React
 * - État vide illustré
 * - Bouton valider premium avec Loader
 */

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
import { ShoppingBasket, ArrowRight, Loader2, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { articles, supprimerArticle, viderPanier, marquerValide } = useCartStore();
  const fetchProduits = useProductStore((state) => state.fetchProduits);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const totalPanier = articles.reduce((acc, article) => acc + article.prix * article.quantite, 0);
  const isGratuit = totalPanier === 0;

  const handleSupprimer = async (id_product: string) => {
    const article = articles.find((a) => a.id_product === id_product);
    if (!article) return;
    if (article.id_reservation) {
      try {
        await annulerReservation(article.id_reservation);
        fetchProduits();
      } catch {
        setToast({ message: "Erreur lors de l'annulation.", type: "error" });
        return;
      }
    }
    supprimerArticle(id_product);
  };

  const handleValider = async () => {
    if (articles.length === 0) return;
    setLoading(true);
    try {
      await Promise.all(
        articles.map(async (article) => {
          if (article.id_reservation) {
            await collecterReservation(article.id_reservation);
          } else {
            const data = await createReservation({
              product: article.id_product,
              quantity_reserved: article.quantite,
              estimated_recovery_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            });
            marquerValide(article.id_product, data.id_reservation);
            await collecterReservation(data.id_reservation);
          }
        }),
      );
      viderPanier();
      fetchProduits();
      setToast({ message: "Commandes validées avec succès !", type: "success" });
    } catch {
      setToast({ message: "Erreur lors de la validation. Réessayez.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4 md:px-8 pb-16 pt-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-primaryGreen text-4xl md:text-5xl font-titre font-bold mb-2">Mon panier</h1>
        {articles.length > 0 && (
          <p className="text-gray-500 text-sm font-contenu">{articles.length} article{articles.length > 1 ? "s" : ""}</p>
        )}
      </div>

      {/* Panier vide */}
      {articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <ShoppingBasket size={36} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2 font-titre">Votre panier est vide</h2>
          <p className="text-gray-400 text-sm font-contenu mb-6">Explorez nos produits disponibles près de chez vous.</p>
          <Link
            to="/Trouver"
            className="inline-flex items-center gap-2 bg-primaryGreen text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md shadow-primaryGreen/20 hover:bg-primaryGreen/90 transition-colors"
          >
            <Leaf size={16} /> Trouver des produits <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Liste articles */}
          <div className="flex-1 flex flex-col gap-3">
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

          {/* Récapitulatif */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5 font-titre">Récapitulatif</h2>
              
              <div className="space-y-3 mb-5">
                {articles.map((a) => (
                  <div key={a.id_product} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 truncate flex-1 mr-2 font-contenu">{a.nom} ×{a.quantite}</span>
                    <span className="font-medium text-gray-800 shrink-0">
                      {a.prix === 0 ? "Gratuit" : `${a.prix * a.quantite} Ar`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700 font-contenu">Total</span>
                  <span className={`text-xl font-bold ${isGratuit ? "text-primaryGreen" : "text-gray-900"}`}>
                    {isGratuit ? "Gratuit" : `${totalPanier} Ar`}
                  </span>
                </div>
              </div>

              <button
                onClick={handleValider}
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-primaryGreen/20 hover:bg-primaryGreen/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Validation...</>
                ) : (
                  <>Valider mes commandes <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
