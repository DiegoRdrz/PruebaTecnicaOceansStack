//src/pages/LoginPage.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validators/loginSchema';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Define el tipo del formulario usando el esquema de validación
type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth(); // Función para iniciar sesión desde el contexto
  const navigate = useNavigate(); // Hook para redirigir después de login
  const [errorMessage, setErrorMessage] = useState('');

  // Configura el formulario con validación Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Maneja el envío del formulario
  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('');
    try {
      await login(data.email, data.password);
      navigate('/'); // Redirige al home si el login es exitoso
    } catch (error: any) {
      setErrorMessage('Credenciales incorrectas'); // Muestra error si falla
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

        {/* Muestra mensaje de error si las credenciales son incorrectas */}
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

        {/* Campo de email */}
        <div className="mb-4">
          <label className="block mb-1">Correo electrónico</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        {/* Campo de contraseña */}
        <div className="mb-6">
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
