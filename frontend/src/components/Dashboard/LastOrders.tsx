// src/components/Dashboard/LastOrders.tsx

import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

// Tipos para modelar productos, items de orden y ordenes completas
type Product = {
  name: string;
  price: number;
};

type OrderItem = {
  product: Product;
  quantity: number;
};

type Order = {
  id: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  total: number;
  items: OrderItem[];
};

// Componente que muestra las últimas 5 órdenes en un dashboard
const LastOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Al montar el componente, se realiza la petición para obtener las órdenes recientes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get<Order[]>('/analytics/last-orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar las órdenes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Renderizado condicional según estado de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (orders.length === 0) return <p>No hay órdenes recientes</p>;

  // Renderiza la lista de órdenes con detalles básicos y sus items
  return (
    <div className="overflow-auto max-h-[300px]">
      <ul className="divide-y divide-gray-200">
        {orders.map(order => (
          <li key={order.id} className="p-4">
            <div className="font-semibold">
              Orden #{order.id} - Total: ${order.total.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">
              Fecha: {new Date(order.createdAt).toLocaleString()} - Atendida por: {order.user.name}
            </div>
            <ul className="mt-2 list-disc list-inside">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.product.name} x {item.quantity} (${(item.product.price * item.quantity).toFixed(2)})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastOrders;
