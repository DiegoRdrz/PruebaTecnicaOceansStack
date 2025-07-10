import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validators/loginSchema';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('');
    try {
      await login(data.email, data.password);
      navigate('/'); // Redirige a home u órdenes
    } catch (error: any) {
      setErrorMessage('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

        <div className="mb-4">
          <label className="block mb-1">Correo electrónico</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
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
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
