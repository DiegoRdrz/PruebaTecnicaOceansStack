import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  role: z.enum(['ADMIN', 'WAITER'], {
    errorMap: () => ({ message: 'El rol debe ser ADMIN o WAITER' }),
  }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
