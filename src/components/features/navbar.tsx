/**
 * Navbar — Redesign premium
 * - Effet verre (backdrop-blur) au scroll
 * - Icônes Lucide React (remplacement FontAwesome/emojis)
 * - Barre de recherche intégrée en desktop
 * - Dropdown utilisateur élégant
 * - Badge panier animé
 */

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingBasket,
  User,
  Menu,
  X,
  Leaf,
  LogOut,
  ChevronDown,
} from "lucide-react";
import logo from "../../assets/logo/logo-dark-transparent.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useProductStore } from "../../store/product.store";
import { useAuthStore } from "../../store/auth.store";
import { useCartStore } from "../../store/cart.store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const fetchProduits = useProductStore((state) => state.fetchProduits);
  const { access, user, logout } = useAuthStore();
  const articles = useCartStore((s) => s.articles);
  const isAuthenticated = !!access;
  const cartCount = articles.reduce((acc, a) => acc + a.quantite, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setUserMenuOpen(false);
    if (userMenuOpen) window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [userMenuOpen]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      fetchProduits(undefined, searchValue.trim());
      navigate("/Trouver");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/Trouver", label: "Trouver un repas" },
    { to: "/Partager", label: "Partager" },
    ...(isAuthenticated ? [{ to: "/MesProduits", label: "Mes produits" }] : []),
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-50 left-0 right-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-white shadow-sm"
      }`}
    >
      {/* Barre principale */}
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Logo Tsinjo" className="h-9 w-auto" />
        </Link>

        {/* Barre de recherche centrée (desktop) */}
        <div className="hidden lg:flex flex-1 max-w-sm mx-10">
          <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 gap-2 focus-within:border-primaryGreen focus-within:bg-white transition-all duration-200 focus-within:shadow-sm focus-within:shadow-primaryGreen/10">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="search"
              placeholder="Rechercher un produit..."
              className="outline-none bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 font-contenu"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {/* Liens navigation desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3 py-2 text-sm font-medium font-titre rounded-lg transition-all duration-200 ${
                isActive(link.to)
                  ? "text-primaryGreen"
                  : "text-gray-600 hover:text-primaryGreen hover:bg-gray-50"
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primaryGreen rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-1 ml-4">
          {/* Panier avec badge */}
          <Link
            to="/Panier"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:text-primaryGreen hover:bg-primaryGreen/8 transition-all duration-200"
            aria-label="Panier"
          >
            <ShoppingBasket size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primaryGreen text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[17px] h-[17px] px-1 leading-none">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* User menu desktop */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700"
                >
                  <div className="w-7 h-7 rounded-lg bg-primaryGreen/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-primaryGreen">
                      {user?.first_name?.[0] ?? user?.username?.[0] ?? "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {user?.username ?? "Profil"}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`text-gray-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-1.5 z-50">
                    <Link
                      to="/Profil"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={15} className="text-gray-400" /> Mon profil
                    </Link>
                    <Link
                      to="/MesProduits"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Leaf size={15} className="text-gray-400" /> Mes produits
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={15} /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-primaryGreen text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primaryGreen/90 transition-all duration-200 shadow-sm shadow-primaryGreen/20"
              >
                <User size={15} />
                Se connecter
              </Link>
            )}
          </div>

          {/* Bouton hamburger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Recherche tablette */}
      <div className="hidden md:flex lg:hidden border-t border-gray-100 px-4 py-2.5 bg-gray-50/60">
        <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl px-4 py-2 gap-2 focus-within:border-primaryGreen transition-all">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="search"
            placeholder="Rechercher un produit..."
            className="outline-none bg-transparent w-full text-sm text-gray-700 font-contenu"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 pt-3 pb-2 bg-gray-50/80">
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 gap-2 focus-within:border-primaryGreen transition-all">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="outline-none bg-transparent w-full text-sm text-gray-700 font-contenu"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  handleSearch(e);
                  if (e.key === "Enter") setMenuOpen(false);
                }}
              />
            </div>
          </div>

          <div className="py-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-5 py-3.5 text-base font-titre transition-colors ${
                  isActive(link.to)
                    ? "text-primaryGreen bg-primaryGreen/5 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 py-3 px-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primaryGreen/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primaryGreen">
                    {user?.first_name?.[0] ?? user?.username?.[0] ?? "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.username}
                  </p>
                  <Link
                    to="/Profil"
                    onClick={() => setMenuOpen(false)}
                    className="text-xs text-primaryGreen font-medium"
                  >
                    Voir profil
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-red-500 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} /> Déco.
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-primaryGreen text-white py-3 rounded-xl text-sm font-semibold"
              >
                <User size={16} /> Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
