import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interface/user.interface';

export const validateRegister = (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (
    typeof username !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    throw { statusCode: 400, message: 'Invalid username , email or password' };
  }

  next();
};
