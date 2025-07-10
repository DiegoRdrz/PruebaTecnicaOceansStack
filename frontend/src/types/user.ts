export type Role = 'ADMIN' | 'WAITER';

export interface User{
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string; // Date as ISO string
  // NO incluimos password en frontend
}

export interface RegisterData{
  name: string;
  email: string;
  role: Role;
  password: string;
}