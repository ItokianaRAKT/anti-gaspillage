import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullhorn, faCartArrowDown, faCheck } from "@fortawesome/free-solid-svg-icons"

const Etapes = () => {
    return (
        <section className="py-12 px-4">
            <p className="text-center mb-12 text-primaryGreen text-5xl font-titre">Comment ca marche</p>

            <div className="hidden sm:flex justify-around text-center font-contenu flex-wrap gap-8 px-4">
                <div className="bg-[#6CAE75] text-white text-shadow-lg rounded-full flex flex-col justify-center items-center h-96 w-60">
                    <FontAwesomeIcon icon={faBullhorn} className="text-5xl mb-8"/>
                    <p className="text-4xl mb-5 font-titre">Publiez</p>
                    <p className="text-xl">Ajoutez votre produit <br /> en 30s</p>
                </div>
                <div className="bg-[#FBE9D5] text-primaryGreen rounded-full flex flex-col justify-center items-center h-96 w-60">
                    <FontAwesomeIcon icon={faCartArrowDown} className="text-5xl mb-8"/>
                    <p className="text-4xl mb-5 font-titre">Réservez</p>
                    <p className="text-xl">Trouvez et réserver <br /> près de chez vous</p>
                </div>
                <div className="bg-primaryGreen text-white rounded-full w-60 flex flex-col justify-center items-center h-96">
                    <FontAwesomeIcon icon={faCheck} className="text-5xl mb-8"/>
                    <p className="text-4xl mb-5 font-titre">Récupérez</p>
                    <p className="text-xl">Moins de déchets, <br /> plus d'impact</p>
                </div>
            </div>

            <div className="flex sm:hidden flex-col items-center gap-6 font-contenu">
                <div className="bg-[#6CAE75] text-white rounded-3xl flex flex-row items-center gap-6 px-8 py-6 w-full max-w-sm">
                    <FontAwesomeIcon icon={faBullhorn} className="text-4xl shrink-0"/>
                    <div className="text-left">
                        <p className="text-3xl mb-1 font-titre">Publiez</p>
                        <p className="text-lg">Ajoutez votre produit en 30s</p>
                    </div>
                </div>
                <div className="bg-[#FBE9D5] text-primaryGreen rounded-3xl flex flex-row items-center gap-6 px-8 py-6 w-full max-w-sm">
                    <FontAwesomeIcon icon={faCartArrowDown} className="text-4xl shrink-0"/>
                    <div className="text-left">
                        <p className="text-3xl mb-1 font-titre">Réservez</p>
                        <p className="text-lg">Trouvez et réservez près de chez vous</p>
                    </div>
                </div>
                <div className="bg-primaryGreen text-white rounded-3xl flex flex-row items-center gap-6 px-8 py-6 w-full max-w-sm">
                    <FontAwesomeIcon icon={faCheck} className="text-4xl shrink-0"/>
                    <div className="text-left">
                        <p className="text-3xl mb-1 font-titre">Récupérez</p>
                        <p className="text-lg">Moins de déchets, plus d'impact</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Etapes