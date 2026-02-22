import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBreadSlice, faStore, faShop, faCarrot } from "@fortawesome/free-solid-svg-icons"
import imgTypes from "../assets/lol.jpg"
const TypesProduits = () => {
    return (
        <section className="mt-[25%] flex flex-col relative ">
            <p className="text-center mb-20 text-[#2E6F40] text-5xl font-titre">Types de produits disponibles</p>
            <div className="flex justify-center items-center gap-[10%] text-[#1f2721]">
                <img src={imgTypes} alt="" className="w-[35%]"/>
                <div className="text-4xl leading-30 ">
                    <div className="flex items-center gap-[1vw]">
                        <FontAwesomeIcon icon={faBreadSlice} />
                        <p>Pains et patisseries</p>
                    </div>
                    <div className="flex items-center gap-[1vw]">
                        <FontAwesomeIcon icon={faShop} />
                        <p>Plats faits maison</p>
                    </div>
                    <div className="flex items-center gap-[1vw]">
                        <FontAwesomeIcon icon={faCarrot} />
                        <p>Fruits et légumes</p>
                    </div>
                    <div className="flex items-center gap-[1vw]">
                        <FontAwesomeIcon icon={faStore} />
                        <p>Invendus de commerce</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default TypesProduits