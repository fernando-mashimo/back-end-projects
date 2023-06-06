"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../database/models/product.model"));
const validateNewProductData_1 = __importDefault(require("./validations/validateNewProductData"));
const createProduct = async (newProduct) => {
    const error = (0, validateNewProductData_1.default)(newProduct);
    if (error) {
        return {
            status: 'INVALID_DATA',
            data: { message: error },
        };
    }
    const product = await product_model_1.default.create(newProduct);
    const responseService = {
        status: 'SUCCESSFUL',
        data: product.dataValues,
    };
    return responseService;
};
const getAllProducts = async () => {
    const products = await product_model_1.default.findAll();
    const responseService = {
        status: 'SUCCESSFUL',
        data: products.map((product) => product.dataValues),
    };
    return responseService;
};
exports.default = {
    createProduct,
    getAllProducts,
};
