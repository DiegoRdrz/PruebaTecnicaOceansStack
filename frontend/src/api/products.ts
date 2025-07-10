// src/api/products.ts

import axios from './axiosInstance';
import type { Product } from '../types/product';

// Obtiene todos los productos disponibles
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('/products');
  return response.data;
};

// Obtiene un producto específico por su ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`/products/${id}`);
  return response.data;
};

// Interfaz para la creación de un nuevo producto
export interface ProductCreateInput {
  name: string;
  price: number;
  isActive?: boolean;
}

// Crea un nuevo producto con los datos proporcionados
export const createProduct = async (data: ProductCreateInput): Promise<Product> => {
  const response = await axios.post<Product>('/products', data);
  return response.data;
};

// Actualiza parcialmente un producto por su ID
export const updateProduct = async (
  id: number,
  data: Partial<ProductCreateInput>
): Promise<Product> => {
  const response = await axios.put<Product>(`/products/${id}`, data);
  return response.data;
};

// Elimina un producto por su ID
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`/products/${id}`);
};
