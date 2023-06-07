"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const validateNewProduct_1 = __importDefault(require("../middlewares/validateNewProduct"));
const productsRouter = (0, express_1.Router)();
productsRouter.post('/', validateNewProduct_1.default, products_controller_1.default.createProduct);
productsRouter.get('/', products_controller_1.default.getAllProducts);
exports.default = productsRouter;
