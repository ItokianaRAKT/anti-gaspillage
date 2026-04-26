import Hero from "../../features/hero";
import Etapes from "../../features/etapes";
import Pourquoi from "../../features/home/pourquoi";
import TypesProduits from "../../features/produits/typesProduits";
import Confiance from "../../features/home/confiance";
function Accueil() {
  return (
    <div className="relative">
      <Hero />
      <Etapes />
      <Pourquoi />
      <TypesProduits />
      <Confiance />
    </div>
  );
}

export default Accueil;
