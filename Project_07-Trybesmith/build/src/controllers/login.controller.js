"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_service_1 = __importDefault(require("../services/login.service"));
const login = async (req, res) => {
    const serviceResponse = await login_service_1.default.verifyLogin(req.body);
    if (serviceResponse.status === 'UNAUTHORIZED') {
        return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
};
exports.default = {
    login,
};
