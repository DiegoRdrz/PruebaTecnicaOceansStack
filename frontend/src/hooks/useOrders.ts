//src/components/Navbar.tsx

import { useState, useEffect } from 'react';
import type { Order, OrderCreateInput } from '../types/order';
import {
  getOrders,
  createOrder as apiCreateOrder,
  updateOrder,
  deleteOrder,
} from '../api/orders';

// Hook para manejar estado y operaciones CRUD de órdenes
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtiene todas las órdenes desde la API y actualiza estado
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

  // Crea una nueva orden y la agrega al estado local
  const handleCreate = async (orderData: OrderCreateInput) => {
    try {
      const newOrder = await apiCreateOrder(orderData);
      setOrders(prev => [...prev, newOrder]);
    } catch {
      setError('Error al crear orden');
    }
  };

  // Actualiza una orden existente en el estado local
  const handleUpdate = async (id: number, orderData: Partial<Order>) => {
    try {
      const updated = await updateOrder(id, orderData);
      setOrders(prev => prev.map(o => (o.id === id ? updated : o)));
    } catch {
      setError('Error al actualizar orden');
    }
  };

  // Elimina una orden del estado local y la API
  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch {
      setError('Error al eliminar orden');
    }
  };

  // Carga inicial de órdenes al montar el hook
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
