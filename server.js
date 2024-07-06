require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database.js');
const orderRoutes = require('./src/routes/order.routes.js');
const errorHandler = require('./src/utils/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/orders', orderRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});