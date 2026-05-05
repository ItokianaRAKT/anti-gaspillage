/**
 * FormPub — Redesign premium
 * - Icônes Lucide React (remplacement emojis)
 * - Layout deux colonnes plus propre
 * - Zone d'upload image améliorée avec drag-over visuel
 * - Inputs avec focus states premium et labels soignés
 * - Bouton publier premium
 */

import { useState, useEffect } from "react";
import { z } from "zod";
import { publierProduit } from "../../../services/product.service";
import { getCategories } from "../../../services/category.service";
import AuthRequiredModal from "../../ui/home/AuthRequiredModal";
import Toast from "../../ui/Toast";
import { useAuthStore } from "../../../store/auth.store";
import {
  Package, FileText, Tag, Coins, Archive, CalendarDays,
  MapPin, Clock, ImagePlus, Send, AlertCircle, Home
} from "lucide-react";

interface Category {
  id_category: string;
  name_category: string;
}

const units = ["pièce", "pack", "kg", "litre", "barquette", "lot", "portion"] as const;

const productSchema = z.object({
  name:        z.string().min(1, "Veuillez entrer le nom du produit."),
  description: z.string(),
  type:        z.string().min(1, "Type invalide"),
  price:       z.number().min(0, "Prix invalide"),
  unit:        z.enum(units),
  stock:       z.number().positive("Stock invalide"),
  expiryDate:  z.string().min(1, "Veuillez entrer la DLC"),
  address:     z.string().min(1, "Veuillez entrer une adresse"),
  quartier:    z.string().min(1, "Veuillez entrer votre quartier"),
  pickupTime:  z.string().min(1, "Veuillez entrer une heure de retrait"),
});

/* ── Champ générique ───────────────────────────────── */
function Field({
  label, icon: Icon, error, optional, children,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
        <Icon size={14} className="text-gray-400" />
        {label}
        {optional && <span className="text-gray-400 font-normal text-xs">(optionnel)</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:border-primaryGreen focus:ring-2 focus:ring-primaryGreen/15 placeholder-gray-400";
const selectCls =
  "w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:border-primaryGreen focus:ring-2 focus:ring-primaryGreen/15 cursor-pointer appearance-none";

/* ── Composant principal ───────────────────────────── */
function PublishProductForm() {
  const defaultPickupTime = "18:00";
  const access = useAuthStore((s) => s.access);

  const [errors,        setErrors]        = useState<Record<string, string>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast,         setToast]         = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [categories,    setCategories]    = useState<Category[]>([]);
  const [dragOver,      setDragOver]      = useState(false);

  const [form, setForm] = useState({
    name: "", description: "", type: "", price: 0,
    unit: "pièce" as (typeof units)[number],
    stock: 0, expiryDate: "", address: "", quartier: "",
    pickupTime: defaultPickupTime,
    image: null as File | null,
  });

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const handleFileChange = (file: File | null) => {
    if (file) setForm((f) => ({ ...f, image: file }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? Number(value)
        : name === "unit" ? (value as (typeof units)[number])
        : value,
    }));
  };

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
    try {
      const formData = new FormData();
      formData.append("name_product",        result.data.name);
      formData.append("price_product",       String(result.data.price));
      formData.append("description_product", result.data.description);
      formData.append("initial_stock",       String(result.data.stock));
      formData.append("current_stock",       String(result.data.stock));
      formData.append("expiration_date",     result.data.expiryDate);
      formData.append("recovery_address",    `${result.data.address}, ${form.quartier}, Antananarivo`);
      formData.append("recovery_time_limit", `${result.data.expiryDate}T${result.data.pickupTime}:00Z`);
      formData.append("category",            result.data.type);
      formData.append("is_available",        "true");
      if (form.image) formData.append("image_product", form.image);

      await publierProduit(formData);
      setToast({ message: "Produit publié avec succès !", type: "success" });
      setForm({
        name: "", description: "", type: "", price: 0,
        unit: "pièce", stock: 0, expiryDate: "", address: "",
        quartier: "", pickupTime: defaultPickupTime, image: null,
      });
    } catch (e: any) {
      if (e?.response?.status === 401) {
        setShowAuthModal(true);
      } else if (e?.response?.data?.price_product) {
        setErrors({ price: e.response.data.price_product[0] });
      } else {
        setToast({ message: "Erreur lors de la publication. Réessayez.", type: "error" });
      }
    }
  };

  return (
    <>
      {showAuthModal && <AuthRequiredModal onClose={() => setShowAuthModal(false)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <section className="w-full px-4 md:px-8 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primaryGreen uppercase tracking-widest mb-3 font-contenu">Contribuer</p>
            <h1 className="text-primaryGreen text-4xl md:text-5xl font-titre font-bold mb-3">
              Publier un produit
            </h1>
            <p className="text-gray-500 text-sm font-contenu max-w-md mx-auto">
              Donnez une seconde vie à vos produits en les partageant avec la communauté.
            </p>
          </div>

          {/* Carte formulaire */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-14">

              {/* ── Colonne gauche : champs ── */}
              <div className="flex-1 flex flex-col gap-5">

                <Field label="Nom du produit" icon={Package} error={errors.name}>
                  <input type="text" name="name" placeholder="Ex : Pain de mie, Légumes frais…"
                    value={form.name} onChange={handleChange} className={inputCls} />
                </Field>

                <Field label="Description" icon={FileText}>
                  <input type="text" name="description" placeholder="Décrivez votre produit (état, quantité…)"
                    value={form.description} onChange={handleChange} className={inputCls} />
                </Field>

                <Field label="Catégorie" icon={Tag} error={errors.type}>
                  <select name="type" value={form.type} onChange={handleChange} className={selectCls}>
                    <option value="">Choisir une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.id_category} value={cat.id_category}>{cat.name_category}</option>
                    ))}
                  </select>
                </Field>

                {/* Prix + Unité */}
                <Field label="Prix et unité" icon={Coins} error={errors.price}>
                  <div className="flex gap-2">
                    <input
                      type="number" name="price" placeholder="Prix en Ariary"
                      value={form.price} onChange={handleChange} min={0} step={100}
                      className={`${inputCls} flex-1`}
                    />
                    <select name="unit" value={form.unit} onChange={handleChange}
                      className={`${selectCls} w-32 shrink-0`}>
                      {units.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </Field>

                <Field label="Stock disponible" icon={Archive} error={errors.stock}>
                  <input type="number" name="stock"
                    placeholder={`Quantité disponible (${form.unit}${form.unit === "pièce" ? "s" : ""})`}
                    value={form.stock} onChange={handleChange} min={1} className={inputCls} />
                </Field>

                <Field label="Date Limite de Consommation" icon={CalendarDays} error={errors.expiryDate}>
                  <input type="date" name="expiryDate"
                    value={form.expiryDate} onChange={handleChange} className={inputCls} />
                </Field>

                <Field label="Quartier" icon={Home} error={errors.quartier}>
                  <input type="text" name="quartier" placeholder="Ex: Ivandry"
                    value={form.quartier} onChange={handleChange} className={inputCls} />
                </Field>

                <Field label="Adresse exacte" icon={MapPin} error={errors.address}>
                  <input type="text" name="address" placeholder="Ex: II J 161 R Ambodivoanjo"
                    value={form.address} onChange={handleChange} className={inputCls} />
                </Field>

                <Field label="Heure limite de récupération" icon={Clock} error={errors.pickupTime}>
                  <input type="time" name="pickupTime"
                    value={form.pickupTime} onChange={handleChange} className={inputCls} />
                </Field>
              </div>

              {/* ── Colonne droite : image ── */}
              <div className="flex-1 flex flex-col items-center gap-4">
                <p className="text-sm font-medium text-gray-700 self-start flex items-center gap-1.5">
                  <ImagePlus size={14} className="text-gray-400" /> Photo du produit
                </p>

                {/* Zone d'upload */}
                <div
                  className={`w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-200 cursor-pointer ${
                    dragOver
                      ? "border-primaryGreen bg-primaryGreen/5"
                      : "border-gray-200 bg-gray-50 hover:border-primaryGreen/40 hover:bg-primaryGreen/3"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFileChange(e.dataTransfer.files[0] ?? null);
                  }}
                  onClick={() => document.getElementById("imageUpload")?.click()}
                >
                  {form.image ? (
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="aperçu"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-center px-6">
                      <div className="w-14 h-14 rounded-2xl bg-gray-200 flex items-center justify-center">
                        <ImagePlus size={24} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400 font-contenu leading-snug">
                        Glissez une image ici<br />ou cliquez pour parcourir
                      </p>
                      <p className="text-xs text-gray-300">PNG, JPG jusqu'à 10 Mo</p>
                    </div>
                  )}
                </div>

                <input
                  type="file" accept="image/*" id="imageUpload" className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                />

                {form.image && (
                  <div className="flex items-center justify-between w-full bg-primaryGreen/8 rounded-xl px-4 py-2.5">
                    <p className="text-xs text-primaryGreen font-medium truncate">{form.image.name}</p>
                    <button
                      onClick={() => setForm((f) => ({ ...f, image: null }))}
                      className="text-primaryGreen/60 hover:text-primaryGreen ml-2 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Aide contextuelle */}
                <div className="w-full bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-xs text-amber-700 font-contenu leading-relaxed">
                    <strong>Astuce :</strong> Une belle photo augmente significativement vos chances de partage !
                    Privilégiez une bonne luminosité et un fond neutre.
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton publier */}
            <div className="flex justify-center mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl text-white font-semibold text-base shadow-lg shadow-primaryGreen/25 hover:shadow-xl hover:shadow-primaryGreen/30 hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #1a4a2e, #2E6F40)" }}
              >
                <Send size={18} />
                Publier maintenant
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PublishProductForm;
