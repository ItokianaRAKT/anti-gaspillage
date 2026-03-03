import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/features/navbar";
import Accueil from "./components/ui/Accueil";
import Trouver from "./components/ui/Trouver";
import Partager from "./components/ui/Partager"
import Profil from "./components/ui/Profil"
import Panier from "./components/ui/Panier"
import Footer from "./components/features/footer"
function App() {
  return (
    <BrowserRouter basename="/anti-gaspillage">
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Trouver" element={<Trouver />} />
        <Route path="/Partager" element={<Partager />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Panier" element={<Panier />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;