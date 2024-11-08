import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = `${err.message}`;
  logger.log(errorMessage);
  res.status(500).json({ message: err.message });
};

export default handleError;
