"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;
exports.default = {
    up(queryInterface) {
        return queryInterface.bulkInsert('users', [
            {
                username: 'Hagar',
                vocation: 'Guerreiro',
                level: 10,
                password: bcryptjs_1.default.hashSync('terrível', SALT_ROUNDS),
            },
            {
                username: 'Eddie',
                vocation: 'Guerreiro',
                level: 8,
                password: bcryptjs_1.default.hashSync('sortudo', SALT_ROUNDS),
            },
            {
                username: 'Helga',
                vocation: 'Curandeira',
                level: 9,
                password: bcryptjs_1.default.hashSync('valquíria', SALT_ROUNDS),
            },
        ], {});
    },
    down(queryInterface) {
        return queryInterface.bulkDelete('users', {});
    }
};
