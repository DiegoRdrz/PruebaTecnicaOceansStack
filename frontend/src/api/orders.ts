import axios from './axiosInstance';
import type { Order, OrderCreateInput } from '../types/order';

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get('/orders');
  return response.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await axios.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (data: OrderCreateInput): Promise<Order> => {
    const response = await axios.post('/orders', data);
    return response.data;
  };

export const updateOrder = async (id: number, data: Partial<Order>): Promise<Order> => {
  const response = await axios.put(`/orders/${id}`, data);
  return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(`/orders/${id}`);
};
