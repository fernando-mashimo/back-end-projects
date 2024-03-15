import { NextFunction, Request, Response } from 'express';

const validateNewProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (!price) return res.status(400).json({ message: '"price" is required' });
  return next();
};

export default validateNewProduct;
