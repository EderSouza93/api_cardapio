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
router.get('/protected', orderController.getAllOrders)
router.post('/protected', orderController.createOrder);
router.get('/protected', orderController.getOrders);
router.patch('/protected:id/status', orderController.updateOrderStatus);

router.get('/test', authMiddleware, (req, res) => {
    res.send({ message: 'This is a protected route', user: req.user });
});

module.exports = router;