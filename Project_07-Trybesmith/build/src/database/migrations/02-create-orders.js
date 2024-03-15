"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('orders', {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('orders');
    }
};
