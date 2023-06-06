"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = __importDefault(require("./routers/products.router"));
const orders_router_1 = __importDefault(require("./routers/orders.router"));
const login_routers_1 = __importDefault(require("./routers/login.routers"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/products', products_router_1.default);
app.use('/orders', orders_router_1.default);
app.use('/login', login_routers_1.default);
exports.default = app;
