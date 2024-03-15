const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1y',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'secretJWT';

const createToken = (data) => jwt.sign({ data }, secret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, verifyToken };
