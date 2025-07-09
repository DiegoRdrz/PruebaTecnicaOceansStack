import { z } from 'zod';

export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ).nonempty({ message: "La orden debe contener al menos un producto" }),
});
