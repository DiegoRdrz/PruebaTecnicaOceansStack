import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  price: z.number().positive({ message: "El precio debe ser mayor a cero" }),
});