import { Router } from 'express';
import productsController from '../controllers/products.controller';
import validateNewProduct from '../middlewares/validateNewProduct';

const productsRouter = Router();

productsRouter.post('/', validateNewProduct, productsController.createProduct);
productsRouter.get('/', productsController.getAllProducts);

export default productsRouter;
