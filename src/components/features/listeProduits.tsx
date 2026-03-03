import CarteProduit from "./carteProduit";
import Pain from "../../assets/painListe.jpg"
import Defaut from "../../assets/légumes.jpg"
import Pomme from "../../assets/pomme.jpg"
import Filtre from "./filtreProduits"

const produits = [
    {nom: "Pain", stock: 5, adresse: "Ivandry", prix: 0, image: Pain},
    {nom: "Pomme", stock: 5, adresse: "Analakely", prix: 10, image: Pomme},
    {nom: "Pomme", stock: 5, adresse: "Analakely", prix: 10, image: Pomme},
    {nom: "Pomme", stock: 5, adresse: "Analakely", prix: 10, image: Pomme},
    {nom: "Pomme", stock: 5, adresse: "Analakely", prix: 10, image: Pomme},
    {nom: "Pomme", stock: 5, adresse: "Analakely", prix: 10, image: Pomme},
]

const ListeProduits = () => {
    return (
        <section className="mt-20 px-4 md:px-8">
            <p className="text-center mb-10 text-primaryGreen text-4xl md:text-5xl font-titre">Nos produits</p>
            <Filtre />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {produits.map((p, i) => (
                    <CarteProduit
                        key={i}
                        nom={p.nom}
                        stock={p.stock}
                        adresse={p.adresse}
                        prix={p.prix}
                        image={p.image || Defaut}
                    />
                ))}
            </div>
        </section>
    )
}
export default ListeProduits