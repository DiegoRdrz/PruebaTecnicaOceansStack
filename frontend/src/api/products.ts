import axios from './axiosInstance';
import type { Product } from '../types/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`/products/${id}`);
  return response.data;
};

export interface ProductCreateInput {
  name: string;
  price: number;
  isActive?: boolean;
}

export const createProduct = async (data: ProductCreateInput): Promise<Product> => {
  const response = await axios.post<Product>('/products', data);
  return response.data;
};

export const updateProduct = async (
  id: number,
  data: Partial<ProductCreateInput>
): Promise<Product> => {
  const response = await axios.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`/products/${id}`);
};
