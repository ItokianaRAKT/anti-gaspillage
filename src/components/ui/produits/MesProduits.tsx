import { useEffect, useState } from "react";
import api from "../../../api/axios";
import legume from "../../../assets/légumes.jpg";
import boulangerie from "../../../assets/pain.jpg";
import laitier from "../../../assets/cremerie.jpeg";
import viande from "../../../assets/viande.jpg";
import fruitDeMer from "../../../assets/fruitsDeMer.jpg";
import epicerie from "../../../assets/epicerie.jpg";
import boisson from "../../../assets/boisson.jpeg";
import cuisiné from "../../../assets/invendus.png";
import dessert from "../../../assets/dessert.jpg";
import autre from "../../../assets/autre.jpg";

const imageParCategorie: Record<string, string> = {
  "3aec946b-1710-4180-928a-5a6c6cd4d59d": boulangerie,
  "b57d32d0-d224-4253-9bed-6dc647c89d9d": legume,
  "397f5610-7eac-470a-a162-b1b765ac9c4c": laitier,
  "02b9e2fe-a8cc-4939-9871-566dd1ac4282": viande,
  "c0cd1bff-13ad-498d-8323-418dd79c860a": fruitDeMer,
  "31356d18-8231-48e7-8513-c0d1d4c99e7d": epicerie,
  "d5840f1a-a73e-4707-9eb3-af6e60420ca8": boisson,
  "60a65e91-878c-43d1-8b66-fc8e6f2c0b39": cuisiné,
  "76bd1c6c-7686-46d4-8593-15145664e389": dessert,
  "d8d5f1e1-561b-46ad-a6e8-899a6dc2cf5e": autre
};
interface Reservateur {
  id_user: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  tel1_user: string;
  tel2_user: string;
  address_user: string;
}

interface Reservation {
  id_reservation: string;
  quantity_reserved: number;
  status_reservation: string;
  date_reservation: string;
  reservateur: Reservateur;
}

interface MonProduit {
  id_product: string;
  name_product: string;
  price_product: number | string;
  current_stock: number;
  initial_stock: number;
  image_product: string | null;
  expiration_date: string;
  is_available: boolean;
  category?: string;
  reservations: Reservation[];
}

const statusLabel: Record<string, { label: string; color: string }> = {
  pending:   { label: "En attente",  color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmée",   color: "bg-blue-100 text-blue-700" },
  collected: { label: "Récupérée",   color: "bg-green-100 text-green-700" },
  cancelled: { label: "Annulée",     color: "bg-red-100 text-red-700" },
};

export default function MesProduits() {
  const [produits, setProduits] = useState<MonProduit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservateur, setSelectedReservateur] = useState<Reservateur | null>(null);

  useEffect(() => {
    api.get("/products/my/")
      .then((res) => {
        console.log("Produits reçus:", res.data);
        setProduits(res.data);
      })
      .catch((err) => {
        console.error("Erreur:", err.response?.status, err.response?.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-lg">Chargement...</p>
    </div>
  );
  console.log("produits.length:", produits.length, "loading:", loading);
  return (
    <div className="max-w-5xl mx-auto mt-24 md:mt-32 px-4 md:px-8 pb-16">
      <h1 className="text-primaryGreen mt-42 text-4xl md:text-5xl font-titre mb-10 text-center">
        Mes produits
      </h1>

      {produits.length === 0 ?(
        <p className="text-center text-gray-400 text-xl mt-20">
          Vous n'avez pas encore publié de produit.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {produits.map((produit) => (
            <div key={produit.id_product} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Header produit */}
              <div className="flex items-center gap-4 p-5 border-b border-gray-100">
                <img
                  src={
                    produit.image_product
                    ? `http://127.0.0.1:8000${produit.image_product}`
                    : (produit.category ? imageParCategorie[produit.category] : autre)
                }
                  alt={produit.name_product}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg truncate">{produit.name_product}</h2>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                    <span>Stock : <strong>{produit.current_stock}/{produit.initial_stock}</strong></span>
                    <span>·</span>
                    <span>DLC : <strong>{produit.expiration_date}</strong></span>
                    <span>·</span>
                    {Number(produit.price_product) === 0 ? <strong className="text-green-600">Gratuit</strong> : <strong>{produit.price_product} Ar</strong>}
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium shrink-0 ${produit.is_available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {produit.is_available ? "Disponible" : "Indisponible"}
                </span>
              </div> 

              {/* Réservations */}
              <div className="p-5">
                {produit.reservations.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">Aucune réservation pour ce produit.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {produit.reservations.length} réservation{produit.reservations.length > 1 ? "s" : ""}
                    </p>
                    {produit.reservations.map((resa) => (
                      <div
                        key={resa.id_reservation}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-primaryGreen/10 flex items-center justify-center shrink-0 text-primaryGreen font-bold text-sm">
                          {resa.reservateur.first_name?.[0] ?? resa.reservateur.username?.[0] ?? "?"}
                        </div>

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {resa.reservateur.first_name} {resa.reservateur.last_name || resa.reservateur.username}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            Qté : {resa.quantity_reserved} · {new Date(resa.date_reservation).toLocaleDateString("fr-FR")}
                          </p>
                        </div>

                        {/* Statut */}
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${statusLabel[resa.status_reservation]?.color}`}>
                          {statusLabel[resa.status_reservation]?.label}
                        </span>

                        {/* Bouton détail */}
                        <button
                          onClick={() => setSelectedReservateur(resa.reservateur)}
                          className="text-xs text-primaryGreen border border-primaryGreen px-3 py-1.5 rounded-lg hover:bg-primaryGreen hover:text-white transition shrink-0"
                        >
                          Voir détail
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal détail réservateur */}
      {selectedReservateur && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-7 w-full max-w-sm relative">
            <button
              onClick={() => setSelectedReservateur(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primaryGreen/10 flex items-center justify-center text-primaryGreen text-2xl font-bold mb-3">
                {selectedReservateur.first_name?.[0] ?? selectedReservateur.username?.[0] ?? "?"}
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {selectedReservateur.first_name} {selectedReservateur.last_name}
              </h3>
              <p className="text-gray-400 text-sm">@{selectedReservateur.username}</p>
            </div>

            {/* Infos */}
            <div className="space-y-3">
              {[
                { icon: "✉️", label: "Email", value: selectedReservateur.email },
                { icon: "📍", label: "Adresse", value: selectedReservateur.address_user || "Non renseignée" },
                { icon: "📞", label: "Téléphone", value: selectedReservateur.tel1_user || "Non renseigné" },
                ...(selectedReservateur.tel2_user ? [{ icon: "📞", label: "Tél. 2", value: selectedReservateur.tel2_user }] : []),
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                    <p className="text-sm text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedReservateur(null)}
              className="mt-6 w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-sm hover:opacity-90 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}