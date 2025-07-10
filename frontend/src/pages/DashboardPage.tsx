// src/pages/DashboardPage.tsx
import { useEffect } from 'react';
import QuantityByMonth from '../components/Dashboard/QuantityByMonth';
import RevenueByMonth from '../components/Dashboard/RevenueByMonth';
import TopProducts from '../components/Dashboard/TopProducts';
import QuantityByDay from '../components/Dashboard/QuantityByDay';
import LastOrders from '../components/Dashboard/LastOrders';

const DashboardPage = () => {
  useEffect(() => {
    // Bloquear scroll vertical mientras se esté en el dashboard
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="h-screen p-4 bg-gray-100 overflow-hidden grid grid-rows-[50%_50%] grid-cols-1 gap-4 mt-16"
    style={{ height: 'calc(100vh - 64px)' }} // 64px es la altura fija del nav, cámbialo si es otra
    >
      
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
          <h2 className="text-xl font-semibold mb-2">Ordenes por trabajador</h2>
          <div className="h-full flex items-center justify-center text-gray-400">
            <QuantityByMonth />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
          <h2 className="text-xl font-semibold mb-2">Ventas por trabajador</h2>
          <div className="h-full flex items-center justify-center text-gray-400">
            <RevenueByMonth />
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
          <h2 className="text-xl font-semibold mb-2">Ventas durante el mes</h2>
          <div className="h-full flex items-center justify-center text-gray-400">
            <QuantityByDay />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
          <h2 className="text-xl font-semibold mb-2">Ultimas ordenes registradas</h2>
          <div className="h-full flex items-center justify-center text-gray-400">
            <LastOrders />
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
          <h2 className="text-xl font-semibold mb-2">Productos mas vendidos</h2>
          <div className="h-full flex items-center justify-center text-gray-400">
            <TopProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
