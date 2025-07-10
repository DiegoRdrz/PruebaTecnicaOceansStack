// controllers/product.controller.ts

import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { productSchema } from '../validators/product.validator';
import { z } from 'zod';

// Devuelve todos los productos activos
export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { isActive: true }
  });
  res.json(products);
};

// Crea un nuevo producto (solo para usuarios con rol ADMIN)
export const createProduct = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== 'ADMIN') return res.status(403).json({ message: 'Solo admins pueden crear productos' });

  try {
    // Valida los datos recibidos con Zod
    const data = productSchema.parse(req.body);

    // Crea el producto en la base de datos
    const product = await prisma.product.create({
      data
    });

    res.status(201).json(product);

  } catch (err) {
    // Captura errores de validación
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Edita un producto existente (solo para ADMIN)
export const updateProduct = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== 'ADMIN') return res.status(403).json({ message: 'Solo admins pueden editar productos' });

  try {
    const { id } = req.params;
    const data = productSchema.parse(req.body);

    // Actualiza el producto con los nuevos datos
    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data
    });

    res.json(updated);

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Desactiva un producto (eliminación lógica)
export const deleteProduct = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== 'ADMIN') return res.status(403).json({ message: 'Solo admins pueden eliminar productos' });

  const { id } = req.params;

  try {
    // Se marca como inactivo en lugar de eliminar físicamente
    const deleted = await prisma.product.update({
      where: { id: Number(id) },
      data: { isActive: false }
    });

    res.json({ message: 'Producto desactivado', product: deleted });
  } catch {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
