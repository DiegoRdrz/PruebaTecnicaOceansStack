import { Router } from 'express';
import {
  getQuantityByMonth,
  getRevenueByMonth,
  getTopProducts,
  getQuantityByDay,
  getLastOrders
} from '../controllers/analytics.controller';

import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Endpoints de análisis y estadísticas
 */

/**
 * @swagger
 * /analytics/quantity-by-month:
 *   get:
 *     summary: Obtener cantidad de órdenes por mes
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cantidades por mes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *       401:
 *         description: No autorizado
 */
router.get('/quantity-by-month', authenticate, authorize(['ADMIN']), getQuantityByMonth);

/**
 * @swagger
 * /analytics/revenue-by-month:
 *   get:
 *     summary: Obtener ingresos por mes
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ingresos por mes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   revenue:
 *                     type: number
 *       401:
 *         description: No autorizado
 */
router.get('/revenue-by-month', authenticate, authorize(['ADMIN']), getRevenueByMonth);

/**
 * @swagger
 * /analytics/top-products:
 *   get:
 *     summary: Obtener productos más vendidos
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product:
 *                     type: string
 *                   sales:
 *                     type: integer
 *       401:
 *         description: No autorizado
 */
router.get('/top-products', authenticate, authorize(['ADMIN']), getTopProducts);

/**
 * @swagger
 * /analytics/quantity-by-day:
 *   get:
 *     summary: Obtener cantidad de órdenes por día
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cantidades por día
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *       401:
 *         description: No autorizado
 */
router.get('/quantity-by-day', authenticate, authorize(['ADMIN']), getQuantityByDay);

/**
 * @swagger
 * /analytics/last-orders:
 *   get:
 *     summary: Obtener últimas órdenes registradas
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Últimas órdenes realizadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                   date:
 *                     type: string
 *                   total:
 *                     type: number
 *       401:
 *         description: No autorizado
 */
router.get('/last-orders', authenticate, authorize(['ADMIN']), getLastOrders);

export default router;
