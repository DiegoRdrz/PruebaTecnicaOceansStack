// src/validators/order.validator.ts
import { z } from 'zod';

// Valida que una orden contenga al menos un producto con ID y cantidad válidos
export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ).nonempty(),
});
