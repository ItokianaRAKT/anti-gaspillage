/**
 * Pourquoi — Redesign premium
 * - Overlay plus moderne
 * - Typographie hiérarchisée
 * - Card glassmorphism élégante
 */

import fondGasp from "../../../assets/gaspillage.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Leaf } from "lucide-react";

const Pourquoi = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0.5, 1], [0, -300]);

  return (
    <motion.section
      ref={ref}
      className="mt-24 w-full relative overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src={fondGasp}
        alt=""
        className="w-full h-[50vh] md:h-[60vh] object-cover"
        style={{ y }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/50" />

      <motion.div className="absolute inset-0 flex justify-center items-center" style={{ y }}>
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-14 lg:p-20 mx-4 md:mx-16 lg:mx-32 max-w-2xl shadow-2xl border border-white/60">
          <div className="flex items-center gap-2 justify-center mb-5">
            <Leaf size={16} className="text-primaryGreen" />
            <span className="text-xs font-semibold text-primaryGreen uppercase tracking-widest font-contenu">Notre constat</span>
          </div>
          <h2 className="text-center mb-5 text-primaryGreen text-3xl md:text-4xl font-titre font-bold">
            Pourquoi on fait ça ?
          </h2>
          <p className="text-base md:text-xl leading-loose font-contenu text-gray-600 text-center">
            Chaque année, des tonnes de nourriture finissent à la poubelle
            alors qu'elles pourraient nourrir quelqu'un.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Pourquoi;
