import { NextFunction, Request, Response } from 'express';
import authUtil from '../utils/auth.util';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const decodedToken = authUtil.verify(authorization);
    if (decodedToken) return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateToken;