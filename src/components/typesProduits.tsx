import pain from "../assets/pain.jpg"
import platMaison from "../assets/platMaison.jpg"
import fruits from "../assets/fruitsLegumes.jpg"
import invendus from "../assets/invendus.png"
const TypesProduits = () => {
    return (
        <section className="mt-[25%] flex flex-col ">
            <p className="text-center mb-20 text-[#2E6F40] text-5xl font-titre">Types de produits disponibles</p>
            <div className="flex gap-[5vw] justify-evenly text-2xl ">
                <div className="border-[0.3vh] border-[#2E6F40] w-[15vw] h-[40vh] rounded-xl">
                    <div className="w-[13vw] aspect-square overflow-hidden rounded-xl mx-auto mt-[2vh]">
                        <img src={pain} alt="pain et patisserie" className="w-full h-full object-cover"/>
                    </div>
                    <p className="text-center px-[1vw] mt-[2vh]">Encore frais,  juste oublié</p>
                </div>

                <div className="border-[0.3vh] border-[#6CAE75] w-[15vw] h-[40vh] rounded-xl">
                    <div className="w-[13vw] aspect-square overflow-hidden rounded-xl mx-auto mt-[2vh]">
                        <img src={platMaison} alt="plats fait maison" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center px-[1vw] mt-[2vh]">Fait avec amour,  à partager</p>
                </div>

                <div className="border-[0.3vh] border-[#2E6F40] w-[15vw] h-[40vh] rounded-xl">
                    <div className="w-[13vw] aspect-square overflow-hidden rounded-xl mx-auto mt-[2vh]">
                        <img src={fruits} alt="fruits et légumes" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center mt-[2vh]">Imparfait dehors, <br />parfait dedans</p>
                </div>

                <div className=" w-[15vw] h-[40vh] border-[0.3vh] border-[#6CAE75] rounded-xl">
                    <div className="w-[13vw] aspect-square overflow-hidden rounded-xl mx-auto mt-[2vh]">
                        <img src={invendus} alt="invendus de commerce" className="w-full h-full object-cover"  />
                    </div>
                    <p className="text-center px-[1vw] mt-[2vh]">Trop bon pour finir derrière</p>
                </div>
            </div>
        </section>
    )
}
export default TypesProduits