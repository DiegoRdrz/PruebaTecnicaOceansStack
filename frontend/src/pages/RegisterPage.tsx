import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validators/registerSchema';
import { z } from 'zod';
import { registerApi } from '../api/auth';
import type { RegisterData } from '../types/user';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RegisterPage = () => {
  // Obtener usuario y estado de autenticación del contexto
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  // Configurar react-hook-form con validación usando zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  // Redirigir a home si no está autenticado o no es admin
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      navigate('/');
    }
  }, [isAuthenticated, user]);

  // Enviar datos para registrar usuario
  const onSubmit = async (data: RegisterData) => {
    try {
      await registerApi(data);
      navigate('/'); // Redirige tras registro exitoso
    } catch (error) {
      setServerError('Error al registrar el usuario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registrar Usuario</h1>

        {serverError && <p className="text-red-500 mb-4 text-center">{serverError}</p>}

        <div className="mb-4">
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Correo electrónico</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Rol</label>
          <select
            {...register('role')}
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
          >
            <option value="WAITER">Mesero</option>
            <option value="ADMIN">Administrador</option>
          </select>
          {errors.role && (
            <p className="text-red-400 text-sm">{errors.role.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
        >
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
