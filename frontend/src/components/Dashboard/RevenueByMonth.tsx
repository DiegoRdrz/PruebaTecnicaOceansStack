import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type RevenueData = {
  name: string; 
  total: number;
};

// Componente que muestra un gráfico de barras con las ganancias por mes
const RevenueByMonth = () => {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga los datos de ganancias al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<RevenueData[]>('/analytics/revenue-by-month');
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

  // Estados de carga, error y datos vacíos
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (data.length === 0) return <p>No hay datos para mostrar</p>;

  // Renderiza gráfico de barras responsivo con ganancias formateadas
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Bar dataKey="total" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueByMonth;
