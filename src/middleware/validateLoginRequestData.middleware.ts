import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interface/user.interface';
import logger from '../utils/logger';

export const validateLoginRequestData = (
  req: Request<{}, {}, Partial<IUser>>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  //check either both username and email or username or email is provided
  if (!username && !email) {
    logger.logError({
      statusCode: 400,
      name: 'LoginValidationError',
      message: 'Either username or email is required.',
    });
    throw { statusCode: 400, message: 'Either username or email is required.' };
    return;
  }

  if (username && typeof username !== 'string') {
    logger.logError({
      statusCode: 400,
      name: 'LoginValidationError',
      message: 'Username must be a valid string.',
    });

    throw { statusCode: 400, message: 'Username must be a valid string.' };
    return;
  }

  if (email && (typeof email !== 'string' || !email.includes('@'))) {
    logger.logError({
      statusCode: 400,
      name: 'LoginValidationError',
      message: 'Email must be a valid email address.',
    });

    throw { statusCode: 400, message: 'Email must be a valid email address.' };
    return;
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    logger.logError({
      statusCode: 400,
      name: 'LoginValidationError',
      message: 'Password must be a string and at least 6 characters long.',
    });

    throw {
      statusCode: 400,
      message: 'Password must be a string and at least 6 characters long.',
    };
    return;
  }

  next();
};
