import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import logo from "../assets/logo/logo-dark-transparent.png"
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <section className="mt-[70vh] w-full flex flex-col bg-green-50 items-center">
            <div className="flex items-center justify-between w-[90%] text-2xl pb-[1%] border-b">
                <div className="flex gap-[1vw]">
                    <FontAwesomeIcon icon={faTwitter} className="text-[3vh]" />
                    <FontAwesomeIcon icon={faFacebook} className="text-[3vh]" />
                    <FontAwesomeIcon icon={faInstagram} className="text-[3vh]" />
                </div>
                <img src={logo} alt="logo Tsinjo" className="w-[15vw]"/>
                <p>tsinjo@contact.dev</p>
            </div>
            <div className="flex justify-center gap-[7vw] text-2xl font-semibold pt-[2%]">
                <Link to="/" className="font-titre">Accueil</Link>
                <Link to="/Trouver" className="font-titre">Trouver un repas</Link>
                <Link to="/Partager" className="font-titre">Partager</Link>
                <Link to="/Panier" className="font-titre">Panier</Link>
            </div>
                <p className="text-center text-xl pt-[3%]" >Copyright © 2026.Tsinjo. All rights reserved</p>
        </section>
    )
}
export default Footer