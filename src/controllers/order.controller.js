const Order = require('../models/order.model.js');

exports.createOrder = async (req, res, next) => {
    try {
        const { orderType, mesa, enderecoEntrega, status, ...orderData } = req.body;

        // Validação do tipo de pedido
        if (!orderType || !['delivery', 'mesa'].includes(orderType)) {
            throw new Error('Tipo de pedido inválido. Deve ser "delivery" ou "mesa".')
        }

        // Validação de status
        const validStatus = ['pendente', 'preparando', 'pronto', 'entregue'];
        if (req.body.status && !validStatus.includes(req.body.status)) {
            throw new Error(`Status inválido. Valores permitidos: ${validStatus.join(',')}`);
        }

        let orderDetails = {
            ...orderData,
            orderType,
            status: status || 'pendente' 
        };

        if (orderType === 'mesa') {
            if (!mesa) {
                throw new Error('Número da mesa é obrigatório para pedidos na mesa.');
            }
            orderDetails.mesa = mesa;
        } else if (orderType === 'delivery') {
            if (!enderecoEntrega || !enderecoEntrega.rua || !enderecoEntrega.numero) {
                throw new Error('Endereço de entrega é obrigatório para pedidos de delivery.');
            }
            orderDetails.enderecoEntrega = enderecoEntrega;
        }
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const { orderType, status } = req.query;
        let query = {};
        if (orderType) {
            query.orderType = orderType;
        }
        if (status) {
            query.status = status;
        }
        const orders = await Order.find(query);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getOrdersStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).select('status');
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.json({ status: order.status });
    } catch (error) {
        next(error);
    }
};

// Método para atualizar o status de um pedido 
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ['pendente', 'preparando', 'pronto', 'entregue'];
        if (!validStatus.includes(status)) {
            throw new Error(`Status inválido. Valores permitidos: ${validStatus.join(',')}`);
        }

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            throw new Error('Pedido não encontrado');
        }

        res.json(order);
    } catch (error) {
        next(error);
    }
};