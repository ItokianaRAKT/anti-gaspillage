import { UserRound } from "lucide-react"
import { ShoppingBasket } from "lucide-react";
import logo from '../assets/logo/logo-dark-transparent.png';
function Navbar() {
  return (
    <nav className="bg-white text-[#2E6F40] p-4 flex justify-between w-full fixed top-0 items-center h-20 z-10 shadow-md">
      <img src={logo} alt="Logo" className="h-16 "/>
      <div className="space-x-36 flex text-[#2E6F40] text-3xl font-medium">
        
          <button className="">Accueil</button>

          <button>Trouver un repas</button>
          <button>Partager</button>
       
      </div>
      <div className="flex gap-15">
        <UserRound className="w-10 h-10 text-[#2E6F40]" />
        <ShoppingBasket className="w-10 h-10 text-[#2E6F40]" />
      </div>
    </nav>
  )
}
export default Navbar
//#FBE9D5]