// src/validators/product.validator.ts
import { z } from 'zod';

// Valida los campos requeridos para crear o actualizar un producto
export const productSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  price: z.number().positive({ message: "El precio debe ser mayor a cero" }),
});