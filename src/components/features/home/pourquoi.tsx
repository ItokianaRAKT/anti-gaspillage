import fondGasp from "../../../assets/gaspillage.jpg"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const Pourquoi = () => {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0.5, 1], [0, -300])

    return (
        <motion.section
            ref={ref}
            className="mt-24 w-full relative overflow-hidden"
            initial={{ opacity: 0, y: 150 }}
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

            <motion.div
                className="absolute inset-0 flex justify-center items-center"
                style={{ y }}
            >
                <div className="flex justify-center flex-col text-center bg-white/90 rounded-2xl p-8 md:p-16 lg:p-24 mx-4 md:mx-16 lg:mx-32">
                    <p className="text-center mb-6 md:mb-12 text-primaryGreen text-3xl md:text-5xl font-titre">
                        Pourquoi on fait ça ?
                    </p>
                    <p className="text-lg md:text-2xl leading-loose font-contenu">
                        Chaque année, des tonnes de nourriture finissent à la poubelle{" "}
                        <br className="hidden md:block" />
                        alors qu'elles pourraient nourrir quelqu'un.
                    </p>
                </div>
            </motion.div>

        </motion.section>
    )
}

export default Pourquoi
