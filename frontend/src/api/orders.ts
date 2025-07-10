// src/api/orders.ts
import axios from './axiosInstance';
import type { Order, OrderCreateInput } from '../types/order';

// Obtiene todas las órdenes desde la API
export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get('/orders');
  return response.data;
};

// Obtiene una orden específica por su ID
export const getOrderById = async (id: number): Promise<Order> => {
  const response = await axios.get(`/orders/${id}`);
  return response.data;
};

// Crea una nueva orden con los datos proporcionados
export const createOrder = async (data: OrderCreateInput): Promise<Order> => {
  const response = await axios.post('/orders', data);
  return response.data;
};

// Actualiza parcialmente una orden existente por su ID
export const updateOrder = async (id: number, data: Partial<Order>): Promise<Order> => {
  const response = await axios.put(`/orders/${id}`, data);
  return response.data;
};

// Elimina una orden por su ID
export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(`/orders/${id}`);
};
