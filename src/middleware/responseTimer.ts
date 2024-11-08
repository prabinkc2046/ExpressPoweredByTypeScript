import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const responseTimer = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const timeInms = Date.now() - start;
    const responseMessge = `Response time: ${timeInms}ms\tmethod: ${req.method}\turl: ${req.url}`;
    logger.log(responseMessge);
  });
  next();
};

export default responseTimer;
