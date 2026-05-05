/**
 * Etapes "Comment ça marche" — Redesign premium
 * - Icônes Lucide React (remplacement FontAwesome)
 * - Numérotation des étapes visuelle
 * - Animations Framer Motion conservées
 * - Design cartes plus épuré
 */

import { Megaphone, ShoppingCart, CheckCircle } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const cartes = [
  {
    bg: "bg-[#6CAE75]", text: "text-white",
    icon: Megaphone,
    titre: "Publiez",
    desc: "Ajoutez votre produit en 30 secondes",
    step: "01",
    rotate: -6,
  },
  {
    bg: "bg-[#FBE9D5]", text: "text-primaryGreen",
    icon: ShoppingCart,
    titre: "Réservez",
    desc: "Trouvez et réservez près de chez vous",
    step: "02",
    rotate: 0,
  },
  {
    bg: "bg-primaryGreen", text: "text-white",
    icon: CheckCircle,
    titre: "Récupérez",
    desc: "Moins de déchets, plus d'impact",
    step: "03",
    rotate: 6,
  },
];

const Etapes = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const sequence = async () => {
      await controls.start("grouped");
      await new Promise((res) => setTimeout(res, 280));
      await controls.start("final");
    };
    sequence();
  }, [isInView]);

  const offsets = [-500, 0, 500];

  return (
    <section className="py-16 px-4">
      <div className="text-center mb-14">
        <p className="text-xs font-semibold text-primaryGreen uppercase tracking-widest mb-3 font-contenu">Processus simple</p>
        <h2 className="text-primaryGreen text-4xl md:text-5xl font-titre font-bold">
          Comment ça marche
        </h2>
      </div>

      {/* Desktop — cartes rondes animées */}
      <div
        ref={ref}
        className="hidden sm:flex justify-center gap-8 lg:gap-14 text-center font-contenu px-4 relative min-h-96 items-center"
      >
        {cartes.map((carte, i) => {
          const Icon = carte.icon;
          return (
            <motion.div
              key={carte.titre}
              className={`${carte.bg} ${carte.text} rounded-[2.5rem] flex flex-col justify-center items-center h-80 w-56 px-6 relative shadow-xl`}
              variants={{
                hidden: { opacity: 0, x: -offsets[i], y: 350, rotate: carte.rotate },
                grouped: { opacity: 1, x: -offsets[i], y: 0, rotate: carte.rotate, transition: { duration: 0.5, ease: "easeOut" } },
                final: { opacity: 1, x: 0, y: 0, rotate: 0, transition: { duration: 0.35, ease: [0.2, 1.4, 0.6, 1] } },
              }}
              initial="hidden"
              animate={controls}
            >
              {/* Numéro étape */}
              <span className="absolute top-4 right-5 text-xs font-bold opacity-30 font-contenu">{carte.step}</span>
              
              <div className={`w-14 h-14 rounded-2xl ${carte.bg === "bg-[#FBE9D5]" ? "bg-primaryGreen/15" : "bg-white/20"} flex items-center justify-center mb-6`}>
                <Icon size={26} />
              </div>
              <p className="text-3xl mb-3 font-titre font-bold">{carte.titre}</p>
              <p className="text-base opacity-80 leading-snug">{carte.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden flex-col items-center gap-4 font-contenu max-w-sm mx-auto">
        {cartes.map((carte, i) => {
          const Icon = carte.icon;
          return (
            <motion.div
              key={carte.titre}
              className={`${carte.bg} ${carte.text} rounded-2xl flex items-center gap-5 px-6 py-5 w-full shadow-md`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div className={`w-12 h-12 rounded-xl ${carte.bg === "bg-[#FBE9D5]" ? "bg-primaryGreen/15" : "bg-white/20"} flex items-center justify-center shrink-0`}>
                <Icon size={22} />
              </div>
              <div className="text-left">
                <p className="text-xl font-titre font-bold mb-0.5">{carte.titre}</p>
                <p className="text-sm opacity-80">{carte.desc}</p>
              </div>
              <span className="ml-auto text-2xl font-bold opacity-20 font-titre">{carte.step}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Etapes;
