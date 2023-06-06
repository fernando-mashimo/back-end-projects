import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import validateToken from '../middlewares/validateToken';
import validateNewOrder from '../middlewares/validateNewOrder';

const ordersRouter = Router();

ordersRouter.get('/', ordersController.getAllOrders);
ordersRouter.post('/', validateToken, validateNewOrder, ordersController.createOrder);

export default ordersRouter;
