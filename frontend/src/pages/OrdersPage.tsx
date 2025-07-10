//src/pages/OrdersPage.tsx

import { useOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CreateOrderForm } from '../components/CreateOrderForm';
import type { User } from '../types/user';
import axios from '../api/axiosInstance';
import { Button } from '../components/Button';

// Página principal de gestión de órdenes
const OrdersPage = () => {
  // Hooks personalizados para órdenes y productos
  const { orders, loading, error, fetchOrders, createOrder } = useOrders();
  const { products, fetchProducts } = useProducts();
  const { user } = useContext(AuthContext);

  // Estados locales para usuarios, visibilidad del formulario y control de errores
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Cargar órdenes y productos al iniciar la página
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // Si es ADMIN, cargar usuarios disponibles
  useEffect(() => {
    if (user?.role === 'ADMIN') {
      const fetchUsers = async () => {
        try {
          const res = await axios.get<User[]>('/users');
          setUsers(res.data);
        } catch {
          setUsers([]);
        }
      };
      fetchUsers();
    }
  }, [user]);

  // Función para crear una orden
  const handleCreateOrder = async (data: {
    items: { productId: number; quantity: number }[];
    userId?: number;
  }) => {
    setSubmitting(true);
    setLocalError(null);
  
    // Agrupar productos duplicados
    const groupedItems = Object.values(
      data.items.reduce((acc, item) => {
        if (!acc[item.productId]) {
          acc[item.productId] = { ...item };
        } else {
          acc[item.productId].quantity += item.quantity;
        }
        return acc;
      }, {} as Record<number, { productId: number; quantity: number }>)
    );
  
    // Calcular total de la orden
    const total = groupedItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  
    // Enviar orden al backend
    try {
      const payload = {
        items: groupedItems,
        userId: user?.id ?? 0,
        total,
      };
  
      await createOrder(payload);
      await fetchOrders();
      setShowForm(false);
      window.location.reload();
    } catch (err) {
      console.error('Error creando la orden:', err);
      setLocalError('Error al crear la orden. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Renderizado de la página
  return (
    <div className="p-6 max-w-5xl mx-auto mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Órdenes</h1>
        <div>
          {(user?.role === 'ADMIN' || user?.role === 'WAITER') && (
            <Button
              onClick={() => {
                if (!submitting) setShowForm((prev) => !prev);
              }}
              className="mr-2"
              disabled={submitting}
            >
              {showForm ? 'Cancelar' : 'Nueva orden'}
            </Button>
          )}
          <Button onClick={fetchOrders} disabled={loading || submitting}>
            Refrescar
          </Button>
        </div>
      </div>

      {showForm && (
        <CreateOrderForm products={products} onCreate={handleCreateOrder} />
      )}

      {submitting && <p className="mb-4 font-semibold">Creando orden...</p>}

      {(error || localError) && (
        <p className="text-red-500 mb-4">{error || localError}</p>
      )}

      {!loading && orders.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Fecha</th>
                <th className="border border-gray-300 p-2">Usuario</th>
                <th className="border border-gray-300 p-2">Total</th>
                <th className="border border-gray-300 p-2">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 p-2">{order.id}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">{order.user.name}</td>
                  <td className="border border-gray-300 p-2">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.items.map((item) => (
                      <div key={item.id}>
                        {item.product.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
