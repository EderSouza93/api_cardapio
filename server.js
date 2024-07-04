const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const port = 3000;

// String de conexão MongoDB com Atlas
const mongoUri = 'mongodb+srv://ederdev93:5iEa2LQtVMD64PJ@api-cardapio.h5tsjsx.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Api-cardapio';

// Conectar ao MongoDB Atlas 
mongoose.connect(mongoUri)
    .then(() => console.log('Aplicação conectada ao Banco de dados'))
    .catch(err => console.error('Erro ao conectar ao Banco de dados', err))

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(bodyParser.json({limit: '1mb'}));

// Schema dos pedidos 
const orderSchema = new mongoose.Schema({
    items: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    mesa: String,
    timestamp: { type: Date, default: Date.now}
});

const Order = mongoose.model('Order', orderSchema, 'orders');

app.post('/api/orders', async (req, res) => {
    try{
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
        console.log('Pedido salvo no Banco de Dados:', order)
    } catch (err) {
        console.error('Erro ao salvar o pedido:', err);
        res.status(500).send({ message: 'Erro ao salvar o pedido' });
    }

    if (Object.keys(req.body).length === 0){
        console.error('Erro: Corpo da requisição vazio');
        return res.status(400).send('Corpo da requisição vazio')
    }
    
    const order = req.body;
    console.log('Pedido recebido:', order);
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err) {
        console.error('Erro ao obter os pedidos:', err);
        res.status(500).send({ message: 'Erro ao obter os pedidos'});
    }
    
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})