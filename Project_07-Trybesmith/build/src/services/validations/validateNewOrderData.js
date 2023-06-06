"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateNewOrder = async (userId, productIds) => {
    if (typeof userId !== 'number')
        return '"userId" must be a number';
    if (typeof productIds === 'string')
        return '"productIds" must be an array';
    if (productIds.length === 0)
        return '"productIds" must include only numbers';
    return null;
};
exports.default = validateNewOrder;
