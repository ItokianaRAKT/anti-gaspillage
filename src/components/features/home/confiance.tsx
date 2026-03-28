import fondConfiance from "../../../assets/fondConfiance.jpg"
import { motion } from "framer-motion"

const blocs = [
    { titre: "Proche de vous, en temps réel.", desc: "Affichage des offres disponibles autour de votre zone." },
    { titre: "Réservez sans risque.",           desc: "Confirmation immédiate et système de protection intégré." },
    { titre: "La communauté vérifie.",          desc: "Notes et avis pour garantir la qualité." },
]

const Confiance = () => {
    return (
        <section className="mt-20 w-full relative">
            <img
                src={fondConfiance}
                alt=""
                className="w-full h-[55vh] md:h-[65vh] lg:h-[70vh] object-cover border border-gray-600 shadow-gray-300 shadow-xl"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24">

                <motion.p
                    className="w-full text-center text-primaryGreen text-3xl md:text-5xl mb-8 md:mb-12 font-titre"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    Faites nous confiance
                </motion.p>

                <div className="hidden sm:flex justify-between gap-6 leading-relaxed text-xl md:text-2xl font-contenu w-full max-w-5xl">
                    {blocs.map((bloc, i) => (
                        <motion.div
                            key={bloc.titre}
                            className="w-[30%] flex flex-col text-justify"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                        >
                            <p className="mb-4 text-2xl md:text-3xl text-center">{bloc.titre}</p>
                            <p>{bloc.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex sm:hidden flex-col gap-6 text-lg font-contenu w-full max-w-sm">
                    {blocs.map((bloc, i) => (
                        <motion.div
                            key={bloc.titre}
                            className="flex flex-col text-center bg-white/80 rounded-2xl p-4"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.12 }}
                        >
                            <p className="mb-2 text-xl font-semibold text-primaryGreen">{bloc.titre}</p>
                            <p>{bloc.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Confiance