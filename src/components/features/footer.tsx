/**
 * Footer — Redesign "Mountain Waves"
 * - Vagues SVG superposées (3 couches) pour l'effet de profondeur
 * - Fond dégradé vert profond → vert (identité couleur du projet)
 * - Logo inversé (blanc) sur fond sombre
 * - Liens navigation avec points décoratifs
 * - Réseaux sociaux avec hover glassmorphism
 * - Copyright avec icône Heart
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
      {/* ───────────────────────────────────────────────────
          VAGUES SVG — transition blanc → fond vert sombre
          3 couches superposées pour l'effet "montagne"
      ─────────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden leading-none"
        style={{ background: "white" }}
      >
        <svg
          viewBox="0 0 1440 130"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ display: "block", marginBottom: "-2px" }}
        >
          {/* Couche 1 — la plus loin, teinte la plus claire */}
          <path
            d="M0,45 C260,115 520,5 780,65 C1020,118 1220,18 1440,58 L1440,130 L0,130 Z"
            fill="#0d2e1a"
            fillOpacity="0.40"
          />
          {/* Couche 2 — milieu */}
          <path
            d="M0,72 C200,18 430,108 680,72 C900,42 1110,98 1310,62 C1380,50 1420,68 1440,60 L1440,130 L0,130 Z"
            fill="#1a4a2e"
            fillOpacity="0.70"
          />
          {/* Couche 3 — premier plan, opaque */}
          <path
            d="M0,98 C160,58 350,118 560,88 C750,62 970,112 1170,80 C1310,60 1400,94 1440,85 L1440,130 L0,130 Z"
            fill="#1a4a2e"
            fillOpacity="1"
          />
        </svg>
      </div>

      {/* ───────────────────────────────────────────────────
          FOND SOMBRE + CONTENU
      ─────────────────────────────────────────────────── */}
      <div
        className="relative w-full"
        style={{
          background:
            "linear-gradient(155deg, #0d2e1a 0%, #1a4a2e 45%, #2E6F40 100%)",
        }}
      >
        {/* Cercles décoratifs flous en arrière-plan */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "280px",
            height: "280px",
            top: "8%",
            left: "18%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "200px",
            height: "200px",
            bottom: "20%",
            right: "18%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />

        {/* ── Grille contenu ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
            {/* Colonne 1 : logo + tagline + réseaux sociaux */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    borderColor: "rgba(255,255,255,0.18)",
                  }}
                >
                  <Leaf size={18} className="text-white" />
                </div>
                {/* Logo blanc par filtre CSS */}
                <img
                  src={logo}
                  alt="Logo Tsinjo"
                  className="h-8 w-auto"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>

              <p
                className="text-sm font-contenu leading-relaxed max-w-xs"
                style={{ color: "rgba(255,255,255,0.58)" }}
              >
                Plateforme anti-gaspillage alimentaire à Madagascar. Ensemble,
                donnons une seconde vie aux repas.
              </p>

              {/* Réseaux sociaux */}
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.09)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: "rgba(255,255,255,0.62)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.18)";
                      (e.currentTarget as HTMLElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.09)";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.62)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Colonne 2 : navigation */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-5 font-contenu"
                style={{ color: "rgba(255,255,255,0.32)" }}
              >
                Navigation
              </p>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-titre transition-colors duration-200 flex items-center gap-2.5 group"
                    style={{ color: "rgba(255,255,255,0.62)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                      style={{ background: "rgba(255,255,255,0.22)" }}
                    />
                    <span className="group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Colonne 3 : contact + carte mission */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-5 font-contenu"
                style={{ color: "rgba(255,255,255,0.32)" }}
              >
                Contact
              </p>

              <a
                href="mailto:tsinjo@contact.dev"
                className="flex items-center gap-2.5 text-sm transition-colors duration-200 mb-6"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                <Mail
                  size={14}
                  className="shrink-0"
                  style={{ color: "rgba(255,255,255,0.32)" }}
                />
                tsinjo@contact.dev
              </a>

              {/* Carte mission */}
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
                  style={{ color: "rgba(255,255,255,0.48)" }}
                >
                  Réduire le gaspillage alimentaire à Madagascar, un repas à la
                  fois.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
          >
            <p
              className="text-xs font-contenu"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              © 2026 Tsinjo — Tous droits réservés.
            </p>
            <p
              className="text-xs font-contenu flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.28)" }}
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
