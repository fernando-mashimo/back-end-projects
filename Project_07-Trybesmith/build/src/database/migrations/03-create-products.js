"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('products', {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
            orderId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'order_id',
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('products');
    }
};
