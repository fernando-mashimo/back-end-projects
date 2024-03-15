"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../database/models/product.model"));
const order_model_1 = __importDefault(require("../database/models/order.model"));
const validateNewOrderData_1 = __importDefault(require("./validations/validateNewOrderData"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
const models_1 = __importDefault(require("../database/models"));
const createOrder = async (userId, productIds) => {
    const error = await (0, validateNewOrderData_1.default)(userId, productIds);
    if (error) {
        return { status: 'INVALID_DATA', data: { message: error } };
    }
    const userExists = await user_model_1.default.findOne({ where: { id: userId } });
    if (!userExists)
        return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
    await models_1.default.transaction(async (t) => {
        const order = await order_model_1.default.create({ userId }, { transaction: t });
        await Promise.all(productIds.map(async (productId) => product_model_1.default
            .update({ orderId: order.dataValues.id }, {
            where: { id: productId },
            transaction: t,
        })));
    });
    return { status: 'SUCCESSFUL', data: { userId, productIds } };
};
const getAllOrders = async () => {
    const orders = await order_model_1.default.findAll();
    const orderProductsSets = await Promise.all(orders.map(async (order) => product_model_1.default.findAll({
        where: { orderId: order.dataValues.id },
    })));
    const products = orderProductsSets
        .map((productsSets) => productsSets.map((product) => product.dataValues.id));
    const ordersData = orders.map((order) => order.dataValues);
    const ordersReturnObj = ordersData.map((order, orderIndex) => {
        const [productIds] = products
            .filter((_productId, productIndex) => orderIndex === productIndex);
        return {
            ...order,
            productIds,
        };
    });
    return { status: 'SUCCESSFUL', data: ordersReturnObj };
};
exports.default = {
    getAllOrders,
    createOrder,
};
