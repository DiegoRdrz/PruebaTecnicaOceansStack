// src/components/Dashboard/QuantityByMonth.tsx

import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type QuantityData = {
  name: string; 
  count: number; 
};

// Componente que muestra un gráfico de barras con cantidad vendida por mes
const QuantityByMonth = () => {
  const [data, setData] = useState<QuantityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtiene datos de la API al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<QuantityData[]>('/analytics/quantity-by-month');
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Estados para carga, error o datos vacíos
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (data.length === 0) return <p>No hay datos para mostrar</p>;

  // Renderiza gráfico de barras responsivo con cantidad por mes
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default QuantityByMonth;
