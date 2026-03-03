import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBasket, faMagnifyingGlass, faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo/logo-dark-transparent.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-10 left-0 right-0">

      <div className="bg-white text-primaryGreen px-4 flex justify-between w-full items-center h-[8vh] shadow-md">

        <Link to="/" className=" h-full flex items-center">
          <img src={logo} alt="Logo" className="h-[6vh] w-auto" />
        </Link>

        <div className="hidden lg:flex space-x-36 text-primaryGreen text-3xl font-medium">
          <Link to="/" className="font-titre">Accueil</Link>
          <Link to="/Trouver" className="font-titre">Trouver un repas</Link>
          <Link to="/Partager" className="font-titre">Partager</Link>
        </div>

        <div className="hidden lg:flex gap-15 text-primaryGreen h-[7vh] justify-end items-center pr-[3vw]">
          <Link to="/Profil">
            <FontAwesomeIcon icon={faUser} className="text-[4vh]" />
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-5 ">
          <Link to="/Panier">
            <FontAwesomeIcon icon={faShoppingBasket} className="text-2xl text-primaryGreen" />
          </Link>
          <Link to="/Profil">
            <FontAwesomeIcon icon={faUser} className="text-2xl text-primaryGreen" />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primaryGreen text-2xl focus:outline-none"
            aria-label="Menu"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      <div className="hidden lg:flex bg-primaryGreen justify-around items-center h-[7vh] text-2xl">
        <select className="outline-none text-white bg-[#1c4b29] font-titre h-[5vh] pl-[4vh] rounded-[10px]">
          <option>Toutes les catégories</option>
          <option>Pains et patisseries</option>
          <option>Fruits et légumes</option>
          <option>Plats faits maison</option>
          <option>Invendus de commerçe</option>
        </select>

        <div className="flex items-center border-2 h-[4vh] w-[40%] bg-white text-primaryGreen justify-between px-5 rounded-[10px]">
          <input
            type="search"
            placeholder="Rechercher un produit..."
            className="outline-none w-full font-titre"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>

        <Link to="/Panier" className="flex bg-green-50 w-[15%] text-primaryGreen rounded-[10px] px-[1vw]">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingBasket} className="text-[4vh]" />
            <p className="font-titre">Panier</p>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex lg:hidden bg-primaryGreen justify-between items-center h-[7vh] text-xl px-4 gap-2">
        <div className="relative ">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center gap-2 text-white bg-[#1c4b29] font-titre h-[5vh] px-4 rounded-[10px] whitespace-nowrap"
          >
            Catégories
            <FontAwesomeIcon icon={faChevronDown} className={`text-sm transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
          </button>
          {categoryOpen && (
            <div className="absolute top-full left-0 mt-1 bg-[#1c4b29] text-white rounded-[10px] shadow-lg z-20 w-48">
              {['Toutes les catégories', 'Pains et patisseries', 'Fruits et légumes', 'Plats faits maison', 'Invendus de commerçe'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryOpen(false)}
                  className="block w-full text-left px-4 py-2 font-titre hover:bg-[#2a6b3a] first:rounded-t-[10px] last:rounded-b-[10px] text-sm"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center border-2 h-[4vh] flex-1 bg-white text-primaryGreen justify-between px-4 rounded-[10px]">
          <input
            type="search"
            placeholder="Rechercher un produit..."
            className="outline-none w-full font-titre text-base"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100 w-full">
          <div className="bg-primaryGreen px-4 py-3 flex flex-col gap-3">
            <div className="flex items-center border-2 h-[5vh] bg-white text-primaryGreen justify-between px-4 rounded-[10px]">
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="outline-none w-full font-titre text-base"
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
            </div>
            <select className="outline-none text-white bg-[#1c4b29] font-titre h-[5vh] px-4 rounded-[10px] w-full">
              <option>Toutes les catégories</option>
              <option>Pains et patisseries</option>
              <option>Fruits et légumes</option>
              <option>Plats faits maison</option>
              <option>Invendus de commerçe</option>
            </select>
          </div>

          <div className="flex flex-col text-primaryGreen text-2xl font-medium divide-y divide-gray-100">
            <Link to="/" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Accueil
            </Link>
            <Link to="/Trouver" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Trouver un repas
            </Link>
            <Link to="/Partager" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Partager
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;