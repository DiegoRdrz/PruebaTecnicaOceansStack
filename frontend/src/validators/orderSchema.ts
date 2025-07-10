// src/validators/orderSchema.ts
import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.number().min(1, 'Debe seleccionar un producto'),
  quantity: z.number().min(1, 'Cantidad mínima es 1'),
});

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Debe agregar al menos un producto'),
});
