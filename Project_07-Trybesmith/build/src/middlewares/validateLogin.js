"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: '"username" and "password" are required' });
    }
    return next();
};
exports.default = validateLogin;
