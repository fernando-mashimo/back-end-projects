import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';
import { ServiceResponse } from '../types/ServiceReponse';
import validateNewOrder from './validations/validateNewOrderData';
import UserModel from '../database/models/user.model';
import sequelize from '../database/models';

const createOrder = async (userId: number, productIds: number[])
: Promise<ServiceResponse<object>> => {
  const error = await validateNewOrder(userId, productIds);
  if (error) {
    return { status: 'INVALID_DATA', data: { message: error } };
  }
  const userExists = await UserModel.findOne({ where: { id: userId } });
  if (!userExists) return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };

  await sequelize.transaction(async (t) => {
    const order = await OrderModel.create({ userId }, { transaction: t });
    await Promise.all(productIds.map(async (productId) => ProductModel
      .update({ orderId: order.dataValues.id }, {
        where: { id: productId },
        transaction: t,
      })));
  });

  return { status: 'SUCCESSFUL', data: { userId, productIds } };
};

const getAllOrders = async (): Promise<ServiceResponse<object>> => {
  const orders = await OrderModel.findAll();

  const orderProductsSets = await Promise.all(orders.map(async (order) => ProductModel.findAll({
    where: { orderId: order.dataValues.id },
  })));
  const products = orderProductsSets
    .map((productsSets) => productsSets.map((product) => product.dataValues.id));

  const ordersData = orders.map((order) => order.dataValues);

  const ordersReturnObj = ordersData.map((order, orderIndex) => {
    const [productIds] = products
      .filter((_productId, productIndex) => orderIndex === productIndex);
    return {
      ...order,
      productIds,
    };
  });

  return { status: 'SUCCESSFUL', data: ordersReturnObj };
};

export default {
  getAllOrders,
  createOrder,
};
