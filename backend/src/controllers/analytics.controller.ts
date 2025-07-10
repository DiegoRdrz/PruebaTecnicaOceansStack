// src/controllers/analytics.controller.ts
import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { subMonths, startOfDay, endOfDay, eachDayOfInterval, format } from 'date-fns';

// Obtiene la cantidad de órdenes creadas en el último mes, agrupadas por nombre de usuario
export const getQuantityByMonth = async (req: Request, res: Response) => {
  try {
    const startDate = subMonths(new Date(), 1);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate }
      },
      include: {
        user: true
      }
    });

    const orderCounts: Record<string, number> = {};

    orders.forEach(order => {
      const userName = order.user.name;
      orderCounts[userName] = (orderCounts[userName] || 0) + 1;
    });

    const result = Object.entries(orderCounts).map(([name, count]) => ({
      name,
      count
    }));

    res.json(result);

  } catch (error) {
    console.error('Error al obtener cantidad de órdenes:', error);
    res.status(500).json({ message: 'Error al obtener cantidad de órdenes' });
  } 
};

// Calcula los ingresos generados por usuario en el último mes, sumando el total de cada orden
export const getRevenueByMonth = async (req: Request, res: Response) => {
  try {
    const startDate = subMonths(new Date(), 1);

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: startDate } },
      include: { user: true }
    });

    const revenues: Record<string, number> = {};

    orders.forEach(order => {
      const userName = order.user.name;
      revenues[userName] = (revenues[userName] || 0) + order.total;
    });

    const result = Object.entries(revenues).map(([name, total]) => ({
      name,
      total: Number(total.toFixed(2)),
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener ingresos mensuales' });
  }
};

// Retorna los 5 productos más vendidos, ordenados por cantidad total
export const getTopProducts = async (req: Request, res: Response) => {
  try {
    // Agrupa por ID de producto y suma las cantidades vendidas
    const grouped = await prisma.orderProduct.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        }
      },
      take: 5,
    });

    const productIds = grouped.map(g => g.productId);

    // Obtiene los productos correspondientes por sus IDs
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    // Combina la información del producto con la cantidad vendida
    const result = grouped.map(g => {
      const product = products.find(p => p.id === g.productId);
      return {
        productId: g.productId,
        name: product?.name ?? 'Desconocido',
        quantity: g._sum.quantity ?? 0,
      };
    });

    res.json(result);

  } catch (error) {
    console.error('Error obteniendo top 5 productos:', error);
    res.status(500).json({ message: 'Error obteniendo top 5 productos' });
  }
};

// Devuelve la cantidad de órdenes por usuario y por día, durante el último mes
export const getQuantityByDay = async (req: Request, res: Response) => {
  try {
    const endDate = new Date();
    const startDate = subMonths(endDate, 1);

    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        userId: true,
        createdAt: true,
        user: {
          select: { id: true, name: true }
        }
      }
    });

    // Lista de usuarios únicos que hicieron órdenes
    const users = Array.from(new Map(orders.map(o => [o.user.id, o.user])).values());

    // Inicializa una estructura vacía con ceros para cada usuario y día
    const dataByUser: Record<string, Record<string, number>> = {};
    users.forEach(user => {
      dataByUser[user.name] = {};
      daysArray.forEach(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        dataByUser[user.name][dayStr] = 0;
      });
    });

    // Cuenta cuántas órdenes hizo cada usuario en cada día
    orders.forEach(order => {
      const userName = order.user.name;
      const dayStr = format(order.createdAt, 'yyyy-MM-dd');
      if (dataByUser[userName] && dayStr in dataByUser[userName]) {
        dataByUser[userName][dayStr]++;
      }
    });

    // Transforma los datos a un array de objetos para gráficas
    const chartData = daysArray.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const entry: any = { date: dayStr };
      users.forEach(user => {
        entry[user.name] = dataByUser[user.name][dayStr];
      });
      return entry;
    });

    res.json(chartData);

  } catch (error) {
    console.error('Error obteniendo órdenes diarias por trabajador:', error);
    res.status(500).json({ message: 'Error obteniendo datos' });
  }
};

// Devuelve las últimas 5 órdenes creadas, con detalles del usuario y productos incluidos
export const getLastOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true } },
        items: {
          include: { product: { select: { name: true, price: true } } }
        }
      }
    });

    res.json(orders);

  } catch (error) {
    console.error('Error al obtener últimas 5 órdenes:', error);
    res.status(500).json({ message: 'Error al obtener últimas 5 órdenes' });
  }
};
