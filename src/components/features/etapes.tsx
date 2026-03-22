import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullhorn, faCartArrowDown, faCheck } from "@fortawesome/free-solid-svg-icons"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

const cartes = [
  { bg: "bg-[#6CAE75] text-white text-shadow-lg", icon: faBullhorn,      titre: "Publiez",    desc: <>Ajoutez votre produit <br /> en 30s</>,              rotate: -6 },
  { bg: "bg-[#FBE9D5] text-primaryGreen",         icon: faCartArrowDown, titre: "Réservez",   desc: <>Trouvez et réserver <br /> près de chez vous</>,    rotate:  0 },
  { bg: "bg-primaryGreen text-white",              icon: faCheck,         titre: "Récupérez",  desc: <>Moins de déchets, <br /> plus d'impact</>,           rotate:  6 },
]

const Etapes = () => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    const sequence = async () => {
      await controls.start("grouped")
      await new Promise(res => setTimeout(res, 280))
      await controls.start("final")
    }

    sequence()
  }, [isInView])

  const offsets = [-500, 0, 500]

  return (
    <section className="py-12 px-4">
      <p className="text-center mb-12 text-primaryGreen text-5xl font-titre">
        Comment ça marche
      </p>

      <div
        ref={ref}
        className="hidden sm:flex justify-around text-center font-contenu px-4 relative min-h-96"
      >
        {cartes.map((carte, i) => (
          <motion.div
            key={carte.titre}
            className={`${carte.bg} rounded-full flex flex-col justify-center items-center h-96 w-60`}
            variants={{
              hidden: {
                opacity: 0,
                x: -offsets[i],
                y: 350,
                rotate: carte.rotate,
              },
              grouped: {
                opacity: 1,
                x: -offsets[i], 
                y: 0,
                rotate: carte.rotate,
                transition: { duration: 0.5, ease: "easeOut" },
              },
              final: {
                opacity: 1,
                x: 0,  
                y: 0,
                rotate: 0,
                transition: { duration: 0.35, ease: [0.2, 1.4, 0.6, 1] },
              },
            }}
            initial="hidden"
            animate={controls}
          >
            <FontAwesomeIcon icon={carte.icon} className="text-5xl mb-8" />
            <p className="text-4xl mb-5 font-titre">{carte.titre}</p>
            <p className="text-xl">{carte.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex sm:hidden flex-col items-center gap-6 font-contenu">
        {[
          { bg: "bg-[#6CAE75] text-white",    icon: faBullhorn,      titre: "Publiez",    desc: "Ajoutez votre produit en 30s",                  delay: 0    },
          { bg: "bg-[#FBE9D5] text-primaryGreen", icon: faCartArrowDown, titre: "Réservez",   desc: "Trouvez et réservez près de chez vous",         delay: 0.15 },
          { bg: "bg-primaryGreen text-white",  icon: faCheck,         titre: "Récupérez",  desc: "Moins de déchets, plus d'impact",               delay: 0.3  },
        ].map((carte) => (
          <motion.div
            key={carte.titre}
            className={`${carte.bg} rounded-3xl flex flex-row items-center gap-6 px-8 py-6 w-full max-w-sm`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: carte.delay }}
          >
            <FontAwesomeIcon icon={carte.icon} className="text-4xl shrink-0" />
            <div className="text-left">
              <p className="text-3xl mb-1 font-titre">{carte.titre}</p>
              <p className="text-lg">{carte.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Etapes