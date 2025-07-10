import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import type { ProductCreateInput } from '../api/products';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../api/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Error al obtener productos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (input: ProductCreateInput) => {
    try {
      const newProduct = await createProduct(input);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      setError('Error al crear producto');
    }
  };

  const handleUpdate = async (id: number, input: Partial<ProductCreateInput>) => {
    try {
      const updated = await updateProduct(id, input);
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
    } catch (err) {
      setError('Error al actualizar producto');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar producto');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct: handleCreate,
    updateProduct: handleUpdate,
    deleteProduct: handleDelete
  };
};
