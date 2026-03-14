import { z } from "zod";

/* =========================
   LOGIN
========================= */

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),

  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type LoginInput = z.infer<typeof loginSchema>;


/* =========================
   REGISTER
========================= */

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur est trop court"),

  email: z
    .string()
    .email("Email invalide"),

  password: z
    .string()
    .min(6, "Minimum 6 caractères"),

  first_name: z
    .string()
    .min(2, "Prénom trop court"),

  last_name: z
    .string()
    .min(2, "Nom trop court"),

  phone1: z
    .string()
    .min(8, "Numéro invalide"),

  phone2: z
    .string()
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .min(5, "Adresse trop courte"),
});

export type RegisterInput = z.infer<typeof registerSchema>;