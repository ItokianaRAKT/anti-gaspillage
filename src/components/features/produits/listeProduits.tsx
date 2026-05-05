/**
 * ListeProduits — Redesign premium
 * - Skeleton loading amélioré
 * - Boutons "Voir plus/moins" plus soignés
 * - Section header avec compteur
 */

import { useEffect, useState } from "react";
import CarteItem from "./carteProduit";
import legume from "../../../assets/légumes.jpg";
import boulangerie from "../../../assets/pain.jpg";
import laitier from "../../../assets/cremerie.jpeg";
import viande from "../../../assets/viande.jpg";
import fruitDeMer from "../../../assets/fruitsDeMer.jpg";
import epicerie from "../../../assets/epicerie.jpg";
import boisson from "../../../assets/boisson.jpeg";
import cuisiné from "../../../assets/invendus.png";
import dessert from "../../../assets/dessert.jpg";
import autre from "../../../assets/autre.jpg";
import Filtre from "./filtreProduits";
import { useProductStore } from "../../../store/product.store";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";

const imageParCategorie: Record<string, string> = {
  "3aec946b-1710-4180-928a-5a6c6cd4d59d": boulangerie,
  "b57d32d0-d224-4253-9bed-6dc647c89d9d": legume,
  "397f5610-7eac-470a-a162-b1b765ac9c4c": laitier,
  "02b9e2fe-a8cc-4939-9871-566dd1ac4282": viande,
  "c0cd1bff-13ad-498d-8323-418dd79c860a": fruitDeMer,
  "31356d18-8231-48e7-8513-c0d1d4c99e7d": epicerie,
  "d5840f1a-a73e-4707-9eb3-af6e60420ca8": boisson,
  "60a65e91-878c-43d1-8b66-fc8e6f2c0b39": cuisiné,
  "76bd1c6c-7686-46d4-8593-15145664e389": dessert,
  "d8d5f1e1-561b-46ad-a6e8-899a6dc2cf5e": autre,
};

const getColonnes = () => {
  if (window.innerWidth >= 1280) return 5;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 640) return 3;
  return 2;
};

const LIGNES_INITIALES = 5;

const ListeProduits = () => {
  const { produits, loading, erreur, fetchProduits, searchActif } = useProductStore();
  const [lignesVisibles, setLignesVisibles] = useState(LIGNES_INITIALES);

  useEffect(() => {
    fetchProduits(undefined, searchActif);
  }, []);

  const colonnes = getColonnes();
  const produitsVisibles = produits.slice(0, lignesVisibles * colonnes);
  const aEncoreDesProduits = produitsVisibles.length < produits.length;

  return (
    <section className="mt-24 px-4 md:px-8 pt-8">
      {/* En-tête section */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-primaryGreen uppercase tracking-widest mb-3 font-contenu">Disponibles près de vous</p>
        <h2 className="text-primaryGreen text-4xl md:text-5xl font-titre font-bold mb-2">
          Nos produits
        </h2>
        {!loading && (
          <p className="text-sm text-gray-500 font-contenu">
            {produits.length} produit{produits.length > 1 ? "s" : ""} disponible{produits.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <Filtre />

      {/* État loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 gap-3 text-primaryGreen">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm font-contenu">Chargement des produits...</span>
        </div>
      )}

      {/* Erreur */}
      {erreur && (
        <div className="text-center py-12">
          <p className="text-red-500 text-sm font-contenu">{erreur}</p>
        </div>
      )}

      {/* Grille produits */}
      {!loading && !erreur && (
        <>
          {produitsVisibles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-contenu">Aucun produit trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {produitsVisibles.map((p) => (
                <CarteItem
                  key={p.id_product}
                  id_product={p.id_product}
                  nom={p.name_product}
                  stock={p.current_stock}
                  adresse={p.recovery_address}
                  prix={p.price_product}
                  image={p.image_product || (p.category ? imageParCategorie[p.category] : autre)}
                  description={p.description_product}
                />
              ))}
            </div>
          )}

          {/* Actions pagination */}
          <div className="flex justify-center gap-3 mt-8 mb-6">
            {lignesVisibles > LIGNES_INITIALES && (
              <button
                onClick={() => setLignesVisibles(LIGNES_INITIALES)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <ChevronUp size={16} /> Voir moins
              </button>
            )}
            {aEncoreDesProduits && (
              <button
                onClick={() => setLignesVisibles((prev) => prev + LIGNES_INITIALES)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primaryGreen/10 text-primaryGreen text-sm font-medium hover:bg-primaryGreen/15 transition-colors"
              >
                Voir plus <ChevronDown size={16} />
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ListeProduits;
