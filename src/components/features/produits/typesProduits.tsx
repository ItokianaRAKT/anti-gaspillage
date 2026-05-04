/**
 * TypesProduits — Redesign premium
 * - Icônes Lucide React (remplacement FontAwesome)
 * - Layout plus raffiné avec numérotation
 * - Animations conservées
 */

import imgTypes from "../../../assets/lol.jpg";
import { motion } from "framer-motion";
import { Croissant, UtensilsCrossed, Apple, Store } from "lucide-react";

const items = [
  { icon: Croissant,        label: "Pains et pâtisseries" },
  { icon: UtensilsCrossed,  label: "Plats faits maison"   },
  { icon: Apple,            label: "Fruits et légumes"    },
  { icon: Store,            label: "Invendus de commerce" },
];

const TypesProduits = () => {
  return (
    <section className="mt-24 px-6">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs font-semibold text-primaryGreen uppercase tracking-widest mb-3 font-contenu">Ce que vous trouverez</p>
        <h2 className="text-primaryGreen text-4xl md:text-5xl font-titre font-bold">
          Types de produits disponibles
        </h2>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex justify-center items-center gap-[10%] max-w-5xl mx-auto text-[#1f2721]">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={imgTypes}
            alt=""
            className="w-80 lg:w-96 rounded-3xl object-cover shadow-xl shadow-primaryGreen/10"
          />
          {/* Badge flottant */}
          <div className="absolute -bottom-4 -right-4 bg-primaryGreen text-white rounded-2xl px-5 py-3 shadow-lg">
            <p className="text-2xl font-bold font-titre">4</p>
            <p className="text-xs opacity-80 font-contenu">catégories</p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primaryGreen/5 transition-colors duration-200 group cursor-default"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primaryGreen/10 flex items-center justify-center shrink-0 group-hover:bg-primaryGreen/20 transition-colors">
                  <Icon size={22} className="text-primaryGreen" />
                </div>
                <p className="text-2xl font-titre font-medium">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden flex-col items-center gap-6">
        <motion.img
          src={imgTypes}
          alt=""
          className="w-full max-w-sm rounded-3xl object-cover shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-2xl bg-primaryGreen/5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primaryGreen/15 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primaryGreen" />
                </div>
                <p className="text-xl font-titre font-medium">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TypesProduits;
