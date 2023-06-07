import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const serviceResponse = await loginService.verifyLogin(req.body);

  if (serviceResponse.status === 'UNAUTHORIZED') {
    return res.status(401).json(serviceResponse.data);
  }
  return res.status(200).json(serviceResponse.data);
};

export default {
  login,
};