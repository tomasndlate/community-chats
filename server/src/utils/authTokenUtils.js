const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/Unauthorized.error');

exports.generateAuthToken = (userId) => {
    try {
        const token = jwt.sign({ userId: userId }, process.env.API_JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw error;
    }
}

exports.validateAuthToken = (token) => {
    try {
        const tokenDecoded = jwt.verify(token, process.env.API_JWT_SECRET);
        return tokenDecoded.userId;
    } catch (error) {
        throw new AuthenticationError('Invalid token');
    }
};
