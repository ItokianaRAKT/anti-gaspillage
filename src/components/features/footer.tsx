/**
 * Footer — Mountain Waves v2
 * - Vagues SVG EN HAUT animées (3 couches comme le Navbar)
 * - Hauteur réduite / plus aérée
 * - Animations waveScroll identiques au Navbar
 * - Liens et contenu inchangés
 */

import logo from "../../assets/logo/logo-dark-transparent.png";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Mail, Leaf, Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: Twitter,
      href: "https://share.google/DbPHv9nPmsku9LqtS",
      label: "Twitter",
    },
    {
      icon: Facebook,
      href: "https://share.google/30c5UGeTYpJe9bzGP",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://share.google/GVAVrn0iW66Y9Qdpx",
      label: "Instagram",
    },
  ];

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/Trouver", label: "Trouver un repas" },
    { to: "/Partager", label: "Partager" },
    { to: "/MesProduits", label: "Mes produits" },
    { to: "/Panier", label: "Panier" },
  ];

  return (
    <footer className="relative mt-24 w-full overflow-hidden">
      {/* ════════════════════════════════════════
          VAGUES ANIMÉES EN HAUT — identiques au Navbar
          Transition : blanc → vert sombre
      ════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#0d2e1a",
          lineHeight: 0,
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes waveScrollFooter {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

        <div style={{ position: "relative", height: "56px" }}>
          {/* Couche 3 — lente, arrière-plan */}
          <svg
            viewBox="0 0 2880 72"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              animation: "waveScrollFooter 14s linear infinite",
            }}
          >
            <path
              d="M0,52 C260,18 520,68 780,44 C1020,18 1220,62 1440,40
                 C1700,18 1960,68 2220,44 C2460,18 2660,62 2880,40
                 L2880,0 L0,0 Z"
              fill="white"
              fillOpacity="0.08"
            />
          </svg>

          {/* Couche 2 — vitesse moyenne, sens inverse */}
          <svg
            viewBox="0 0 2880 72"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              animation: "waveScrollFooter 9s linear infinite reverse",
            }}
          >
            <path
              d="M0,36 C200,62 430,14 680,40 C900,64 1110,20 1310,44
                 C1380,52 1440,34 1680,36 C1900,62 2130,14 2380,40
                 C2600,64 2810,20 2880,44 L2880,0 L0,0 Z"
              fill="white"
              fillOpacity="0.12"
            />
          </svg>

          {/* Couche 1 — rapide, premier plan, plus opaque */}
          <svg
            viewBox="0 0 2880 72"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              animation: "waveScrollFooter 6s linear infinite",
            }}
          >
            <path
              d="M0,22 C160,56 350,8 560,32 C750,56 970,10 1170,36
                 C1310,54 1440,22 1600,22 C1760,56 1950,8 2160,32
                 C2350,56 2570,10 2770,36 C2910,54 2880,22 2880,22
                 L2880,0 L0,0 Z"
              fill="white"
              fillOpacity="1"
            />
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════════
          FOND + CONTENU
      ════════════════════════════════════════ */}
      <div
        style={{
          background:
            "linear-gradient(155deg, #0d2e1a 0%, #1a4a2e 50%, #2E6F40 100%)",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mb-10">
            {/* Colonne 1 — Logo + réseaux */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <Leaf size={18} className="text-white" />
                </div>
                <img
                  src={logo}
                  alt="Logo Tsinjo"
                  className="h-8 w-auto"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <p
                className="text-sm font-contenu leading-relaxed max-w-xs"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Plateforme anti-gaspillage alimentaire à Madagascar. Ensemble,
                donnons une seconde vie aux repas.
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-white/15"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: "rgba(255,255,255,0.60)",
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Colonne 2 — Navigation */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4 font-contenu"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Navigation
              </p>
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-titre transition-colors duration-200 flex items-center gap-2.5 group"
                    style={{ color: "rgba(255,255,255,0.58)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 group-hover:scale-150"
                      style={{ background: "rgba(255,255,255,0.22)" }}
                    />
                    <span className="group-hover:text-white transition-colors duration-200">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Colonne 3 — Contact */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4 font-contenu"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Contact
              </p>
              <a
                href="mailto:tsinjo@contact.dev"
                className="flex items-center gap-2.5 text-sm mb-5 transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.58)" }}
              >
                <Mail size={14} style={{ color: "rgba(255,255,255,0.30)" }} />
                tsinjo@contact.dev
              </a>
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Leaf size={13} style={{ color: "#86efac" }} />
                  <p className="text-white text-sm font-semibold font-titre">
                    Notre mission
                  </p>
                </div>
                <p
                  className="text-xs font-contenu leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  Réduire le gaspillage alimentaire à Madagascar, un repas à la
                  fois.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}
          >
            <p
              className="text-xs font-contenu"
              style={{ color: "rgba(255,255,255,0.26)" }}
            >
              © 2026 Tsinjo — Tous droits réservés.
            </p>
            <p
              className="text-xs font-contenu flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.26)" }}
            >
              Fait avec{" "}
              <Heart size={10} style={{ color: "#f87171", fill: "#f87171" }} />{" "}
              à Madagascar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
