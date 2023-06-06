import { NextFunction, Request, Response } from 'express';

const validateNewOrder = (req: Request, res: Response, next: NextFunction) => {
  const { userId, productIds } = req.body;
  if (!userId) return res.status(400).json({ message: '"userId" is required' });
  if (!productIds) return res.status(400).json({ message: '"productIds" is required' });
  return next();
};

export default validateNewOrder;