import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBasket, faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo/logo-dark-transparent.png';
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/product.store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const fetchProduits = useProductStore((state) => state.fetchProduits);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      fetchProduits(undefined, searchValue.trim());
      navigate("/Trouver");
    }
  };

  return (
    <nav className="w-full fixed top-0 z-10 left-0 right-0">

      <div className="bg-white text-primaryGreen px-4 flex justify-between w-full items-center h-[8vh] shadow-md">

        <Link to="/" className="h-full flex items-center">
          <img src={logo} alt="Logo" className="h-[6vh] w-auto" />
        </Link>

        <div className="hidden lg:flex space-x-36 text-primaryGreen text-2xl font-medium">
          <Link to="/" className="font-titre">Accueil</Link>
          <Link to="/Trouver" className="font-titre">Trouver un repas</Link>
          <Link to="/Partager" className="font-titre">Partager</Link>
        </div>

        <div className="hidden lg:flex gap-8 text-primaryGreen h-[7vh] justify-end items-center pr-[3vw]">
          <Link to="/Panier">
            <FontAwesomeIcon icon={faShoppingBasket} className="text-[4vh]" />
          </Link>
          <Link to="/Profil">
            <FontAwesomeIcon icon={faUser} className="text-[4vh]" />
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-5">
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

      <div className="hidden lg:flex bg-primaryGreen justify-center items-center h-[7vh] px-8 gap-6">
        <div className="flex items-center border-2 h-[4vh] w-[50%] bg-white text-primaryGreen justify-between px-5 rounded-[10px]">
          <input
            type="search"
            placeholder="Rechercher un produit..."
            className="outline-none w-full font-titre"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>

      <div className="hidden md:flex lg:hidden bg-primaryGreen justify-center items-center h-[7vh] px-4">
        <div className="flex items-center border-2 h-[4vh] w-[80%] bg-white text-primaryGreen justify-between px-4 rounded-[10px]">
          <input
            type="search"
            placeholder="Rechercher un produit..."
            className="outline-none w-full font-titre text-base"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100 w-full">
          <div className="bg-primaryGreen px-4 py-3">
            <div className="flex items-center border-2 h-[5vh] bg-white text-primaryGreen justify-between px-4 rounded-[10px]">
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="outline-none w-full font-titre text-base"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
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