import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" }) // Ini jauh lebih ampuh
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }), // Sekalian bonus validasi panjang pass
});