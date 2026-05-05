/**
 * Hero — Redesign premium
 * - Layout plus propre sans positionnements absolus fragiles
 * - Typographie hiérarchisée et espacements cohérents
 * - CTA avec icônes Lucide React
 * - Badge "impact" animé
 * - Animations Framer Motion conservées et améliorées
 */

import fond from "../../assets/panier.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Share2, Leaf, ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="w-full overflow-hidden">

      {/* === DESKTOP === */}
      <div className="hidden lg:flex min-h-[92vh] pt-16 bg-gradient-to-br from-green-50 via-white to-green-50/40 relative overflow-hidden">
        
        {/* Cercle décoratif arrière-plan */}
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-primaryGreen/4 -z-0 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#FBE9D5]/60 -z-0 blur-2xl" />

        <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-12">
          
          {/* Texte gauche */}
          <div className="flex-1 max-w-xl">
            
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primaryGreen/10 text-primaryGreen px-4 py-2 rounded-full text-sm font-medium mb-8"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Leaf size={14} />
              Plateforme anti-gaspillage alimentaire à Madagascar
            </motion.div>

            <motion.h1
              className="text-primaryGreen text-5xl xl:text-6xl font-bold font-titre leading-tight mb-6"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Moins de<br />gaspillage,<br />
              <span className="relative">
                plus de partage
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primaryGreen/30 rounded-full" />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 font-contenu leading-relaxed mb-10 max-w-md"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ici, les repas ont une seconde chance. Partagez ce que vous
              n'utilisez pas ou trouvez près de chez vous ce qui mérite d'être savouré.
            </motion.p>

            <motion.div
              className="flex gap-4"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link
                to="/Trouver"
                className="inline-flex items-center gap-2.5 bg-primaryGreen text-white px-7 py-4 rounded-2xl font-semibold font-contenu text-base hover:bg-primaryGreen/90 transition-all duration-200 shadow-lg shadow-primaryGreen/25 hover:shadow-xl hover:shadow-primaryGreen/30 hover:-translate-y-0.5"
              >
                <Search size={18} />
                Trouver un repas
                <ArrowRight size={16} className="opacity-70" />
              </Link>

              <Link
                to="/Partager"
                className="inline-flex items-center gap-2.5 bg-[#FBE9D5] text-primaryGreen px-7 py-4 rounded-2xl font-semibold font-contenu text-base hover:bg-[#f5dfc0] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Share2 size={18} />
                Partager
              </Link>
            </motion.div>

            {/* Stats rapides */}
            <motion.div
              className="flex gap-8 mt-12 pt-8 border-t border-gray-100"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[
                { value: "1 000+", label: "Produits sauvés" },
                { value: "500+", label: "Membres actifs" },
                { value: "0 Ar", label: "Pour s'inscrire" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-primaryGreen font-titre">{stat.value}</p>
                  <p className="text-sm text-gray-500 font-contenu mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image droite */}
          <motion.div
            className="flex-1 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primaryGreen/10 rounded-3xl blur-2xl scale-105" />
              <img
                src={fond}
                alt="Panier de produits frais"
                className="relative w-[420px] xl:w-[480px] rounded-3xl object-cover shadow-2xl shadow-primaryGreen/15"
              />
              {/* Floating card */}
              <motion.div
                className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-lg px-5 py-4 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primaryGreen/10 flex items-center justify-center">
                    <Leaf size={18} className="text-primaryGreen" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-contenu">Impact aujourd'hui</p>
                    <p className="text-sm font-bold text-gray-800">+12 repas sauvés</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* === MOBILE / TABLETTE === */}
      <div className="flex lg:hidden flex-col bg-gradient-to-b from-green-50 to-white mt-16 min-h-screen w-full">
        
        {/* Image hero */}
        <div className="w-full flex justify-center pt-8 px-6 relative">
          <motion.img
            src={fond}
            alt="Panier de produits frais"
            className="w-full max-w-sm md:max-w-lg rounded-3xl object-cover shadow-xl shadow-primaryGreen/15"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          />
        </div>

        {/* Contenu */}
        <div className="w-full px-6 md:px-12 pt-8 pb-12 flex flex-col items-center text-center">
          
          <motion.div
            className="inline-flex items-center gap-2 bg-primaryGreen/10 text-primaryGreen px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Leaf size={13} />
            Anti-gaspillage alimentaire
          </motion.div>

          <motion.h1
            className="text-primaryGreen text-4xl md:text-5xl font-bold font-titre leading-tight mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Moins de gaspillage,<br />Plus de partage
          </motion.h1>

          <motion.p
            className="text-base md:text-lg font-contenu leading-relaxed text-gray-600 mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Ici, les repas ont une seconde chance. Partagez ce que vous
            n'utilisez pas ou trouvez près de chez vous ce qui mérite d'être savouré.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/Trouver" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 bg-primaryGreen text-white py-4 rounded-2xl font-semibold font-contenu text-base shadow-lg shadow-primaryGreen/25">
                <Search size={18} />
                Trouver un repas
              </button>
            </Link>
            <Link to="/Partager" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 bg-[#FBE9D5] text-primaryGreen py-4 rounded-2xl font-semibold font-contenu text-base">
                <Share2 size={18} />
                Partager
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
