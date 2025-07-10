// src/components/ProductCard.tsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { Product } from '../types/product';
import { Button } from './Button';

interface Props {
  product: Product;
  onDelete: () => void;
}

export const ProductCard = ({ product, onDelete }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 text-lg">${product.price.toFixed(2)}</p>
      </div>
      {user?.role === 'ADMIN' && (
        <Button onClick={onDelete} variant="danger" className="mt-4">
          Eliminar
        </Button>
      )}
    </div>
  );
};
