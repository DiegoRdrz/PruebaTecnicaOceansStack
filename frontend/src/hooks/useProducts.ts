//src/hooks/useProducts.ts

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

// Hook personalizado para gestionar productos:
// carga inicial, creación, actualización y eliminación
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtiene todos los productos desde la API y actualiza estado
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

  // Crea un nuevo producto y lo agrega al estado local
  const handleCreate = async (input: ProductCreateInput) => {
    try {
      const newProduct = await createProduct(input);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      setError('Error al crear producto');
    }
  };

  // Actualiza un producto existente en el estado local
  const handleUpdate = async (id: number, input: Partial<ProductCreateInput>) => {
    try {
      const updated = await updateProduct(id, input);
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
    } catch (err) {
      setError('Error al actualizar producto');
    }
  };

  // Elimina un producto del estado local y la API
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar producto');
    }
  };

  // Carga inicial de productos al montar el hook
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
