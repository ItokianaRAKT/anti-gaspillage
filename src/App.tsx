import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/features/navbar";
import Accueil from "./components/ui/home/Accueil";
import Trouver from "./components/ui/Trouver";
import Partager from "./components/ui/Partager";
import Profil from "./components/ui/Profil";
import Panier from "./components/ui/Panier";
import MesProduits from "./components/ui/produits/MesProduits";
import Footer from "./components/features/footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/features/layout/ProtectedRoute";
function App() {
  return (
    <BrowserRouter basename="/anti-gaspillage">
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Trouver" element={<Trouver />} />
        <Route path="/Partager" element={<Partager />} />
        <Route path="/MesProduits" element={<MesProduits />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Panier" element={<Panier />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>Dashboard protégé</div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
