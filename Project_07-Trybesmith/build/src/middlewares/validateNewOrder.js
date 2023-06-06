"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateNewOrder = (req, res, next) => {
    const { userId, productIds } = req.body;
    if (!userId)
        return res.status(400).json({ message: '"userId" is required' });
    if (!productIds)
        return res.status(400).json({ message: '"productIds" is required' });
    return next();
};
exports.default = validateNewOrder;
