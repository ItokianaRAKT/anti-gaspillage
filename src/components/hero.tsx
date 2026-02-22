import fond from "../assets/panier.png"
const Hero = () =>{
    return (
    <section className="mb-[10vh]">
            <div className="relative flex mt-20 h-[91.6vh] bg-green-50">
                <img src={fond} alt="fond" className=" ml-auto h-1/2 absolute top-1/5 left-1/2  rounded-3xl" />
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                    <p className="-translate-x-1/3 -translate-y-1/3 text-[#2E6F40] text-[6vh] font-semibold h-1/2 flex justify-center items-center leading-20 rounded-4xl font-titre">
                        Moins de gaspillage, <br /> Plus de partage
                    </p>
                    <p className="text-2xl -translate-x-1/3 translate-y-1/6 font-contenu leading-10">Ici, les repas ont une seconde chance. <br />Partagez ce que vous n’utilisez pas ou  trouvez <br /> près de chez vous ce qui mérite d’être savouré.</p>
                    <div className="mt-30 -ml-30 flex ">
                        <button className="bg-[#2E6F40] -translate-x-[3vw] text-white text-3xl p-6 rounded-4xl  font-contenu">Trouver un repas</button>
                        <button className="bg-[#FBE9D5] text-[#2E6F40] text-3xl p-6 rounded-4xl font-contenu">Partager</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero
