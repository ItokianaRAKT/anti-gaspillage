import { useEffect } from "react";
import CarteItem from "./carteProduit";
import legume from "../../../assets/légumes.jpg";
import boulangerie from "../../../assets/pain.jpg";
import laitier from "../../../assets/cremerie.jpeg";
import viande from "../../../assets/viande.jpg"
import fruitDeMer from "../../../assets/fruitsDeMer.jpg";
import epicerie from "../../../assets/epicerie.jpg";
import boisson from "../../../assets/boisson.jpeg";
import cuisiné from "../../../assets/invendus.png";
import dessert from "../../../assets/dessert.jpg";
import autre from "../../../assets/autre.jpg";
import Filtre from "./filtreProduits";
import { useProductStore } from "../../../store/product.store";

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
  "d8d5f1e1-561b-46ad-a6e8-899a6dc2cf5e": autre
};

const ListeProduits = () => {
  const { produits, loading, erreur, fetchProduits, searchActif } =
    useProductStore();

  useEffect(() => {
    fetchProduits(undefined, searchActif);
  }, []);

  return (
    <section className="mt-20 px-4 md:px-8">
      <p className="text-center mb-10 text-primaryGreen text-4xl md:text-5xl font-titre">
        Nos produits
      </p>
      <Filtre />

      {loading && <p className="text-center">Chargement...</p>}
      {erreur && <p className="text-center text-red-500">{erreur}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {produits.map((p) => (
          <CarteItem
            key={p.id_product}
            id_product={p.id_product}
            nom={p.name_product}
            stock={p.current_stock}
            adresse={p.recovery_address}
            prix={p.price_product}
            image={p.image_product || (p.category ? imageParCategorie[p.category] : autre)}
          />
        ))}
      </div>
    </section>
  );
};

export default ListeProduits;
