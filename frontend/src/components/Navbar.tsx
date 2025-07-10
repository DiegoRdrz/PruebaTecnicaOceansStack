// src/components/Navbar.tsx

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';

// Barra de navegación que muestra enlaces y opciones según el rol del usuario
export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Cierra sesión y redirige al inicio
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow">
      <div className="flex items-center gap-6">
        {/* Logo y enlaces comunes */}
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-300">
          OceansRestaurant
        </Link>
        <Link to="/" className="hover:underline text-sm font-medium text-white hover:text-gray-300">
          Inicio
        </Link>

        {/* Enlace a dashboard solo para admins */}
        {user?.role === 'ADMIN' && (
          <Link to="/dashboard" className="hover:underline text-sm font-medium text-white hover:text-gray-300">
            Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Saludo con nombre del usuario */}
            <span className="text-sm text-gray-300">Hola, {user.name}</span>

            {/* Menú específico para admin */}
            {user.role === 'ADMIN' && (
              <>
                <Link to="/products" className="hover:underline text-sm hover:text-gray-300">
                  Productos
                </Link>
                <Link to="/orders" className="hover:underline text-sm hover:text-gray-300">
                  Órdenes
                </Link>
                <Link to="/register" className="hover:underline text-sm hover:text-gray-300">
                  Registrar Usuario
                </Link>
              </>
            )}

            {/* Menú específico para meseros */}
            {user.role === 'WAITER' && (
              <>
                <Link to="/orders" className="hover:underline text-sm hover:text-gray-300">
                  Órdenes
                </Link>
                <Link to="/products" className="hover:underline text-sm hover:text-gray-300">
                  Ver Menú
                </Link>
              </>
            )}

            {/* Botón para cerrar sesión */}
            <Button onClick={handleLogout}>Cerrar sesión</Button>
          </>
        ) : (
          // Enlace para usuarios no autenticados
          <Link to="/login" className="hover:underline text-sm hover:text-gray-300">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};
