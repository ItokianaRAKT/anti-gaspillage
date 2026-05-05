/**
 * MesProduits — Redesign premium
 * - Icônes Lucide React (remplacement emojis ✉️📍📞✕)
 * - Cards produits plus élégantes
 * - Modal détail réservateur améliorée
 * - État vide illustré
 */

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import legume     from "../../../assets/légumes.jpg";
import boulangerie from "../../../assets/pain.jpg";
import laitier    from "../../../assets/cremerie.jpeg";
import viande     from "../../../assets/viande.jpg";
import fruitDeMer from "../../../assets/fruitsDeMer.jpg";
import epicerie   from "../../../assets/epicerie.jpg";
import boisson    from "../../../assets/boisson.jpeg";
import cuisiné    from "../../../assets/invendus.png";
import dessert    from "../../../assets/dessert.jpg";
import autre      from "../../../assets/autre.jpg";
import {
  Package, Mail, MapPin, Phone, X, User,
  CalendarDays, Boxes, Loader2, ExternalLink
} from "lucide-react";

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
  "d8d5f1e1-561b-46ad-a6e8-899a6dc2cf5e": autre,
};

interface Reservateur {
  id_user: string; username: string; first_name: string;
  last_name: string; email: string; tel1_user: string;
  tel2_user: string; address_user: string;
}
interface Reservation {
  id_reservation: string; quantity_reserved: number;
  status_reservation: string; date_reservation: string;
  reservateur: Reservateur;
}
interface MonProduit {
  id_product: string; name_product: string;
  price_product: number | string; current_stock: number;
  initial_stock: number; image_product: string | null;
  expiration_date: string; is_available: boolean;
  category?: string; reservations: Reservation[];
}

const statusBadge: Record<string, { label: string; cls: string }> = {
  pending:   { label: "En attente",  cls: "bg-amber-100 text-amber-700" },
  confirmed: { label: "Confirmée",   cls: "bg-blue-100 text-blue-700"   },
  collected: { label: "Récupérée",   cls: "bg-primaryGreen/15 text-primaryGreen" },
  cancelled: { label: "Annulée",     cls: "bg-red-100 text-red-500"     },
};

export default function MesProduits() {
  const [produits,             setProduits]             = useState<MonProduit[]>([]);
  const [loading,              setLoading]              = useState(true);
  const [selectedReservateur,  setSelectedReservateur]  = useState<Reservateur | null>(null);

  useEffect(() => {
    api.get("/products/my/")
      .then((res) => setProduits(res.data))
      .catch((err) => console.error("Erreur:", err.response?.status, err.response?.data))
      .finally(() => setLoading(false));
  }, []);

  /* ── Loading ── */
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen gap-3 text-primaryGreen">
      <Loader2 size={22} className="animate-spin" />
      <span className="text-sm font-contenu">Chargement de vos produits…</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4 md:px-8 pb-16">

      {/* En-tête */}
      <div className="mb-10 pt-6">
        <p className="text-xs font-semibold text-primaryGreen uppercase tracking-widest mb-2 font-contenu">Votre espace</p>
        <h1 className="text-primaryGreen text-4xl md:text-5xl font-titre font-bold">Mes produits</h1>
        {produits.length > 0 && (
          <p className="text-gray-400 text-sm mt-2 font-contenu">{produits.length} produit{produits.length > 1 ? "s" : ""} publié{produits.length > 1 ? "s" : ""}</p>
        )}
      </div>

      {/* État vide */}
      {produits.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <Package size={36} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2 font-titre">Aucun produit publié</h2>
          <p className="text-gray-400 text-sm font-contenu">Commencez à partager vos produits avec la communauté.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {produits.map((produit) => (
            <div key={produit.id_product} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Header produit */}
              <div className="flex items-center gap-4 p-5 border-b border-gray-100">
                <img
                  src={
                    produit.image_product
                      ? `http://127.0.0.1:8000${produit.image_product}`
                      : (produit.category ? imageParCategorie[produit.category] : autre)
                  }
                  alt={produit.name_product}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-lg text-gray-900 truncate font-titre">{produit.name_product}</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-contenu">
                      <Boxes size={12} className="text-gray-400" />
                      Stock : <strong>{produit.current_stock}/{produit.initial_stock}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-contenu">
                      <CalendarDays size={12} className="text-gray-400" />
                      DLC : <strong>{produit.expiration_date}</strong>
                    </span>
                    <span className="text-xs font-bold font-contenu text-primaryGreen">
                      {Number(produit.price_product) === 0 ? "Gratuit" : `${produit.price_product} Ar`}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-semibold shrink-0 ${
                  produit.is_available ? "bg-primaryGreen/10 text-primaryGreen" : "bg-gray-100 text-gray-400"
                }`}>
                  {produit.is_available ? "Disponible" : "Indisponible"}
                </span>
              </div>

              {/* Réservations */}
              <div className="p-5">
                {produit.reservations.length === 0 ? (
                  <p className="text-gray-300 text-sm text-center py-3 font-contenu">Aucune réservation pour ce produit.</p>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 font-contenu">
                      {produit.reservations.length} réservation{produit.reservations.length > 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {produit.reservations.map((resa) => (
                        <div key={resa.id_reservation} className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primaryGreen/20 transition-colors">
                          
                          {/* Avatar initiales */}
                          <div className="w-10 h-10 rounded-xl bg-primaryGreen/10 flex items-center justify-center shrink-0 text-primaryGreen font-bold text-sm">
                            {resa.reservateur.first_name?.[0] ?? resa.reservateur.username?.[0] ?? "?"}
                          </div>

                          {/* Infos */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-gray-800 truncate">
                              {resa.reservateur.first_name} {resa.reservateur.last_name || resa.reservateur.username}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 font-contenu">
                              Qté : {resa.quantity_reserved} · {new Date(resa.date_reservation).toLocaleDateString("fr-FR")}
                            </p>
                          </div>

                          {/* Statut */}
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${statusBadge[resa.status_reservation]?.cls}`}>
                            {statusBadge[resa.status_reservation]?.label}
                          </span>

                          {/* Voir détail */}
                          <button
                            onClick={() => setSelectedReservateur(resa.reservateur)}
                            className="flex items-center gap-1 text-xs text-primaryGreen font-semibold px-3 py-1.5 rounded-xl border border-primaryGreen/30 hover:bg-primaryGreen hover:text-white transition-all shrink-0"
                          >
                            <ExternalLink size={11} /> Détail
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal détail réservateur */}
      {selectedReservateur && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm relative">

            {/* Fermer */}
            <button
              onClick={() => setSelectedReservateur(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X size={16} />
            </button>

            {/* Avatar + nom */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primaryGreen/10 flex items-center justify-center text-primaryGreen text-2xl font-bold mb-3">
                {selectedReservateur.first_name?.[0] ?? selectedReservateur.username?.[0] ?? "?"}
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-titre">
                {selectedReservateur.first_name} {selectedReservateur.last_name}
              </h3>
              <p className="text-gray-400 text-sm font-contenu">@{selectedReservateur.username}</p>
            </div>

            {/* Infos */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Mail,   label: "Email",     value: selectedReservateur.email },
                { icon: MapPin, label: "Adresse",   value: selectedReservateur.address_user || "Non renseignée" },
                { icon: Phone,  label: "Téléphone", value: selectedReservateur.tel1_user   || "Non renseigné"  },
                ...(selectedReservateur.tel2_user
                  ? [{ icon: Phone, label: "Tél. 2", value: selectedReservateur.tel2_user }]
                  : []),
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-primaryGreen" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-contenu">{item.label}</p>
                      <p className="text-sm text-gray-800 font-medium truncate">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedReservateur(null)}
              className="mt-6 w-full py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <User size={15} /> Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
