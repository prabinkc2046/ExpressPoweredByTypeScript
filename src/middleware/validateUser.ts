import { Request, Response, NextFunction } from 'express';
import { RequestBody } from '../types/user';

const validateUser = (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new Error('Name or email field is missing'));
  }
  next();
};

export default validateUser;
