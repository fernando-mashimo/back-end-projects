import { Request, Response } from 'express';
import productsService from '../services/products.service';

const createProduct = async (req: Request, res: Response): Promise<Response> => {
  const newProduct = req.body;
  const serviceResponse = await productsService.createProduct(newProduct);
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(422).json(serviceResponse.data);
  }
  return res.status(201).json(serviceResponse.data);
};

const getAllProducts = async (_req: Request, res: Response): Promise<Response> => {
  const serviceResponse = await productsService.getAllProducts();
  return res.status(200).json(serviceResponse.data);
};

export default {
  createProduct,
  getAllProducts,
};
