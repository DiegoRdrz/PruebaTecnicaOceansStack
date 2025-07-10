// controllers/order.controller.ts
import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { orderSchema } from '../validators/order.validator';
import { z } from 'zod';

export const createOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    const { items } = orderSchema.parse(req.body);

    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true }
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Algún producto no existe o está inactivo' });
    }

    const total = items.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId)!;
      return acc + product.price * item.quantity;
    }, 0);

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

export const getAllOrders = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    const whereCondition =
      user.role === 'WAITER'
        ? { userId: user.id }
        : {}; // ADMIN ve todas

    const orders = await prisma.order.findMany({
      where: whereCondition,
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
