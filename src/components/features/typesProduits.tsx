import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBreadSlice, faStore, faShop, faCarrot } from "@fortawesome/free-solid-svg-icons"
import imgTypes from "../../assets/lol.jpg"

const TypesProduits = () => {
    return (
        <section className="mt-24 px-6 flex flex-col">
            <p className="text-center mb-12 md:mb-20 text-primaryGreen text-4xl md:text-5xl font-titre">
                Types de produits disponibles
            </p>

            <div className="hidden sm:flex justify-center items-center gap-[10%] text-[#1f2721]">
                <img src={imgTypes} alt="" className="w-[35%] rounded-2xl object-cover" />
                <div className="text-4xl leading-14">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faBreadSlice} />
                        <p>Pains et patisseries</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faShop} />
                        <p>Plats faits maison</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faCarrot} />
                        <p>Fruits et légumes</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faStore} />
                        <p>Invendus de commerce</p>
                    </div>
                </div>
            </div>

            <div className="flex sm:hidden flex-col items-center gap-8 text-[#1f2721]">
                <img src={imgTypes} alt="" className="w-full max-w-sm rounded-2xl object-cover" />
                <div className="text-2xl flex flex-col gap-4 w-full max-w-sm">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faBreadSlice} className="w-6 shrink-0" />
                        <p>Pains et patisseries</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faShop} className="w-6 shrink-0" />
                        <p>Plats faits maison</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faCarrot} className="w-6 shrink-0" />
                        <p>Fruits et légumes</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faStore} className="w-6 shrink-0" />
                        <p>Invendus de commerce</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default TypesProduits