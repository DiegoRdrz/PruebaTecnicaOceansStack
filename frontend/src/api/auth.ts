// src/api/auth.ts
import axiosInstance from './axiosInstance';

// Interfaz que define la estructura esperada para los datos de login
interface LoginData {
  email: string;
  password: string;
}

// Interfaz que define la estructura para los datos de registro
interface RegisterData {
  name: string;
  email: string;
  role: string; // El rol puede ser 'ADMIN' o 'WAITER'
  password: string;
}

// Función que envía datos de login al backend y retorna la respuesta con token y usuario
export const loginApi = async (data: LoginData) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data; // Se espera { token: string, user: {...} }
};

// Función que envía datos de registro al backend y retorna la respuesta
export const registerApi = async (data: RegisterData) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};
