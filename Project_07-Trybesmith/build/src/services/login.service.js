"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
const auth_util_1 = __importDefault(require("../utils/auth.util"));
const verifyLogin = async (login) => {
    const userExists = await user_model_1.default.findOne({ where: { username: login.username } });
    if (!userExists || !bcryptjs_1.default.compareSync(login.password, userExists.dataValues.password)) {
        return {
            status: 'UNAUTHORIZED',
            data: { message: 'Username or password invalid' },
        };
    }
    const payload = {
        id: userExists.dataValues.id,
        username: userExists.dataValues.username,
    };
    const token = auth_util_1.default.sign(payload);
    return {
        status: 'SUCCESSFUL',
        data: { token },
    };
};
exports.default = {
    verifyLogin,
};
