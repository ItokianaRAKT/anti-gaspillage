import fondConfiance from "../assets/fondConfiance.jpg"

const Confiance = () => {
    return (
        <section className="relative mt-[20vh] flex  justify-center shadow-gray-900 shadow-2xl">
            <img src={fondConfiance} alt="" className="w-full  absolute"/>
            <div className="absolute justify-center flex flex-col mt-[20vh]">
                <p className="w-full text-center text-[#2E6F40] text-5xl mb-[10vh]">Faites nous confiance</p>
                <div className=" flex gap-[10%] leading-[3vh] text-2xl">
                    <div>
                        <p className="mb-[3vh]">Proche de vous. En temps réel.</p>
                        <p>Affichage des offres disponibles autour de votre zone.</p>
                    </div>
                    <div>
                        <p className="mb-[3vh]">Réservez sans risque.</p>
                        <p>Confirmation immédiate et système de protection intégré.</p>
                    </div>
                    <div>
                        <p className="mb-[3vh]">La communauté vérifie.</p>
                        <p>Notes et avis pour garantir la qualité.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Confiance