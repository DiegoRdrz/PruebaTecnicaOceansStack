import type { Product } from './product';
import type { User } from './user';

export interface OrderProduct {
  id: number;
  product: Product;
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  createdAt: string;
  total: number;
  userId: number;
  user: User;
  items: OrderProduct[];
}

export interface OrderCreateInput {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
  total: number;
}
