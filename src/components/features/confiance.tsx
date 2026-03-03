import fondConfiance from "../../assets/fondConfiance.jpg"

const Confiance = () => {
    return (
        <section className="mt-20 w-full relative">
            <img
                src={fondConfiance}
                alt=""
                className="w-full h-[55vh] md:h-[65vh] lg:h-[70vh] object-cover border border-gray-600 shadow-gray-300 shadow-xl"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24">
                <p className="w-full text-center text-primaryGreen text-3xl md:text-5xl mb-8 md:mb-12 font-titre">
                    Faites nous confiance
                </p>

                <div className="hidden sm:flex justify-between gap-6 leading-relaxed text-xl md:text-2xl font-contenu w-full max-w-5xl">
                    <div className="w-[30%] flex flex-col text-justify">
                        <p className="mb-4 text-2xl md:text-3xl text-center">Proche de vous, en temps réel.</p>
                        <p>Affichage des offres disponibles autour de votre zone.</p>
                    </div>
                    <div className="w-[30%] flex flex-col text-justify">
                        <p className="mb-4 text-2xl md:text-3xl text-center">Réservez sans risque.</p>
                        <p>Confirmation immédiate et système de protection intégré.</p>
                    </div>
                    <div className="w-[30%] flex flex-col text-justify">
                        <p className="mb-4 text-2xl md:text-3xl text-center">La communauté vérifie.</p>
                        <p>Notes et avis pour garantir la qualité.</p>
                    </div>
                </div>

                <div className="flex sm:hidden flex-col gap-6 text-lg font-contenu w-full max-w-sm">
                    <div className="flex flex-col text-center bg-white/80 rounded-2xl p-4">
                        <p className="mb-2 text-xl font-semibold text-primaryGreen">Proche de vous, en temps réel.</p>
                        <p>Affichage des offres disponibles autour de votre zone.</p>
                    </div>
                    <div className="flex flex-col text-center bg-white/80 rounded-2xl p-4">
                        <p className="mb-2 text-xl font-semibold text-primaryGreen">Réservez sans risque.</p>
                        <p>Confirmation immédiate et système de protection intégré.</p>
                    </div>
                    <div className="flex flex-col text-center bg-white/80 rounded-2xl p-4">
                        <p className="mb-2 text-xl font-semibold text-primaryGreen">La communauté vérifie.</p>
                        <p>Notes et avis pour garantir la qualité.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Confiance