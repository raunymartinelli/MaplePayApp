const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const secretKey = process.env.JWT_SECRET; // You should store your key in an environment variable

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

// Helper function to generate a JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Helper function to hash a password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Helper function to verify a password
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    authenticateJWT,
    generateToken,
    hashPassword,
    verifyPassword
};
