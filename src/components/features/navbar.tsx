import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBasket, faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo/logo-dark-transparent.png';
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/product.store";
import { useAuthStore } from "../../store/auth.store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const fetchProduits = useProductStore((state) => state.fetchProduits);
  const { access, user, logout } = useAuthStore();
  const isAuthenticated = !!access;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      fetchProduits(undefined, searchValue.trim());
      navigate("/Trouver");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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

        {/* Desktop — droite */}
        <div className="hidden lg:flex gap-6 text-primaryGreen h-[7vh] justify-end items-center pr-[3vw]">
          <Link to="/Panier">
            <FontAwesomeIcon icon={faShoppingBasket} className="text-[4vh]" />
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/Profil" className="flex items-center gap-2 hover:opacity-80 transition">
                <FontAwesomeIcon icon={faUser} className="text-[3vh]" />
                <span className="text-base font-medium">
                  {user?.username ?? "Profil"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm border border-primaryGreen px-3 py-1 rounded-lg hover:bg-primaryGreen hover:text-white transition"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-primaryGreen text-white px-4 py-2 rounded-xl text-base font-medium hover:opacity-90 transition"
            >
              <FontAwesomeIcon icon={faUser} className="text-[2.5vh]" />
              Se connecter
            </Link>
          )}
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-5">
          <Link to="/Panier">
            <FontAwesomeIcon icon={faShoppingBasket} className="text-2xl text-primaryGreen" />
          </Link>
          {isAuthenticated ? (
            <Link to="/Profil">
              <FontAwesomeIcon icon={faUser} className="text-2xl text-primaryGreen" />
            </Link>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} className="text-2xl text-primaryGreen" />
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primaryGreen text-2xl focus:outline-none"
            aria-label="Menu"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {/* Barre de recherche desktop */}
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

      {/* Barre de recherche tablette */}
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

      {/* Menu mobile */}
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
            <Link to="/" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Accueil</Link>
            <Link to="/Trouver" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Trouver un repas</Link>
            <Link to="/Partager" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Partager</Link>
            {isAuthenticated ? (
              <>
                <Link to="/Profil" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                  Profil ({user?.username ?? ""})
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="font-titre px-6 py-4 text-left text-red-500 hover:bg-gray-50"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="font-titre px-6 py-4 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;