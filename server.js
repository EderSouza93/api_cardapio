require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database.js');
const orderRoutes = require('./src/routes/order.routes.js');
const authRoutes = require('./src/routes/auth.routes.js')
const errorHandler = require('./src/utils/errorHandler.js');
const corsOptions = require('./src/config/cors.js')

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});