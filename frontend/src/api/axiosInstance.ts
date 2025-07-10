// src/api/axiosInstance.ts

// Se crea una instancia de Axios con la baseURL configurada.
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor que añade el token de autorización (si existe) a cada solicitud
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
