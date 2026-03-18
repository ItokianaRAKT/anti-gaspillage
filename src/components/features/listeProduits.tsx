import { useEffect } from "react";
import CarteItem from "./carteProduit";
import Defaut from "../../assets/légumes.jpg";
import Filtre from "./filtreProduits";
import { useProductStore } from "../../store/product.store";

const ListeProduits = () => {
    const { produits, loading, erreur, fetchProduits, searchActif } = useProductStore();

    useEffect(() => {
        fetchProduits(undefined, searchActif);
}, []);

    return (
        <section className="mt-20 px-4 md:px-8">
            <p className="text-center mb-10 text-primaryGreen text-4xl md:text-5xl font-titre">Nos produits</p>
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
                        image={p.image_product ?? Defaut}
                    />
                ))}
            </div>
        </section>
    );
};

export default ListeProduits;