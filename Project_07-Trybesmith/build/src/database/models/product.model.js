"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const order_model_1 = __importDefault(require("./order.model"));
const user_model_1 = __importDefault(require("./user.model"));
const ProductModel = index_1.default.define('Product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: false,
    underscored: true,
});
user_model_1.default.hasMany(order_model_1.default, { foreignKey: 'userId' });
order_model_1.default.belongsTo(user_model_1.default, { foreignKey: 'userId' });
order_model_1.default.hasMany(ProductModel, { foreignKey: 'orderId', as: 'productIds' });
ProductModel.belongsTo(order_model_1.default, { foreignKey: 'orderId' });
exports.default = ProductModel;
