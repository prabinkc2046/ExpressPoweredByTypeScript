import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const message = `method: ${req.method}\turl: ${req.url}`;
  logger.log(message);
  next();
};

export default logRequest;
