"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = __importDefault(require("../controllers/orders.controller"));
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const validateNewOrder_1 = __importDefault(require("../middlewares/validateNewOrder"));
const ordersRouter = (0, express_1.Router)();
ordersRouter.get('/', orders_controller_1.default.getAllOrders);
ordersRouter.post('/', validateToken_1.default, validateNewOrder_1.default, orders_controller_1.default.createOrder);
exports.default = ordersRouter;
