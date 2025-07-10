import { useState, useEffect } from 'react';
import type { Order, OrderCreateInput } from '../types/order';
import {
  getOrders,
  createOrder as apiCreateOrder,
  updateOrder,
  deleteOrder,
} from '../api/orders';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch {
      setError('Error al obtener órdenes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (orderData: OrderCreateInput) => {
    try {
      const newOrder = await apiCreateOrder(orderData);
      setOrders(prev => [...prev, newOrder]);
    } catch {
      setError('Error al crear orden');
    }
  };

  const handleUpdate = async (id: number, orderData: Partial<Order>) => {
    try {
      const updated = await updateOrder(id, orderData);
      setOrders(prev => prev.map(o => (o.id === id ? updated : o)));
    } catch {
      setError('Error al actualizar orden');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch {
      setError('Error al eliminar orden');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder: handleCreate,
    updateOrder,
    deleteOrder,
  };
};
