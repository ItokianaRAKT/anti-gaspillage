import fond from "../assets/panier.png"
const Hero = () =>{
    return (
        <body>
            <div className="relative flex mt-20 h-[91.6vh]">
                <img src={fond} alt="fond" className=" ml-auto h-1/2 absolute top-1/5 left-1/2 bg-[#FBE9D5] rounded-3xl" />
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                    <p className="  -translate-x-1/3 -translate-y-1/2 text-[#2E6F40] text-7xl font-medium  h-1/2 flex justify-center items-center leading-20  rounded-4xl">
                        Moins de gaspillage, <br /> Plus de partage
                    </p>
                    <p className="text-2xl -translate-x-1/3 ">Ici, les repas ont une seconde chance. <br />Partagez ce que vous n’utilisez pas ou  trouvez <br /> près de chez vous ce qui mérite d’être savouré.</p>
                    <div className="mt-16 flex ">
                        <button className="bg-[#2E6F40] -translate-x-1/2 text-white text-3xl p-6 rounded-[50vh]">Trouver un repas</button>
                        <button className="bg-[#FBE9D5] -translate-x-1/3 text-[#2E6F40] text-3xl p-6 rounded-[50vh]">Partager</button>
                    </div>
                </div>
            </div>

        </body>
       
    )
}
export default Hero
//