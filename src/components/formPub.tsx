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
    image: null as File | null,
  });

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setForm({ ...form, image: e.target.files[0] });
  }
};

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
    <div className="max-w-6xl mt-50 mx-auto p-6 rounded-2xl shadow-lg">
  
  <p className="text-primaryGreen text-5xl font-titre mb-13 text-center">
    Publier un produit
  </p>

  <div className="flex flex-col md:flex-row gap-20">
    
    <div className="flex-1 flex flex-col gap-4">
      
      <input
        type="text"
        name="name"
        placeholder="Nom du produit"
        value={form.name}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border rounded-lg p-3"
      >
        <option value="">Type de produit</option>
        <option>Pain & pâtisserie</option>
        <option>Fruits & légumes</option>
        <option>Plats faits maison</option>
        <option>Invendus de commerce</option>
      </select>

      <div className="flex gap-2">
        <input
          type="number"
          name="price"
          placeholder="Prix unitaire en Ariary"
          value={form.price}
          onChange={handleChange}
          className="border rounded-lg p-3 w-2/3"
        />

        <select
          name="unit"
          value={form.unit}
          onChange={handleChange}
          className="border rounded-lg p-3 w-1/3"
        >
          {units.map((unit) => (
            <option key={unit}>{unit}</option>
          ))}
        </select>
      </div>

      <input
        type="number"
        name="stock"
        placeholder={`Stock disponible (${form.unit}${form.unit === "pièce" ? "s" : ""})`}
        value={form.stock}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="date"
        name="expiryDate"
        value={form.expiryDate}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="time"
        name="pickupTime"
        value={form.pickupTime}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />
    </div>

    <div className="flex-1 flex flex-col items-center gap-5">
      
      <div className="w-[40vh] aspect-square border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden bg-white">
        {form.image ? (
          <img
            src={URL.createObjectURL(form.image)}
            alt="aperçu"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">
            image
          </span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="imageUpload"
        className="hidden border border-solid"
      />
      <label
  htmlFor="imageUpload"
  className="cursor-pointer bg-white text-black border border-solid px-4 py-2 rounded-lg text-center w-[40vh]"
>
  {form.image ? form.image.name : "Choisir une image"}
</label>
    </div>

  </div>

  <div className="flex justify-center mt-8">
    <button
      disabled={!isValid}
      className={`px-8 py-3 rounded-xl font-medium transition 
        ${isValid 
          ? "bg-black text-white hover:opacity-90" 
          : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
    >
      Publier maintenant
    </button>
  </div>

</div>)
}
export default PublishProductForm