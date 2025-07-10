// src/components/AuthProvider.tsx

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../api/auth';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, role: string, password: string) => Promise<void>;
}

// Contexto para manejar autenticación y estado del usuario
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,  // Por defecto no autenticado
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicial desde localStorage para persistencia
  const [user, setUser] = useState<User | null>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const isAuthenticated = !!user; // Booleano simple para estado autenticado

  // Guarda o elimina token y usuario en localStorage al cambiar
  useEffect(() => {
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  // Función para iniciar sesión llamando a la API y actualizando estado
  const login = async (email: string, password: string) => {
    const data = await loginApi({ email, password });
    setToken(data.token);
    setUser(data.user);
  };

  // Función para cerrar sesión y limpiar estado
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Función para registrar nuevo usuario sin iniciar sesión automáticamente
  const register = async (name: string, email: string, role: string, password: string) => {
    await registerApi({ name, email, role ,password });
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
