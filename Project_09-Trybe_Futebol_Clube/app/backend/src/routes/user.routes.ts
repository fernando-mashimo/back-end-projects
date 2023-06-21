import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import TokenGenereatorJWT from '../utils/TokenGeneratorJWT';
import Validations from '../middlewares/Validations';
import UserModel from '../models/UserModel';

const userModel = new UserModel();
const tokenGenerator = new TokenGenereatorJWT();
const userService = new UserService(userModel, tokenGenerator);
const userController = new UserController(userService);

const router = Router();

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
