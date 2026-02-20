import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullhorn, faCartArrowDown, faCheck } from "@fortawesome/free-solid-svg-icons"

const Etapes = () =>{
    return (
        <section>
            <p className="text-center mb-12 text-[#2E6F40] text-5xl">Comment ca marche</p>
            <div  className="flex justify-around text-center ">
                <div className="bg-[#6CAE75] text-white text-shadow-lg rounded-full flex flex-col justify-center items-center h-96 w-60">
                    <FontAwesomeIcon icon={faBullhorn} className="text-5xl mb-8"/>
                    <p className="text-4xl mb-2">Publiez</p>
                    <p className="text-xl">Ajoutez votre produit <br /> en 30s</p>
                </div>
                <div className="bg-[#FBE9D5] text-[#2E6F40] rounded-full flex flex-col justify-center items-center h-96 w-60">
                    <FontAwesomeIcon icon={faCartArrowDown} className="text-5xl mb-8"/>
                    <p className="text-4xl mb-2">Réservez</p>
                    <p className="text-xl">Trouvez et réserver <br /> près de chez vous</p>
                </div>
                <div className="bg-[#2E6F40] text-white rounded-full w-60 flex flex-col justify-center items-center h-96 ">
                    <FontAwesomeIcon icon={faCheck}className="text-5xl mb-8"/>
                    <p className="text-4xl mb-2">Récupérez</p>
                    <p className="text-xl">Moins de déchets, <br /> plus d'impact</p>
                </div>
            </div>
        </section>
    )
}
export default Etapes