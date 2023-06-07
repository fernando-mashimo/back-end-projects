"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_util_1 = __importDefault(require("../utils/auth.util"));
const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ message: 'Token not found' });
    try {
        const decodedToken = auth_util_1.default.verify(authorization);
        if (decodedToken)
            return next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.default = validateToken;
