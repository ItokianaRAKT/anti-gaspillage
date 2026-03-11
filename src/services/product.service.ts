import api from "../api/axios";
import { ProductSchema} from "../schemas/product.schema";
import type { Product } from "../schemas/product.schema";
import { z } from "zod";

const getProduits = async (): Promise<Product[]> => {
    const response = await api.get("/products/");
    const parsed = z.array(ProductSchema).safeParse(response.data);

    if (!parsed.success){
        console.error("Données invalides :", parsed.error);
        return [];
    }
    return parsed.data;
}

const publierProduit = async (FormData: FormData) =>{
    const response = await api.post("/products/create/", FormData, { 
        headers: {"Content-type": "multipart/form-data"}
    });
    return response.data
};
export { getProduits, publierProduit };
