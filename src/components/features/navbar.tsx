/**
 * Navbar — Redesign v2
 * - Fond blanc solide avec bordure inférieure subtile
 * - Indicateur de page active (pill verte sous le lien)
 * - Dropdown user avec animation douce
 * - Badge panier animé avec pulse
 * - Recherche avec icône et focus ring vert
 */

import { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingBasket,
  User,
  Menu,
  X,
  Leaf,
  LogOut,
  ChevronDown,
  LayoutGrid,
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const fetchProduits = useProductStore((s) => s.fetchProduits);
  const { access, user, logout } = useAuthStore();
  const articles = useCartStore((s) => s.articles);
  const isAuthenticated = !!access;
  const cartCount = articles.reduce((acc, a) => acc + a.quantite, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      fetchProduits(undefined, searchValue.trim());
      navigate("/Trouver");
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Accueil", icon: null },
    { to: "/Trouver", label: "Trouver un repas", icon: null },
    { to: "/Partager", label: "Partager", icon: null },
    ...(isAuthenticated
      ? [{ to: "/MesProduits", label: "Mes produits", icon: null }]
      : []),
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-50 left-0 right-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-sm shadow-sm shadow-black/5 border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 h-16 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Logo Tsinjo" className="h-9 w-auto" />
        </Link>

        {/* Recherche centrée — desktop */}
        <div className="hidden lg:flex flex-1 max-w-sm mx-10">
          <div
            className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 gap-2.5
            focus-within:border-primaryGreen focus-within:bg-white focus-within:shadow-sm
            focus-within:shadow-primaryGreen/10 transition-all duration-200"
          >
            <Search size={14} className="text-gray-400 shrink-0" />
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

        {/* Liens desktop */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3.5 py-2 text-sm font-medium font-titre rounded-xl transition-all duration-200 ${
                isActive(link.to)
                  ? "text-primaryGreen"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {link.label}
              {/* Indicateur actif */}
              {isActive(link.to) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 bg-primaryGreen rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-1 ml-3">
          {/* Panier */}
          <Link
            to="/Panier"
            aria-label="Panier"
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-500
              hover:text-primaryGreen hover:bg-primaryGreen/8 transition-all duration-200"
          >
            <ShoppingBasket size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 bg-primaryGreen text-white text-[10px] font-bold
                rounded-full flex items-center justify-center min-w-[17px] h-[17px] px-1 leading-none
                animate-pulse"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* User — desktop */}
          <div className="hidden lg:block" ref={dropdownRef}>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl
                    hover:bg-gray-50 transition-all duration-200 text-gray-700"
                >
                  <div className="w-7 h-7 rounded-lg bg-primaryGreen/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-primaryGreen">
                      {user?.first_name?.[0] ?? user?.username?.[0] ?? "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium max-w-[90px] truncate">
                    {user?.username ?? "Profil"}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`text-gray-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl
                    shadow-xl shadow-black/8 border border-gray-100 py-1.5 z-50
                    animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2.5 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-400 font-contenu">
                        Connecté en tant que
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user?.username}
                      </p>
                    </div>
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
                      <LayoutGrid size={15} className="text-gray-400" /> Mes
                      produits
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut size={15} /> Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white
                  transition-all duration-200 hover:opacity-90 hover:-translate-y-px shadow-sm shadow-primaryGreen/20"
                style={{
                  background: "linear-gradient(135deg, #1a4a2e, #2E6F40)",
                }}
              >
                <User size={14} /> Se connecter
              </Link>
            )}
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center
              text-gray-500 hover:bg-gray-100 transition-all duration-200"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Barre recherche tablette */}
      <div className="hidden md:flex lg:hidden border-t border-gray-100 bg-gray-50/60 px-4 py-2.5">
        <div
          className="flex items-center w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 gap-2
          focus-within:border-primaryGreen transition-all"
        >
          <Search size={14} className="text-gray-400 shrink-0" />
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
          {/* Recherche mobile */}
          <div className="px-4 py-3 bg-gray-50/80">
            <div
              className="flex items-center bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2
              focus-within:border-primaryGreen transition-all"
            >
              <Search size={14} className="text-gray-400 shrink-0" />
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

          {/* Liens */}
          <div className="py-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-5 py-3.5 text-base font-titre transition-colors ${
                  isActive(link.to)
                    ? "text-primaryGreen bg-primaryGreen/5 font-semibold border-l-2 border-primaryGreen"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Footer mobile */}
          <div className="border-t border-gray-100 py-3 px-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primaryGreen/10 flex items-center justify-center shrink-0">
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
                    Voir mon profil →
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 font-medium px-3 py-2 rounded-xl hover:bg-red-50
                    transition-colors flex items-center gap-1.5"
                >
                  <LogOut size={14} /> Déco.
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-white py-3.5 rounded-xl
                  text-sm font-semibold shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #1a4a2e, #2E6F40)",
                }}
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
