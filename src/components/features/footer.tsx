/**
 * Footer — Tsinjo redesign premium avec animations
 */

import logo from "../../assets/logo/logo-dark-transparent.png";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

const Footer = () => {
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particleRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("div");
      const dur = 5 + Math.random() * 5;
      const delay = -Math.random() * 6;
      const size = 3 + Math.random() * 4;
      p.style.cssText = `
        position:absolute; border-radius:50%; background:#86efac; opacity:0;
        left:${10 + Math.random() * 80}%;
        bottom:${Math.random() * 30}%;
        width:${size}px; height:${size}px;
        animation: particleFly ${dur}s ${delay}s ease-in-out infinite;
      `;
      container.appendChild(p);
    }
  }, []);

  const socialLinks = [
    {
      Icon: Twitter,
      href: "https://share.google/DbPHv9nPmsku9LqtS",
      label: "Twitter",
    },
    {
      Icon: Facebook,
      href: "https://share.google/30c5UGeTYpJe9bzGP",
      label: "Facebook",
    },
    {
      Icon: Instagram,
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
    <>
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(10px,-12px) scale(1.04); }
          66% { transform: translate(-6px,8px) scale(0.97); }
        }
        @keyframes leafSpin {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity:0.6; }
          50% { opacity:1; }
        }
        @keyframes heartbeat {
          0%, 100% { transform:scale(1); }
          14% { transform:scale(1.25); }
          28% { transform:scale(1); }
          42% { transform:scale(1.15); }
          70% { transform:scale(1); }
        }
        @keyframes pulseGreen {
          0%, 100% { box-shadow:0 0 0 0 rgba(21,128,61,0.12); }
          50% { box-shadow:0 0 0 6px rgba(21,128,61,0); }
        }
        @keyframes particleFly {
          0% { opacity:0; transform:translateY(0) scale(0); }
          20% { opacity:0.5; transform:translateY(-20px) scale(1); }
          80% { opacity:0.3; transform:translateY(-60px) scale(0.6); }
          100% { opacity:0; transform:translateY(-80px) scale(0); }
        }
        .tsinjo-nav-link {
          position:relative;
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding-bottom: 2px;
        }
        .tsinjo-nav-link::before {
          content:'';
          position:absolute;
          bottom:0; left:0;
          width:0; height:1px;
          background:#15803d;
          transition:width 0.25s ease;
        }
        .tsinjo-nav-link:hover::before { width:100%; }
        .tsinjo-nav-link:hover { color:#15803d !important; padding-left: 4px; }
        .tsinjo-nav-dot { transition: background 0.2s; }
        .tsinjo-nav-link:hover .tsinjo-nav-dot { background: #15803d !important; }
        .tsinjo-social-btn {
          width:36px; height:36px; border-radius:10px;
          background:white; border:1px solid #d1fae5;
          display:flex; align-items:center; justify-content:center;
          color:#6b7280; text-decoration:none;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .tsinjo-social-btn:hover {
          background:#15803d; border-color:#15803d; color:white;
          transform:translateY(-3px) scale(1.08);
          box-shadow:0 6px 16px rgba(21,128,61,0.25);
        }
        .tsinjo-contact-pill {
          display:inline-flex; align-items:center; gap:8px;
          background:white; border:1px solid #d1fae5;
          border-radius:20px; padding:8px 14px;
          font-size:13px; color:#374151; text-decoration:none;
          width:fit-content;
          transition: all 0.25s ease;
        }
        .tsinjo-contact-pill:hover {
          border-color:#15803d; color:#15803d;
          transform:translateX(3px);
          box-shadow:0 3px 12px rgba(21,128,61,0.12);
        }
      `}</style>

      <footer
        className="mt-20 w-full relative overflow-hidden"
        style={{ background: "#f0faf4" }}
      >
        {/* Blobs de fond */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: 320,
              height: 320,
              top: -80,
              left: -60,
              background: "radial-gradient(circle, #86efac, transparent 70%)",
              opacity: 0.18,
              animation: "blobFloat 8s 0s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 220,
              height: 220,
              bottom: 20,
              right: 80,
              background: "radial-gradient(circle, #4ade80, transparent 70%)",
              opacity: 0.18,
              animation: "blobFloat 8s -3s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 160,
              height: 160,
              top: 40,
              right: "30%",
              background: "radial-gradient(circle, #bbf7d0, transparent 70%)",
              opacity: 0.18,
              animation: "blobFloat 8s -5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Particules flottantes */}
        <div
          ref={particleRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Contenu principal */}
        <div
          className="relative max-w-5xl mx-auto px-8 py-12"
          style={{ zIndex: 2, animation: "fadeUp 0.7s ease both" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {/* Col 1 : Marque */}
            <div className="flex flex-col gap-4">
              <div
                style={{
                  animation: "leafSpin 4s ease-in-out infinite",
                  display: "inline-block",
                  width: "fit-content",
                }}
              >
                <img src={logo} alt="Tsinjo" className="h-10 w-auto" />
              </div>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "#4b7a60", fontWeight: 300 }}
              >
                Plateforme anti-gaspillage alimentaire à Madagascar. Ensemble,
                donnons une seconde vie aux repas.
              </p>
              <div className="flex items-center gap-2 mt-1">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tsinjo-social-btn"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 : Navigation */}
            <div>
              <p
                className="text-xs font-medium uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "#86a896" }}
              >
                Navigation
                <span
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, #d1fae5, transparent)",
                  }}
                />
              </p>
              <nav className="flex flex-col gap-2">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="tsinjo-nav-link text-sm"
                    style={{ color: "#374151", transition: "all 0.2s ease" }}
                  >
                    <span
                      className="tsinjo-nav-dot"
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#d1fae5",
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3 : Contact */}
            <div>
              <p
                className="text-xs font-medium uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "#86a896" }}
              >
                Contact
                <span
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, #d1fae5, transparent)",
                  }}
                />
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:tsinjo@contact.dev"
                  className="tsinjo-contact-pill"
                >
                  <Mail size={14} color="#15803d" />
                  tsinjo@contact.dev
                </a>
                <div
                  className="inline-flex items-center gap-2 text-xs font-medium"
                  style={{
                    background: "linear-gradient(135deg, #dcfce7, #d1fae5)",
                    border: "1px solid #a7f3d0",
                    borderRadius: 20,
                    padding: "7px 14px",
                    color: "#15803d",
                    width: "fit-content",
                    animation: "pulseGreen 3s ease-in-out infinite",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="#15803d"
                  >
                    <path d="M12 2C6.5 2 2 8 2 14c0 4.4 2.8 8.2 7 9.6.2-2.5.8-5.2 2.5-7.5C13 14 15 13 18 12.5c-1.5 1.5-2.5 3.5-2.5 5.5 0 .7.1 1.4.3 2 .7.1 1.4.1 2.2 0 2.5-.4 4-2.6 4-5C22 7.5 17.5 2 12 2z" />
                  </svg>
                  Un geste pour la planète
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider animé */}
        <div
          className="relative mx-8"
          style={{
            zIndex: 2,
            height: 1,
            background:
              "linear-gradient(to right, transparent, #bbf7d0 30%, #86efac 50%, #bbf7d0 70%, transparent)",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />

        {/* Copyright */}
        <div
          className="relative max-w-5xl mx-auto px-8 py-4 flex items-center justify-between flex-wrap gap-2"
          style={{ zIndex: 2, animation: "fadeUp 0.9s 0.15s ease both" }}
        >
          <p className="text-xs" style={{ color: "#9ca3af", fontWeight: 300 }}>
            © 2026 Tsinjo — Tous droits réservés.
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "#9ca3af", fontWeight: 300 }}
          >
            Fait avec{" "}
            <span
              style={{
                color: "#f87171",
                animation: "heartbeat 1.4s ease-in-out infinite",
                display: "inline-block",
              }}
            >
              ♥
            </span>{" "}
            par Itokiana
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
