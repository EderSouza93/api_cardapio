const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    const hash = req.headers['token-hash'];

    if (!token || !hash) {
        return res.status(401).send({ message: 'Access denied. No token or hash provided.' });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    if (tokenHash !== hash) {
        return res.status(400).send({ message: 'Invalid token hash' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;