import { useState, useEffect} from "react";
import { z } from "zod";
import { publierProduit } from "../../services/product.service";
import  { getCategories } from "../../services/category.service"

interface Category {
  id_category: string;
  name_category: string;
}

  const units = [
  "pièce",
  "pack",
  "kg",
  "litre",
  "barquette",
  "lot",
  "portion",
] as const;

const productSchema = z.object({
  name: z.string().min(1, "Veuillez entrer le nom du produit."),
  description: z.string(),
  type: z.string().min(1, "Type invalide"),
  price: z.number().min(0, "Prix invalide"),
  unit: z.enum(units),
  stock: z.number().positive("Stock invalide"),
  expiryDate: z.string().min(1, "Veuillez entrer la DLC"),
  address: z.string().min(1, "Veuillez entrer une adresse"),
  pickupTime: z.string().min(1, "Veuillez entrer une heure de retrait"),
})

function PublishProductForm() {
  const defaultAddress = "Ivandry, Antananarivo";
  const defaultPickupTime = "18:00";

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    price: 0,
    unit: "pièce",
    stock: 0,
    expiryDate: "",
    address: defaultAddress,
    pickupTime: defaultPickupTime,
    image: null as File | null,
  });
  
  
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then(data => setCategories(data));
  }, []);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    const result = productSchema.safeParse({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      const formData =new FormData();
          formData.append("name_product", result.data.name);
      formData.append("price_product", String(result.data.price));
      formData.append("description_product","")
      formData.append("initial_stock", String(result.data.stock));
      formData.append("current_stock", String(result.data.stock));
      formData.append("expiration_date", result.data.expiryDate);
      formData.append("recovery_address", result.data.address);
      formData.append("recovery_time_limit", `${result.data.expiryDate}T${result.data.pickupTime}:00Z`);
      formData.append("category", result.data.type); // a vérifier, je sais pas
      formData.append("is_available", "true");
      if (form.image) formData.append("image_product", form.image);
      await publierProduit(formData);
    alert("Produit publié !");

    setForm({
      name: "",
      description:"",
      type: "",
      price: 0,
      unit: "pièce",
      stock: 0,
      expiryDate: "",
      address: defaultAddress,
      pickupTime: defaultPickupTime,
      image: null,
      }
      
    )} catch (e) {
      alert ("Erreur lors de la publication");
    }

  };


  return (
    <section className="w-full px-4 md:px-8">
      <div className="max-w-6xl mt-24 md:mt-32 mx-auto p-6 md:p-10 rounded-2xl shadow-lg">

        <p className="text-primaryGreen text-4xl md:text-5xl font-titre mb-10 text-center">
          Publier un produit
        </p>

        <div className="flex flex-col md:flex-row gap-10 md:gap-20">

          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nom du produit</label>

              <input
                type="text"
                name="name"
                placeholder="Nom du produit"
                value={form.name}
                onChange={handleChange}
                className="border rounded-lg p-3 text-base md:text-lg w-full"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Décrivez votre produit"
                value={form.description}
                onChange={handleChange}
                className="border rounded-lg p-3 text-base md:text-lg w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Catégorie</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="border rounded-lg p-3 text-base md:text-lg w-full"
              >
                <option value="">Choisir une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id_category} value={cat.id_category}>
                    {cat.name_category}
                  </option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Prix unitaire</label>

              <div className="flex gap-2">
                <input
                  type="number"
                  name="price"
                  placeholder="Prix en Ariary"
                  value={form.price}
                  onChange={handleChange}
                  min={0}
                  step={100}
                  className="border rounded-lg p-3 w-2/3 text-base md:text-lg"
                />
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-1/3 text-base md:text-lg"
                >
                  {units.map((unit)=> (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Stock disponible</label>

              <input
                type="number"
                name="stock"
                placeholder={`Stock disponible (${form.unit}${form.unit === "pièce" ? "s" : ""})`}
                value={form.stock}
                onChange={handleChange}
                min={1}
                className="border rounded-lg p-3 text-base md:text-lg w-full"
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date Limite de Consommation</label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                className="border rounded-lg p-3 text-base md:text-lg w-full"
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Adresse de récupération</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border rounded-lg p-3 text-base md:text-lg w-full"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Heure limite de récupération</label>
              <input
                type="time"
                name="pickupTime"
                value={form.pickupTime}
                onChange={handleChange}
                className="border rounded-lg p-3 text-base md:text-lg w-full"
              />
              {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-5">
            <div className="w-full max-w-[40vh] aspect-square border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden bg-white">
              {form.image ? (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="aperçu"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">image</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="imageUpload"
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-white text-black border border-solid px-4 py-2 rounded-lg text-center w-full max-w-[40vh]"
            >
              {form.image ? form.image.name : "Choisir une image"}
            </label>
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-xl font-medium transition text-lg bg-black text-white hover:opacity-90"
          >
            Publier maintenant
          </button>
        </div>

      </div>
    </section>
  );
}

export default PublishProductForm;