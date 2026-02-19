import { UserRound } from "lucide-react"
import logo from '../assets/logo/logo-light-transparent.png';
function Navbar() {
  return (
    <nav className="bg-[#2E6F40] text-white p-4 flex justify-between w-full fixed top-0 items-center">
      <img src={logo} alt="Logo" className="h-16 "/>
      <div className="space-x-36 flex text-white text-2xl">
        
          <button className="">Accueil</button>

          <button>Trouver un repas</button>
          <button>Partager</button>
       
      </div>
        <UserRound className="w-10 h-10 text-white" />
    </nav>
  )
}

export default Navbar
