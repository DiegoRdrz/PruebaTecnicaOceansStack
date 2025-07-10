// src/api/auth.ts
import axiosInstance from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  role: string; // Role can be ADMIN or WAITER
  password: string;
}

export const loginApi = async (data: LoginData) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data; // { token: string, user: {...} }
};

export const registerApi = async (data: RegisterData) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};
