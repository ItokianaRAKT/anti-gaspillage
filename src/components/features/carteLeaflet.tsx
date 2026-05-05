/**
 * CarteLeaflet — Redesign premium
 * - En-tête section plus soignée avec icônes Lucide
 * - Badge géolocalisation amélioré
 * - Map container avec bordure raffinée
 */

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useProductStore } from "../../store/product.store";
import { MapPin, Navigation } from "lucide-react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const CarteLeaflet = () => {
  const { produits } = useProductStore();
  const [position, setPosition] = useState<[number, number]>([
    -18.9137, 47.5361,
  ]);
  const [localise, setLocalise] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLocalise(true);
      },
      () => {},
    );
  }, []);

  const produitsAvecCoords = produits.filter((p) => p.latitude && p.longitude);

  return (
    <section className="px-4 md:px-8 mb-16 mt-10">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
        <div>
          <p className="text-xs font-semibold text-primaryGreen uppercase tracking-widest mb-1.5 font-contenu">
            Géolocalisation
          </p>
          <h2 className="text-primaryGreen text-3xl md:text-4xl font-titre font-bold">
            Carte des produits
          </h2>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium font-contenu ${
            localise
              ? "bg-primaryGreen/10 text-primaryGreen"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {localise ? (
            <>
              <Navigation size={13} className="shrink-0" /> Position actuelle
            </>
          ) : (
            <>
              <MapPin size={13} className="shrink-0" /> Antananarivo
            </>
          )}
        </div>
      </div>

      {/* Carte */}
      <div className="w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {produitsAvecCoords.map((p) => (
            <Marker key={p.id_product} position={[p.latitude!, p.longitude!]}>
              <Popup>
                <div
                  style={{
                    minWidth: "160px",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 700,
                      marginBottom: "4px",
                      color: "#1f2937",
                      fontSize: "14px",
                    }}
                  >
                    {p.name_product}
                  </p>
                  <p
                    style={{
                      color: "#2E6F40",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    {p.price_product === 0
                      ? "Gratuit"
                      : `${p.price_product} Ar`}
                  </p>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {p.recovery_address}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {produitsAvecCoords.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-4 font-contenu">
          Aucun produit géolocalisé pour l'instant.
        </p>
      )}
    </section>
  );
};

export default CarteLeaflet;
