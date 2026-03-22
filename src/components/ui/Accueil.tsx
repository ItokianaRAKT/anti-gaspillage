import Hero from "../features/hero"
import Etapes from "../features/etapes"
import Pourquoi from "../features/pourquoi"
import TypesProduits from "../features/typesProduits"
import Confiance from "../features/confiance"
function Accueil() {
  return (
    <div className="relative">
      <Hero />
      <Etapes />
      <Pourquoi />
      <TypesProduits />
      <Confiance />
      
    </div>
  )
}

export default Accueil

