import caddie from "../assets/caddie.png"
import logo from "../assets/logo/logo-dark-transparent.png"
const Footer = () => {
    return (
        <section className="mt-[70vh] w-full flex flex-col relative ">
            
                <img src={caddie} alt="caddie" className="absolute pt-[3%]  -ml-[n5%]"/>
                <img src={logo} alt="logo Tsinjo" className="absolute pl-[15%]"/>

                    <div className="flex w-full justify-end  gap-[5%] pr-[6%] text-2xl pt-[5vh]">
                        <div className="flex flex-col leading-[200%]">
                            <p className="font-titre font-bold pb-[10%]">Pages</p>
                            <a href="#">Accueil</a>
                            <a href="#">Trouver un repas</a>
                            <a href="#">Partager</a>
                            <a href="#">Panier</a>
                        </div>
                        
                        <div className="flex flex-col leading-[200%]">
                            <p className="font-titre font-bold pb-[10%]">Produits</p>
                            <a href="#">Pains et patisseries</a>
                            <a href="#">Fruits et légumes</a>
                            <a href="#">Plats fais maison</a>
                            <a href="#">Invenus de commerce</a>
                        </div>

                        <div className="flex flex-col leading-[200%]">
                            <p className="font-titre font-bold pb-[10%]">Contacts</p>
                            <p>contact@tsinjo.dev</p>
                            <p>+261 34 00 000 00</p>
                            <p>Antananarivo, Madagascar</p>
                        </div>
                    </div>

                    <p className="text-center text-2xl pt-[5%]" >© 2026 Tsinjo</p>
        </section>
    )
}
export default Footer