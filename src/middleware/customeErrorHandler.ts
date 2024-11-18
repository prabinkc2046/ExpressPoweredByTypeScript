import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interface/error.interface';

export const customErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  console.error(`[ERROR]: ${err.message}`);
  res
    .status(statusCode)
    .json({ message: err.message || 'Internal Server Error' });
};
