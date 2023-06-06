import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { userId, productIds } = req.body;
  const serviceResponse = await ordersService.createOrder(userId, productIds);

  if (serviceResponse.status === 'INVALID_DATA') {
    return res.status(422).json(serviceResponse.data);
  }

  if (serviceResponse.status === 'NOT_FOUND') {
    return res.status(404).json(serviceResponse.data);
  }
  
  return res.status(201).json(serviceResponse.data);
};

const getAllOrders = async (_req: Request, res: Response): Promise<Response> => {
  const serviceResponse = await ordersService.getAllOrders();
  return res.status(200).json(serviceResponse.data);
};

export default {
  getAllOrders,
  createOrder,
};
