import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useProductStore } from "../../store/product.store";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const CarteLeaflet = () => {
  const { produits } = useProductStore();
  const [position, setPosition] = useState<[number, number]>([-18.9137, 47.5361]);
  const [localise, setLocalise] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLocalise(true);
      },
      () => {}
    );
  }, []);

  const produitsAvecCoords = produits.filter(p => p.latitude && p.longitude);

  return (
    <section className="px-4 md:px-8 mb-16">
      <div className="flex items-center justify-between mb-4">
        <p className="text-primaryGreen text-4xl md:text-5xl font-titre">
          Carte des produits
        </p>
        <span className="text-sm text-gray-400">
          {localise ? "📍 Position actuelle" : "📍 Antananarivo"}
        </span>
      </div>

      <div className="w-full h-125 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {produitsAvecCoords.map((p) => (
            <Marker key={p.id_product} position={[p.latitude!, p.longitude!]}>
              <Popup>
                <div style={{ minWidth: "150px" }}>
                  <p style={{ fontWeight: 600, marginBottom: "4px" }}>{p.name_product}</p>
                  <p style={{ color: "#2E6F40", fontWeight: 500 }}>
                    {p.price_product === 0 ? "Gratuit" : `${p.price_product} Ar`}
                  </p>
                  <p style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>
                    {p.recovery_address}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {produitsAvecCoords.length === 0 && (
        <p className="text-center text-gray-400 mt-4">Aucun produit géolocalisé pour l'instant.</p>
      )}
    </section>
  );
};

export default CarteLeaflet;