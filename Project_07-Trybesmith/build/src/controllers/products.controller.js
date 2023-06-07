"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_service_1 = __importDefault(require("../services/products.service"));
const createProduct = async (req, res) => {
    const newProduct = req.body;
    const serviceResponse = await products_service_1.default.createProduct(newProduct);
    if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(422).json(serviceResponse.data);
    }
    return res.status(201).json(serviceResponse.data);
};
const getAllProducts = async (_req, res) => {
    const serviceResponse = await products_service_1.default.getAllProducts();
    return res.status(200).json(serviceResponse.data);
};
exports.default = {
    createProduct,
    getAllProducts,
};
