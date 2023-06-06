"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_service_1 = __importDefault(require("../services/orders.service"));
const createOrder = async (req, res) => {
    const { userId, productIds } = req.body;
    const serviceResponse = await orders_service_1.default.createOrder(userId, productIds);
    if (serviceResponse.status === 'INVALID_DATA') {
        return res.status(422).json(serviceResponse.data);
    }
    if (serviceResponse.status === 'NOT_FOUND') {
        return res.status(404).json(serviceResponse.data);
    }
    return res.status(201).json(serviceResponse.data);
};
const getAllOrders = async (_req, res) => {
    const serviceResponse = await orders_service_1.default.getAllOrders();
    return res.status(200).json(serviceResponse.data);
};
exports.default = {
    getAllOrders,
    createOrder,
};
