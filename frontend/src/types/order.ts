// src/types/order.ts
import type { Product } from './product';
import type { User } from './user';

// Producto dentro de una orden con cantidad
export interface OrderProduct {
  id: number;
  product: Product;
  productId: number;
  quantity: number;
}

// Orden con usuario, fecha, total e items
export interface Order {
  id: number;
  createdAt: string;
  total: number;
  userId: number;
  user: User;
  items: OrderProduct[];
}

// Datos para crear una orden
export interface OrderCreateInput {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
  total: number;
}
