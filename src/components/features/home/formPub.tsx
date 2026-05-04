/**
 * FormPub — Redesign premium
 * - Icônes Lucide React sur tous les champs
 * - Layout deux colonnes épuré
 * - Zone d'upload image stylisée avec preview
 * - Labels et spacing cohérents
 * - Logique métier / API inchangée
 */

import { useState, useEffect } from "react";
import { z } from "zod";
import { publierProduit } from "../../../services/product.service";
import { getCategories } from "../../../services/category.service";
import AuthRequiredModal from "../../ui/home/AuthRequiredModal";
import Toast from "../../ui/Toast";
import { useAuthStore } from "../../../store/auth.store";
import {
  Tag, AlignLeft, Grid, DollarSign, Package, Calendar,
  MapPin, Clock, ImagePlus, Loader2, Send, Home
} from "lucide-react";

interface Category {
  id_category: string;
  name_category: string;
}

const units = ["pièce", "pack", "kg", "litre", "barquette", "lot", "portion"] as const;

const productSchema = z.object({
  name: z.string().min(1, "Veuillez entrer le nom du produit."),
  description: z.string(),
  type: z.string().min(1, "Type invalide"),
  price: z.number().min(0, "Prix invalide"),
  unit: z.enum(units),
  stock: z.number().positive("Stock invalide"),
  expiryDate: z.string().min(1, "Veuillez entrer la DLC"),
  address: z.string().min(1, "Veuillez entrer une adresse"),
  quartier: z.string().min(1, "Veuillez entrer votre quartier"),
  pickupTime: z.string().min(1, "Veuillez entrer une heure de retrait"),
});

/* ── Champ réutilisable ── */
function Field({
  label, icon: Icon, error, children, optional
}: {
  label: string; icon: React.ElementType; error?: string; children: React.ReactNode; optional?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
        <Icon size={14} className="text-gray-400" />
        {label}
        {optional && <span className="text-gray-400 font-normal text-xs ml-1">(optionnel)</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function PublishProductForm() {
  const defaultPickupTime = "18:00";

  const access = useAuthStore((s) => s.access);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "", description: "", type: "", price: 0,
    unit: "pièce" as (typeof units)[number],
    stock: 0, expiryDate: "", address: "", quartier: "",
    pickupTime: defaultPickupTime, image: null as File | null,
  });

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setForm({ ...form, image: e.target.files[0] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value)
             : name === "unit" ? (value as (typeof units)[number])
             : value,
    }));
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-3.5 py-3 rounded-xl border text-sm transition-all duration-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-primaryGreen/20 font-contenu ${
      hasError ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-primaryGreen"
    }`;

  const handleSubmit = async () => {
    if (!access) { setShowAuthModal(true); return; }

    const result = productSchema.safeParse({ ...form, price: Number(form.price), stock: Number(form.stock) });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name_product", result.data.name);
      formData.append("price_product", String(result.data.price));
      formData.append("description_product", result.data.description);
      formData.append("initial_stock", String(result.data.stock));
      formData.append("current_stock", String(result.data.stock));
      formData.append("expiration_date", result.data.expiryDate);
      formData.append("recovery_address", `${result.data.address}, ${form.quartier}, Antananarivo`);
      formData.append("recovery_time_limit", `${result.data.expiryDate}T${result.data.pickupTime}:00Z`);
      formData.append("category", result.data.type);
      formData.append("is_available", "true");
      if (form.image) formData.append("image_product", form.image);

      await publierProduit(formData);

      setToast({ message: "Produit publié avec succès !", type: "success" });
      setForm({
        name: "", description: "", type: "", price: 0, unit: "pièce",
        stock: 0, expiryDate: "", address: "", quartier: "",
        pickupTime: defaultPickupTime, image: null,
      });
    } catch (e: any) {
      if (e?.response?.status === 401) setShowAuthModal(true);
      else if (e?.response?.data?.price_product) setErrors({ price: e.response.data.price_product[0] });
      else setToast({ message: "Erreur lors de la publication. Réessayez.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {showAuthModal && <AuthRequiredModal onClose={() => setShowAuthModal(false)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <section className="w-full px-4 md:px-8 pt-8">
        <div className="max-w-5xl mt-24 mx-auto">

          {/* En-tête */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primaryGreen uppercase tracking-widest mb-3 font-contenu">
              Contribuer
            </p>
            <h1 className="text-primaryGreen text-4xl md:text-5xl font-titre font-bold">
              Publier un produit
            </h1>
            <p className="text-gray-500 text-sm font-contenu mt-3">
              Renseignez les informations de votre produit pour le partager avec la communauté.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

              {/* ── Colonne gauche : champs ── */}
              <div className="flex-1 flex flex-col gap-5">

                <Field label="Nom du produit" icon={Tag} error={errors.name}>
                  <input type="text" name="name" placeholder="Ex: Baguettes du soir" value={form.name} onChange={handleChange} className={inputClass(!!errors.name)} />
                </Field>

                <Field label="Description" icon={AlignLeft}>
                  <input type="text" name="description" placeholder="Décrivez brièvement votre produit" value={form.description} onChange={handleChange} className={inputClass()} />
                </Field>

                <Field label="Catégorie" icon={Grid} error={errors.type}>
                  <select name="type" value={form.type} onChange={handleChange} className={inputClass(!!errors.type)}>
                    <option value="">Choisir une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.id_category} value={cat.id_category}>{cat.name_category}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Prix unitaire" icon={DollarSign} error={errors.price}>
                  <div className="flex gap-2">
                    <input
                      type="number" name="price" placeholder="Prix en Ariary"
                      value={form.price} onChange={handleChange} min={0} step={100}
                      className={`${inputClass(!!errors.price)} flex-1`}
                    />
                    <select name="unit" value={form.unit} onChange={handleChange} className={`${inputClass()} w-32 shrink-0`}>
                      {units.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </Field>

                <Field label="Stock disponible" icon={Package} error={errors.stock}>
                  <input
                    type="number" name="stock"
                    placeholder={`Quantité (${form.unit}${form.unit === "pièce" ? "s" : ""})`}
                    value={form.stock} onChange={handleChange} min={1}
                    className={inputClass(!!errors.stock)}
                  />
                </Field>

                <Field label="Date Limite de Consommation" icon={Calendar} error={errors.expiryDate}>
                  <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className={inputClass(!!errors.expiryDate)} />
                </Field>

                <Field label="Quartier" icon={MapPin} error={errors.quartier}>
                  <input type="text" name="quartier" placeholder="Ex: Ivandry" value={form.quartier} onChange={handleChange} className={inputClass(!!errors.quartier)} />
                </Field>

                <Field label="Adresse exacte" icon={Home} error={errors.address}>
                  <input type="text" name="address" placeholder="Ex: II J 161 R Ambodivoanjo" value={form.address} onChange={handleChange} className={inputClass(!!errors.address)} />
                </Field>

                <Field label="Heure limite de récupération" icon={Clock} error={errors.pickupTime}>
                  <input type="time" name="pickupTime" value={form.pickupTime} onChange={handleChange} className={inputClass(!!errors.pickupTime)} />
                </Field>
              </div>

              {/* ── Colonne droite : image + CTA ── */}
              <div className="lg:w-72 flex flex-col items-center gap-5">

                {/* Zone upload */}
                <div className="w-full">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                    <ImagePlus size={14} className="text-gray-400" /> Photo du produit
                  </label>
                  <label
                    htmlFor="imageUpload"
                    className="group block w-full aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-primaryGreen/40 bg-gray-50 hover:bg-primaryGreen/3 cursor-pointer overflow-hidden transition-all duration-200 relative"
                  >
                    {form.image ? (
                      <img
                        src={URL.createObjectURL(form.image)}
                        alt="aperçu"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gray-200 group-hover:bg-primaryGreen/15 flex items-center justify-center transition-colors">
                          <ImagePlus size={22} className="text-gray-400 group-hover:text-primaryGreen transition-colors" />
                        </div>
                        <p className="text-xs text-gray-400 group-hover:text-primaryGreen transition-colors font-contenu text-center px-4">
                          Cliquer pour ajouter<br />une photo
                        </p>
                      </div>
                    )}
                  </label>
                  <input type="file" accept="image/*" onChange={handleFileChange} id="imageUpload" className="hidden" />
                  {form.image && (
                    <p className="text-xs text-gray-400 mt-1.5 truncate font-contenu">{form.image.name}</p>
                  )}
                </div>

                {/* Bouton publier */}
                <div className="w-full mt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-primaryGreen/25 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                    style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}
                  >
                    {submitting
                      ? <><Loader2 size={18} className="animate-spin" /> Publication...</>
                      : <><Send size={16} /> Publier maintenant</>
                    }
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-2.5 font-contenu">
                    Votre produit sera visible immédiatement par la communauté.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PublishProductForm;
