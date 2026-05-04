/**
 * Confiance — Redesign premium
 * - Icônes Lucide React pour les blocs
 * - Overlay plus raffiné avec gradients
 * - Cartes avec backdrop-blur sur mobile
 */

import fondConfiance from "../../../assets/fondConfiance.jpg";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Star } from "lucide-react";

const blocs = [
  {
    icon: MapPin,
    titre: "Proche de vous, en temps réel.",
    desc: "Affichage des offres disponibles autour de votre zone géographique.",
  },
  {
    icon: ShieldCheck,
    titre: "Réservez sans risque.",
    desc: "Confirmation immédiate et système de protection intégré.",
  },
  {
    icon: Star,
    titre: "La communauté vérifie.",
    desc: "Notes et avis pour garantir la qualité des produits partagés.",
  },
];

const Confiance = () => {
  return (
    <section className="mt-20 w-full relative overflow-hidden">
      <img
        src={fondConfiance}
        alt=""
        className="w-full h-[55vh] md:h-[65vh] lg:h-[70vh] object-cover"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

      <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-3 font-contenu">Nos engagements</p>
          <h2 className="text-white text-3xl md:text-5xl font-titre font-bold">
            Faites-nous confiance
          </h2>
        </motion.div>

        {/* Blocs desktop */}
        <div className="hidden sm:grid grid-cols-3 gap-6 lg:gap-10 w-full max-w-5xl">
          {blocs.map((bloc, i) => {
            const Icon = bloc.icon;
            return (
              <motion.div
                key={bloc.titre}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-lg font-bold font-titre mb-2">{bloc.titre}</p>
                <p className="text-sm text-white/80 font-contenu leading-relaxed">{bloc.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden flex-col gap-4 w-full max-w-sm">
          {blocs.map((bloc, i) => {
            const Icon = bloc.icon;
            return (
              <motion.div
                key={bloc.titre}
                className="flex items-start gap-4 bg-white/15 backdrop-blur-md rounded-2xl p-4 text-white border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.12 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-base font-bold font-titre mb-1">{bloc.titre}</p>
                  <p className="text-sm text-white/80 font-contenu leading-relaxed">{bloc.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Confiance;
