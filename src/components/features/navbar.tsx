/**
 * Navbar — Redesign "Mountain Waves" avec vagues animées
 * - Fond vert sombre identique au footer
 * - Vagues SVG animées EN BAS (translateX GPU, boucle seamless)
 * - Texte et icônes blancs/translucides
 * - Liens actifs avec barre blanche
 * - Badge panier vert clair
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
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setUserMenuOpen(false);
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
    { to: "/", label: "Accueil" },
    { to: "/Trouver", label: "Trouver un repas" },
    { to: "/Partager", label: "Partager" },
    ...(isAuthenticated ? [{ to: "/MesProduits", label: "Mes produits" }] : []),
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* ════════════════════════════════════════
          BARRE PRINCIPALE — fond vert sombre
      ════════════════════════════════════════ */}
      <nav
        style={{
          background:
            "linear-gradient(135deg, #0d2e1a 0%, #1a4a2e 55%, #2E6F40 100%)",
        }}
      >
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 h-16 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            >
              <Leaf size={16} className="text-white" />
            </div>
            <img
              src={logo}
              alt="Logo Tsinjo"
              className="h-8 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Recherche — desktop */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-10">
            <div
              className="flex items-center w-full rounded-xl px-3.5 py-2 gap-2.5 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Search
                size={14}
                style={{ color: "rgba(255,255,255,0.45)" }}
                className="shrink-0"
              />
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="outline-none bg-transparent w-full text-sm font-contenu"
                style={{ color: "white" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          {/* Liens — desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-3.5 py-2 text-sm font-medium font-titre rounded-xl transition-all duration-200"
                style={{
                  color: isActive(link.to) ? "white" : "rgba(255,255,255,0.62)",
                  background: isActive(link.to)
                    ? "rgba(255,255,255,0.10)"
                    : "transparent",
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.80)" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-1.5 ml-3">
            {/* Panier */}
            <Link
              to="/Panier"
              aria-label="Panier"
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <ShoppingBasket size={18} className="text-white" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full flex items-center justify-center min-w-[17px] h-[17px] px-1 leading-none"
                  style={{ background: "#4ade80", color: "#052e16" }}
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
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "rgba(255,255,255,0.20)",
                        color: "white",
                      }}
                    >
                      {user?.first_name?.[0] ?? user?.username?.[0] ?? "U"}
                    </div>
                    <span
                      className="text-sm font-medium max-w-[80px] truncate"
                      style={{ color: "rgba(255,255,255,0.88)" }}
                    >
                      {user?.username ?? "Profil"}
                    </span>
                    <ChevronDown
                      size={13}
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      className={`transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown — fond blanc */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-1.5 z-50">
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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                  }}
                >
                  <User size={14} /> Se connecter
                </Link>
              )}
            </div>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              aria-label="Menu"
            >
              {menuOpen ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Recherche tablette */}
        <div
          className="hidden md:flex lg:hidden px-4 pb-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="flex items-center w-full rounded-xl px-3.5 py-2 gap-2.5 mt-2"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Search
              size={14}
              style={{ color: "rgba(255,255,255,0.45)" }}
              className="shrink-0"
            />
            <input
              type="search"
              placeholder="Rechercher un produit..."
              className="outline-none bg-transparent w-full text-sm font-contenu"
              style={{ color: "white" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          VAGUES ANIMÉES EN BAS
          3 couches translateX (GPU) — boucle
          seamless grâce aux paths dupliqués
      ════════════════════════════════════════ */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0d2e1a 0%, #1a4a2e 55%, #2E6F40 100%)",
          lineHeight: 0,
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes waveScroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

        <div style={{ position: "relative", height: "72px" }}>
          {/* Couche 3 — fond, lente */}
          <svg
            viewBox="0 0 2880 72"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "200%",
              height: "100%",
              animation: "waveScroll 14s linear infinite",
            }}
          >
            <path
              d="M0,28 C260,62 520,8 780,36 C1020,62 1220,12 1440,34
                 C1700,62 1960,8 2220,36 C2460,62 2660,12 2880,34
                 L2880,72 L0,72 Z"
              fill="white"
              fillOpacity="0.15"
            />
          </svg>

          {/* Couche 2 — milieu, vitesse inverse */}
          <svg
            viewBox="0 0 2880 72"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "200%",
              height: "100%",
              animation: "waveScroll 9s linear infinite reverse",
            }}
          >
            <path
              d="M0,42 C200,14 430,66 680,40 C900,16 1110,62 1310,32
                 C1380,20 1440,34 1680,42 C1900,14 2130,66 2380,40
                 C2600,16 2810,62 2880,32 L2880,72 L0,72 Z"
              fill="white"
              fillOpacity="0.38"
            />
          </svg>

          {/* Couche 1 — premier plan, rapide, opaque */}
          <svg
            viewBox="0 0 2880 72"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "200%",
              height: "100%",
              animation: "waveScroll 6s linear infinite",
            }}
          >
            <path
              d="M0,54 C160,28 350,68 560,46 C750,28 970,64 1170,40
                 C1310,25 1440,46 1600,54 C1760,28 1950,68 2160,46
                 C2350,28 2570,64 2770,40 C2910,25 2880,46 2880,46
                 L2880,72 L0,72 Z"
              fill="white"
              fillOpacity="1"
            />
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MENU MOBILE
      ════════════════════════════════════════ */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 shadow-xl">
          {/* Recherche mobile */}
          <div className="px-4 py-3" style={{ background: "#f9fafb" }}>
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2 focus-within:border-primaryGreen transition-all">
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
                    ? "text-primaryGreen bg-primaryGreen/5 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={
                  isActive(link.to)
                    ? { borderLeft: "3px solid #2E6F40" }
                    : { borderLeft: "3px solid transparent" }
                }
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
                  className="text-sm text-red-500 font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1.5"
                >
                  <LogOut size={14} /> Déco.
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-white py-3.5 rounded-xl text-sm font-semibold"
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
    </div>
  );
};

export default Navbar;
