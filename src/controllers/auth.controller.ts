import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interface/user.interface';
import { hashPassword } from '../utils/bcrypt.utils';
import { User } from '../models/user.model';
import { isUserExists } from '../utils/user.utils';
import logger from '../utils/logger';

export const registerUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate body is taken away by validate register middle ware

    // grab the body
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await isUserExists(username, email);
    console.log(existingUser);
    // if user already exits
    if (existingUser) {
      logger.logError({
        statusCode: 400,
        name: 'validationError',
        message:
          'Username or email is already in use. Please choose a different one.',
      });
      next({
        statusCode: 400,
        message:
          'Username or email is already in use. Please choose a different one.',
      });
      return;
    }
    // hash password
    const hash = await hashPassword(password);

    // create a record
    const newUser = new User({
      username: username,
      password: hash,
      email: email,
    });

    // save in db
    newUser.save();

    // response to client
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    logger.logError({
      name: 'UserRegistrationError',
      statusCode: 500,
      message: 'Failed to register user',
    });
    next({ statusCode: 500, message: 'Failed to register user' });
  }
};
