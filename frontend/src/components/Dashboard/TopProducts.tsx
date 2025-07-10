// src/components/Dashboard/TopProducts.tsx

import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

type TopProduct = {
  productId: number;
  name: string;
  quantity: number;
};

// Componente que muestra una lista de los productos más vendidos
const TopProducts = () => {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtiene los productos top desde la API al montar el componente
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await axios.get<TopProduct[]>('/analytics/top-products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  // Renderizado condicional por carga, error o datos vacíos
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (products.length === 0) return <p>No hay datos para mostrar</p>;

  // Lista simple con nombre y cantidad vendida de cada producto
  return (
    <div>
      <ul className="list-disc pl-5">
        {products.map(product => (
          <li key={product.productId} className="mb-2">
            <strong>{product.name}</strong> — {product.quantity} vendidos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
