import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { orderSchema } from '../validators/order.validator';
import { z } from 'zod';

export const createOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    // Validar input con Zod
    const { items } = orderSchema.parse(req.body);

    // Obtener productos activos que coincidan
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true }
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Algún producto no existe o está inactivo' });
    }

    // Calcular total
    const total = items.reduce((acc, item) => {
      const product = products.find((p: { id: number; price: number }) => p.id === item.productId)!;
      return acc + product.price * item.quantity;
    }, 0);

    // Crear orden y sus items
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    res.status(201).json(order);

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: 'Error al crear orden' });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener órdenes' });
  }
};
