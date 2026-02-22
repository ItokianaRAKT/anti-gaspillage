import { useState } from "react";

const units = [
  "pièce",
  "pack",
  "kg",
  "litre",
  "barquette",
  "lot",
  "portion",
];

 function PublishProductForm() {
  const defaultAddress = "Ivandry, Antananarivo"; 
  const defaultPickupTime = "18:00"; 

  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    unit: "pièce",
    stock: "",
    expiryDate: "",
    address: defaultAddress,
    pickupTime: defaultPickupTime,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.name &&
    form.type &&
    form.price &&
    form.stock &&
    form.expiryDate;

  return (
    <div className="max-w-xl mt-[10%] mx-auto p-6 bg-white rounded-2xl shadow-lg ">
      <h2 className="text-2xl font-semibold mb-6">Publier un produit</h2>

      <div className="flex flex-col gap-4">

        {/* Nom */}
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={form.name}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Type de produit</option>
          <option>Pain & pâtisserie</option>
          <option>Fruits & légumes</option>
          <option>Plats faits maison</option>
          <option>Produits laitiers</option>
          <option>Épicerie</option>
          <option>Autre</option>
        </select>

        {/* Prix + unité */}
        <div className="flex gap-2">
          <input
            type="number"
            name="price"
            placeholder="Prix unitaire"
            value={form.price}
            onChange={handleChange}
            className="border rounded-lg p-3 w-2/3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="border rounded-lg p-3 w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
          >
            {units.map((unit) => (
              <option key={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder={`Stock disponible (${form.unit}${form.unit === "pièce" ? "s" : ""})`}
          value={form.stock}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Date limite */}
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Adresse */}
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Heure limite */}
        <input
          type="time"
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Bouton */}
        <button
          disabled={!isValid}
          className={`mt-4 p-3 rounded-xl font-medium transition 
          ${isValid 
            ? "bg-black text-white hover:opacity-90" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Publier maintenant
        </button>

      </div>
    </div>
  );
}
export default PublishProductForm