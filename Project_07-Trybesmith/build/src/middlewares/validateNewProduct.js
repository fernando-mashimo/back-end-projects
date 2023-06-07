"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateNewProduct = (req, res, next) => {
    const { name, price } = req.body;
    if (!name)
        return res.status(400).json({ message: '"name" is required' });
    if (!price)
        return res.status(400).json({ message: '"price" is required' });
    return next();
};
exports.default = validateNewProduct;
