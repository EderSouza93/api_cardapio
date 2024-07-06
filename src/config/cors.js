require('dotenv').config();

let allowedOrigins = [];
try{
    const originsConfig = JSON.parse(process.env.ALLOWED_ORIGINS);
    allowedOrigins = originsConfig[process.env.NODE_ENV] || [];
} catch (error) {
    console.error('Erro ao analisar ALLOWED_ORIGINS:', error);
}

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions;