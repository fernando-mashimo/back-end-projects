import { ServiceResponse } from '../types/ServiceReponse';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import validateNewProduct from './validations/validateNewProductData';

const createProduct = async (newProduct: ProductInputtableTypes)
: Promise<ServiceResponse<Product>> => {
  const error = validateNewProduct(newProduct);
  if (error) {
    return {
      status: 'INVALID_DATA',
      data: { message: error },
    };
  }
  const product = await ProductModel.create(newProduct);
  const responseService: ServiceResponse<Product> = {
    status: 'SUCCESSFUL',
    data: product.dataValues,
  };
  return responseService;
};

const getAllProducts = async (): Promise<ServiceResponse<Product[]>> => {
  const products = await ProductModel.findAll();
  const responseService: ServiceResponse<Product[]> = {
    status: 'SUCCESSFUL',
    data: products.map((product) => product.dataValues),
  };
  return responseService;
};

export default {
  createProduct,
  getAllProducts,
};