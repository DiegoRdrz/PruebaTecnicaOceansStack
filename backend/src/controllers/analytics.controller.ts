import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { subMonths, startOfDay, endOfDay, eachDayOfInterval, format } from 'date-fns';

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

    // Contar número de órdenes por usuario
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

export const getTopProducts = async (req: Request, res: Response) => {
  try {
    // Paso 1: agrupar orderProduct por productId y sumar cantidades
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

    // Paso 2: obtener productos por sus IDs
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    // Paso 3: unir datos para respuesta
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

export const getQuantityByDay = async (req: Request, res: Response) => {
  try {
    // Rango de fechas: último mes hasta hoy
    const endDate = new Date();
    const startDate = subMonths(endDate, 1);

    // Obtener todos los días en el rango para tener el eje X completo
    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });

    // Obtener todas las órdenes del último mes con usuario
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

    // Obtener lista única de usuarios que tuvieron órdenes
    const users = Array.from(new Map(orders.map(o => [o.user.id, o.user])).values());

    // Inicializar estructura para contar órdenes por usuario y día
    // Ejemplo: { 'Juan': { '2023-06-01': 0, '2023-06-02': 0, ... }, 'Maria': { ... } }
    const dataByUser: Record<string, Record<string, number>> = {};
    users.forEach(user => {
      dataByUser[user.name] = {};
      daysArray.forEach(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        dataByUser[user.name][dayStr] = 0;
      });
    });

    // Contar las órdenes por usuario y fecha (día)
    orders.forEach(order => {
      const userName = order.user.name;
      const dayStr = format(order.createdAt, 'yyyy-MM-dd');
      if (dataByUser[userName] && dayStr in dataByUser[userName]) {
        dataByUser[userName][dayStr]++;
      }
    });

    // Transformar a formato para gráfica: array de objetos, cada objeto es un día con propiedades usuario1, usuario2, etc.
    // Ejemplo: [{ date: '2023-06-01', Juan: 3, Maria: 1 }, { date: '2023-06-02', Juan: 0, Maria: 4 }, ...]
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
