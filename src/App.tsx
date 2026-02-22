import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Accueil from "./pages/Accueil";
import Trouver from "./pages/Trouver";
import Partager from "./pages/Partager"
import Profil from "./pages/Profil"
import Panier from "./pages/Panier"
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Trouver" element={<Trouver />} />
        <Route path="/Partager" element={<Partager />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Panier" element={<Panier />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;