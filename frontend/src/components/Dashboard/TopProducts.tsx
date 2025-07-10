import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

type TopProduct = {
  productId: number;
  name: string;
  quantity: number;
};

const TopProducts = () => {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (products.length === 0) return <p>No hay datos para mostrar</p>;

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
