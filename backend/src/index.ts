import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import authRoutes from './routes/auth.routes';
import analyticsRoutes from './routes/analytics.routes';
import { swaggerUi, swaggerSpec } from './swagger';

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware JSON
app.use(express.json());

// Rutas API
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Docs en http://localhost:${PORT}/api/docs`);
});
