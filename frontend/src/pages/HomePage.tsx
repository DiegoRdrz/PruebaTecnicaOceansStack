// src/pages/HomePage.tsx
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  // Obtiene el usuario autenticado desde el contexto
  const { user } = useAuth();

  return (
    <div className="pt-20 p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a OceansRestaurant</h1>

      {/* Mensaje para usuarios no autenticados */}
      {!user && (
        <p className="text-lg text-gray-700">
          Por favor inicia sesión para comenzar a gestionar órdenes o ver el menú.
        </p>
      )}

      {/* Mensaje personalizado para administradores */}
      {user?.role === 'ADMIN' && (
        <div className="mt-6 text-lg text-green-700 font-semibold">
          Tienes acceso al panel de administrador para gestionar productos, usuarios y órdenes.
        </div>
      )}

      {/* Mensaje personalizado para meseros */}
      {user?.role === 'WAITER' && (
        <div className="mt-6 text-lg text-blue-700 font-semibold">
          Puedes visualizar el menú y registrar nuevas órdenes desde el panel de mesero.
        </div>
      )}
    </div>
  );
};

export default HomePage;
