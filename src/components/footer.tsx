import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import logo from "../assets/logo/logo-dark-transparent.png"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <section className="mt-20 w-full flex flex-col bg-green-50 items-center py-6">

            <div className="flex items-center justify-between w-[90%] pb-4 border-b gap-4">
                <div className="flex gap-3">
                    <FontAwesomeIcon icon={faTwitter} className="text-[3vh]" />
                    <FontAwesomeIcon icon={faFacebook} className="text-[3vh]" />
                    <FontAwesomeIcon icon={faInstagram} className="text-[3vh]" />
                </div>

                <img src={logo} alt="logo Tsinjo" className="w-[30vw] md:w-[20vw] lg:w-[15vw]" />

                <p className="hidden sm:block text-xl lg:text-2xl text-right">tsinjo@contact.dev</p>

                <div className="flex sm:hidden w-[3vh] gap-3 opacity-0">
                    <FontAwesomeIcon icon={faTwitter} className="text-[3vh]" />
                </div>
            </div>

            <p className="sm:hidden text-base pt-3">tsinjo@contact.dev</p>

            <div className="hidden sm:flex justify-center gap-[7vw] text-2xl font-semibold pt-4">
                <Link to="/" className="font-titre">Accueil</Link>
                <Link to="/Trouver" className="font-titre">Trouver un repas</Link>
                <Link to="/Partager" className="font-titre">Partager</Link>
                <Link to="/Panier" className="font-titre">Panier</Link>
            </div>

            <div className="flex sm:hidden flex-col items-center text-2xl font-semibold pt-4 gap-4 w-full">
                <Link to="/" className="font-titre">Accueil</Link>
                <Link to="/Trouver" className="font-titre">Trouver un repas</Link>
                <Link to="/Partager" className="font-titre">Partager</Link>
                <Link to="/Panier" className="font-titre">Panier</Link>
            </div>

            <p className="text-center text-base md:text-xl pt-4">Copyright © 2026. Tsinjo. All rights reserved</p>
        </section>
    )
}
export default Footer