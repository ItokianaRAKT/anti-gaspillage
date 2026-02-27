import CarteProduit from "./carteProduit";
import Pain from "../assets/painListe.jpg"
import Defaut from "../assets/légumes.jpg"
import Pomme from "../assets/pomme.jpg"
import Filtre from "../components/filtreProduits"

const produits = [
    {nom: "Pain", stock: 5, adresse: "Ivandry", prix: 0, image: Pain},
    {nom:"Pomme", stock: 5, adresse:"Analakely", prix: 10, image: Pomme},
    {nom:"Pomme", stock: 5, adresse:"Analakely", prix: 10, image: Pomme},
    {nom:"Pomme", stock: 5, adresse:"Analakely", prix: 10, image: Pomme},
    {nom:"Pomme", stock: 5, adresse:"Analakely", prix: 10, image: Pomme},
    {nom:"Pomme", stock: 5, adresse:"Analakely", prix: 10, image: Pomme},



]

const ListeProduits = () => {
    return (

      <section className="mt-[10%]">
        <p className="text-center mb-12 text-primaryGreen text-5xl font-titre">Nos produits</p>
        <Filtre/>

        <div className=" mx-[1vh] flex flex-wrap gap-[5%]">

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