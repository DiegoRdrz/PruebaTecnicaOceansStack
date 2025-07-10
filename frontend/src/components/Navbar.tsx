import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow">
      {/* IZQUIERDA: Logo + Inicio + Dashboard */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-300">
          OceansRestaurant
        </Link>
        <Link to="/" className="hover:underline text-sm font-medium text-white hover:text-gray-300">
          Inicio
        </Link>
        {user?.role === 'ADMIN' && (
          <Link to="/dashboard" className="hover:underline text-sm font-medium text-white hover:text-gray-300">
            Dashboard
          </Link>
        )}
      </div>

      {/* DERECHA: Enlaces por rol + logout/login */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">Hola, {user.name}</span>

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

            <Button onClick={handleLogout}>Cerrar sesión</Button>
          </>
        ) : (
          <Link to="/login" className="hover:underline text-sm hover:text-gray-300">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};
