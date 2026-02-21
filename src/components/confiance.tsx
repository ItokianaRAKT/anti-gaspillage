import fondConfiance from "../assets/fondConfiance.jpg"

const Confiance = () => {
    return (
        <section className="relative mt-[20vh] flex  justify-center shadow-gray-900 shadow-2xl">
            <img src={fondConfiance} alt="" className="w-[90%] border border-gray-600 absolute"/>
            <div className="absolute justify-center flex flex-col mt-[10vh]">
                <p className="w-full text-center text-[#2E6F40] text-5xl mb-[10vh] font-titre">Faites nous confiance</p>
                <div className=" flex justify-between leading-[3vh] text-2xl font-contenu">
                    <div className="w-[27%] flex flex-col  text-justify">
                        <p className="mb-[3vh] text-3xl text-center">Proche de vous, en temps réel.</p>
                        <p>Affichage des offres disponibles autour de votre zone.</p>
                    </div>
                    <div className="w-[27%] flex flex-col  text-justify">
                        <p className="mb-[3vh] text-3xl text-center">Réservez sans risque.</p>
                        <p>Confirmation immédiate et système de protection intégré.</p>
                    </div>
                    <div className="w-[27%] flex flex-col  text-justify">
                        <p className="mb-[3vh] text-3xl text-center">La communauté vérifie.</p>
                        <p>Notes et avis pour garantir la qualité.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Confiance