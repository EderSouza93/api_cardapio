const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(bodyParser.json({limit: '1mb'}));

let orders = [];

app.post('/api/orders', (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    if (Object.keys(req.body).length === 0){
        console.error('Erro: Corpo da requisição vazio');
        return res.status(400).send('Corpo da requisição vazio')
    }
    
    const order = req.body;
    console.log('Pedido recebido:', order);
    orders.push(order);
    console.log('Pedidos salvos:', orders)
    res.status(201).send(order);
});

app.get('/api/orders', (req, res) => {
    res.send(orders);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})