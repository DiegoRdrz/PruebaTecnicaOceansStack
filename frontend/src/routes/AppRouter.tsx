import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import OrdersPage from '../pages/OrdersPage';
import RegisterPage from '../pages/RegisterPage';
import { useAuth } from '../hooks/useAuth';

const AppRouter = () => {
  // Obtener estado de autenticación y usuario actual
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta pública: página de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas: solo accesibles si está autenticado */}
        <Route
          path="/products"
          element={
            isAuthenticated ? <ProductsPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/orders"
          element={
            isAuthenticated ? <OrdersPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Ruta protegida solo para administradores */}
        <Route
          path="/register"
          element={
            isAuthenticated && user?.role === 'ADMIN' ? (
              <RegisterPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Redirección para cualquier ruta no definida */}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
