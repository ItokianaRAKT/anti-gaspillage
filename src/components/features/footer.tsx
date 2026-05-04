/**
 * Footer — Redesign premium
 * - Icônes Lucide React (remplacement FontAwesome brands)
 * - Structure 3 colonnes propre avec liens organisés
 * - Ligne de copyright soignée
 */

import logo from "../../assets/logo/logo-dark-transparent.png";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Mail, Leaf } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "https://share.google/DbPHv9nPmsku9LqtS", label: "Twitter" },
    { icon: Facebook, href: "https://share.google/30c5UGeTYpJe9bzGP", label: "Facebook" },
    { icon: Instagram, href: "https://share.google/GVAVrn0iW66Y9Qdpx", label: "Instagram" },
  ];

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/Trouver", label: "Trouver un repas" },
    { to: "/Partager", label: "Partager" },
    { to: "/MesProduits", label: "Mes produits" },
    { to: "/Panier", label: "Panier" },
  ];

  return (
    <footer className="mt-20 w-full bg-green-50 border-t border-green-100/60">
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          
          {/* Colonne 1 : logo + description */}
          <div className="flex flex-col gap-4">
            <img src={logo} alt="Logo Tsinjo" className="h-10 w-auto" />
            <p className="text-sm text-gray-500 font-contenu leading-relaxed max-w-xs">
              Plateforme anti-gaspillage alimentaire à Madagascar. Ensemble, donnons une seconde vie aux repas.
            </p>
            <div className="flex items-center gap-1 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primaryGreen hover:border-primaryGreen/30 hover:bg-primaryGreen/5 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 font-contenu">Navigation</p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-gray-600 hover:text-primaryGreen font-titre transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 font-contenu">Contact</p>
            <a
              href="mailto:tsinjo@contact.dev"
              className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-primaryGreen transition-colors duration-200"
            >
              <Mail size={16} className="text-gray-400 shrink-0" />
              tsinjo@contact.dev
            </a>
            <div className="mt-5 flex items-center gap-2 text-sm text-primaryGreen font-medium">
              <Leaf size={15} className="shrink-0" />
              <span>Faisons un geste pour la planète</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barre copyright */}
      <div className="border-t border-green-100 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 font-contenu">
            Copyright © 2026 Tsinjo. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-400 font-contenu">
            Fait avec soin à Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
