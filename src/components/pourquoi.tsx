import fondGasp from "../assets/gaspillage.jpg"
const Pourquoi = () => {
    return (
        <section className="mt-[30%] w-full relative flex justify-center items-center">
            <img src={fondGasp} alt="" className="w-full absolute"/>
            <div className="absolute items-center flex justify-center flex-col text-center bg-white/90 p-24">
                <p className="text-center mb-12 text-[#2E6F40] text-5xl ">Pourquoi on fait ça ?</p>
                <p className="text-2xl leading-loose">Chaque année, des tonnes de nourriture finissent à la poubelle <br /> alors qu'elles pourraient nourrir quelqu'un. </p>
            </div>
        </section>
    )
}
export default Pourquoi