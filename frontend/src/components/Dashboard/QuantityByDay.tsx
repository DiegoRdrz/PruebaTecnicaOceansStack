// src/components/Dashboard/QuantityByDay.tsx

import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type ChartDataItem = {
  date: string;
  [workerName: string]: number | string; // "date" y nombres dinámicos de trabajadores
};

// Componente que muestra un gráfico de líneas con cantidad vendida por día,
// desglosado por trabajador (series dinámicas según los datos recibidos)
const QuantityByDay = () => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workerNames, setWorkerNames] = useState<string[]>([]);

  // Obtiene los datos desde la API al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<ChartDataItem[]>('/analytics/quantity-by-day');
        setData(res.data);

        // Extrae los nombres de los trabajadores (claves menos "date") para graficar
        if (res.data.length > 0) {
          const keys = Object.keys(res.data[0]).filter(k => k !== 'date');
          setWorkerNames(keys);
        }

      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Estados de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (data.length === 0) return <p>No hay datos para mostrar</p>;

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'
  ];

  // Renderiza el gráfico responsivo con líneas para cada trabajador
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        {workerNames.map((name, idx) => (
          <Line
            key={name}
            type="monotone"
            dataKey={name}
            stroke={colors[idx % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default QuantityByDay;
