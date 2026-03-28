import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBreadSlice, faStore, faShop, faCarrot } from "@fortawesome/free-solid-svg-icons"
import imgTypes from "../../../assets/lol.jpg"
import { motion } from "framer-motion"

const items = [
    { icon: faBreadSlice, label: "Pains et patisseries" },
    { icon: faShop,       label: "Plats faits maison"  },
    { icon: faCarrot,     label: "Fruits et légumes"   },
    { icon: faStore,      label: "Invendus de commerce"},
]

const TypesProduits = () => {
    return (
        <section className="mt-24 px-6 flex flex-col">
            <p className="text-center mb-12 md:mb-20 text-primaryGreen text-4xl md:text-5xl font-titre">
                Types de produits disponibles
            </p>

            <div className="hidden sm:flex justify-center items-center gap-[10%] text-[#1f2721]">

                <motion.img
                    src={imgTypes}
                    alt=""
                    className="w-[35%] rounded-2xl object-cover"
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />

                <div className="text-4xl leading-14">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.label}
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <p>{item.label}</p>
                        </motion.div>
                    ))}
                </div>

            </div>

            <div className="flex sm:hidden flex-col items-center gap-8 text-[#1f2721]">

                <motion.img
                    src={imgTypes}
                    alt=""
                    className="w-full max-w-sm rounded-2xl object-cover"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />

                <div className="text-2xl flex flex-col gap-4 w-full max-w-sm">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.label}
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-6 shrink-0" />
                            <p>{item.label}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default TypesProduits