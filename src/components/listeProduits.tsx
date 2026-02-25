import CarteProduit from "./carteProduit";
import Pain from "../assets/painListe.jpg"
import Defaut from "../assets/légumes.jpg"
import Pomme from "../assets/pomme.jpg"
const produits = [
    {nom: "Pain", stock: 5, adresse: "Ivandry", prix: 0, image: Pain},
    {nom:"Pomme", stock: 2, adresse:"Analakely", prix: 10, image: Pomme}
]

const ListeProduits = () => {
    return (
        <section className="">
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
        </section>
    )
}
export default ListeProduits