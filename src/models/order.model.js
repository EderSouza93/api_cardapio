const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    orderType: {
        type: String,
        enum: ['delivery', 'mesa'],
        required: true
    },
    mesa: String,
    enderecoEntrega: {
        rua: String,
        numero: String,
        complemento: String,
        bairro: String,
        cidade: String,
        cep: String
    },
    status: {
        type: String,
        enum: ['pendente', 'preparando', 'pronto', 'entregue'],
        default: 'pendente'
    },
    timestamp: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);