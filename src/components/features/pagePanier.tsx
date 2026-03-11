import CartePanier from "./cartePanier";
import { useCartStore } from "../../store/cart.store";
import { annulerReservation } from "../../services/reservation.service";

export default function CartPage() {
  const { articles, supprimerArticle } = useCartStore();

  const totalPanier = articles.reduce(
    (acc, article) => acc + article.prix * article.quantite,
    0
  );

  return (
    <div className="max-w-7xl mx-auto mt-24 md:mt-45 px-4 md:px-8 pb-16">
      <h1 className="text-primaryGreen text-4xl md:text-5xl font-titre mb-8 md:mb-10 text-center">
        Mon panier
      </h1>

      {articles.length === 0 ? (
        <p className="text-center text-gray-400 text-xl mt-20">Votre panier est vide.</p>
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
                onSupprimer={async () => {
                  await annulerReservation(article.id_reservation);
                  supprimerArticle(article.id_product);
                }}
              />
            ))}
          </div>

          <div className="mt-8 md:mt-10 flex flex-col items-end gap-4">
            <p className="text-xl md:text-2xl font-bold">
              Total : {totalPanier} Ar
            </p>
            <button className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl text-lg hover:opacity-90 hover:bg-primaryGreen transition">
              Valider mes commandes
            </button>
          </div>
        </>
      )}
    </div>
  );
}