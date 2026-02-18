import { UserRound } from "lucide-react"

function Navbar() {
  return (
    <nav className="bg-emerald-800 text-white p-4 flex justify-between w-full fixed top-0 ">
      <h1 className="font-bold text-x1">Tsinjo</h1>
      <div className="space-x-4 flex items-center">
        
          <button>Accueil</button>
          <button>Trouver un repas</button>
          <button>Partager</button>
       
        <UserRound className="w-10 h-10 text-white" />
      </div>
    </nav>
  )
}

export default Navbar
