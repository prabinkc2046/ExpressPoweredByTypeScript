import { Request, Response, NextFunction } from 'express';
import { Product } from '../types/products';

const validateProduct = (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  const { name, price } = req.body;

  if (!name || typeof name !== 'string') {
    throw { statusCode: 400, message: 'Invalid or missing product name' };
  }
  if (price === undefined || typeof price !== 'number' || price <= 0) {
    throw { statusCode: 400, message: 'Invalid or missing product price' };
  }
  next();
};

export default validateProduct;
