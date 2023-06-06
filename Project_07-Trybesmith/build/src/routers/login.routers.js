"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const validateLogin_1 = __importDefault(require("../middlewares/validateLogin"));
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', validateLogin_1.default, login_controller_1.default.login);
exports.default = loginRouter;
