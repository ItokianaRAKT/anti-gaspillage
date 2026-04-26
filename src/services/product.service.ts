import api from "../api/axios"
import { ProductSchema} from "../schemas/product.schema";
import type { Product } from "../schemas/product.schema";
import { z } from "zod";

const getProduits = async (categoryId?: string, search?: string): Promise<Product[]> => {
    const params: Record<string, string> = {};
    if (categoryId) params.category = categoryId;
    if (search) params.search = search;
    const response = await api.get("/products/", { params });
    const parsed = z.array(ProductSchema).safeParse(response.data);
    if (!parsed.success) {
        console.error("Données invalides :", parsed.error);
        return [];
    }
    return parsed.data;
}

const publierProduit = async (FormData: FormData) =>{
    const response = await api.post("/products/create/", FormData);
    return response.data
};
export { getProduits, publierProduit };
