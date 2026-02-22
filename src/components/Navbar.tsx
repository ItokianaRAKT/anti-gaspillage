import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser,  } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBasket, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/logo/logo-dark-transparent.png';
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-10">
      <div className="bg-white text-[#2E6F40] p-4 flex justify-between w-full  items-center h-[8vh] shadow-md">
            <Link to="/"><img src={logo} alt="Logo" className="h-16 "/></Link>
            <div className="space-x-36 flex text-[#2E6F40] text-3xl font-medium">         
                <Link to="/" className="font-titre">Accueil</Link>
                <Link to="/Trouver" className="font-titre">Trouver un repas</Link>
                <Link to="/Partager" className="font-titre">Partager</Link>
            </div> 
            <div className="flex gap-15 text-[#2E6F40] h-[7vh] justify-end items-center pr-[3vw]">
                <Link to="/Profil"><FontAwesomeIcon icon={faUser} className="text-[4vh]" /></Link>
            </div>
      </div>


      <div className="bg-[#2E6F40] flex justify-around items-center h-[7vh] text-2xl">
            
                <select className="outline-none text-white bg-[#1c4b29] font-titre h-[5vh] pl-[4vh]">
                    <option>Toutes les catégories</option>
                    <option>Pains et patisseries</option>
                    <option>Fruits et légumes</option>
                    <option>Plats faits maison</option>
                    <option>Invendus de commerce</option>
                </select>
            

            <div className="flex  items-center border-2 h-[4vh] w-[40%] bg-white text-[#2E6F40] justify-between px-5">
                <input
                    type="search"
                    placeholder="Rechercher un produit..."
                    className="outline-none w-full font-titre"
                  />
                <FontAwesomeIcon icon={faMagnifyingGlass} className=" "/>
            </div>

              <Link to="/Panier" className="flex bg-green-50 w-[15%] text-[#2E6F40]">
            <div className="flex">
              <FontAwesomeIcon icon={faShoppingBasket} className="text-[4vh]" />
              <p className=" font-titre">Panier</p>
            </div>   
              </Link>
      </div>
    </nav>
  )
}
export default Navbar
//#FBE9D5]