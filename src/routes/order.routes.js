const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

// Rotas públicas (para o cardápio)
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.patch('/:id/status', orderController.updateOrderStatus);

// Rotas privadas (para o painel administrativo)
router.use(authMiddleware);
router.get('/', orderController.getAllOrders)
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;