import { Router } from 'express';
import { getQuantityByMonth, getRevenueByMonth, getTopProducts, getQuantityByDay, getLastOrders } from '../controllers/analytics.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { get } from 'http';

const router = Router();

router.get('/quantity-by-month', authenticate, authorize(['ADMIN']), getQuantityByMonth);
router.get('/revenue-by-month', authenticate, authorize(['ADMIN']), getRevenueByMonth); 
router.get('/top-products', authenticate, authorize(['ADMIN']), getTopProducts);
router.get('/quantity-by-day', authenticate, authorize(['ADMIN']), getQuantityByDay);
router.get('/last-orders', authenticate, authorize(['ADMIN']), getLastOrders);

export default router;