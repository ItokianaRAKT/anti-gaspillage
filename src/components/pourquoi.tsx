import fondGasp from "../assets/gaspillage.jpg"

const Pourquoi = () => {
    return (
        <section className="mt-24 w-full relative">
            {/* Image en fond réel — pas absolute, elle définit la hauteur de la section */}
            <img
                src={fondGasp}
                alt=""
                className="w-full h-[50vh] md:h-[60vh] object-cover"
            />
            {/* Overlay centré par-dessus */}
            <div className="absolute inset-0 flex justify-center items-center">
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
            </div>
        </section>
    )
}
export default Pourquoi