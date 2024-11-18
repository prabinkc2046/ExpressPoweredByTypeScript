import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interface/user.interface';
import { User } from '../models/user.model';
import logger from '../utils/logger';
import { comparePassword } from '../utils/bcrypt.utils';
import { generateAccessToken } from '../utils/jwt.utils';
import { generateRefreshToken } from '../utils/jwt.utils';

const loginUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate the body has a proper format

    // grab the request body
    const { username, password, email } = req.body;

    // Check that username or email exits

    const existingUser = await User.findOne({
      $or: [{ username }],
    });

    console.log(existingUser);
    // if user does not exits
    if (!existingUser) {
      // log as error
      logger.logError({
        name: 'LoginError',
        statusCode: 400,
        message: 'User does not exist',
      });

      // send error to custom error handle error
      next({
        name: 'LoginError',
        statusCode: 400,
        message: 'User does not exist',
      });
      return;
    }

    // user exists
    // then grab the hash password
    // compare hash with provided password
    // if does not match, log error and inform the use

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      logger.logError({
        name: 'LoginError',
        statusCode: 400,
        message: 'Password does not match',
      });

      // send error to custom error handle error
      next({
        name: 'LoginError',
        statusCode: 400,
        message: 'Password does not match',
      });
      return;
    }

    // username and password is validated
    // generate access token
    // generate refresh token
    // send them
    const accessToken = generateAccessToken(
      { userId: existingUser._id },
      '5min'
    );
    const refreshToken = generateRefreshToken(
      { userId: existingUser._id },
      '7days'
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.status(201).json({
      message: 'Access token created',
      accessToken,
    });
  } catch (error) {
    logger.logError({
      name: 'LoginError',
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
};

export default loginUser;
