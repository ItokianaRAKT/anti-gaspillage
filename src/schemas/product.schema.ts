import { z } from "zod";
const ProductSchema = z.object({
    id_product : z.string(),
    name_product: z.string(),
    description_product: z.string(),
    price_product: z.number(),
    current_stock: z.number(),
    expiration_date: z.string(),
    recovery_address: z.string(),
    recovery_time_limit: z.string(),
    is_available: z.boolean(),
    category: z.string().nullable(),
    image_product:z.string().nullable().optional(),
})
type Product = z.infer<typeof ProductSchema>;
export {ProductSchema};
export type {Product};