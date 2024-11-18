import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import { error } from 'console';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'yourAccessTokenSecret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'yourRefreshTokenSecret';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // read access token
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    logger.logError({
      name: 'AuthorizationError',
      statusCode: 401,
      message: 'Token is missing',
    });
    next({
      name: 'AuthorizationError',
      statusCode: 401,
      message: 'Token is missing',
    });
    return;
  }

  //if refresh token or access token is present
  //   check if they are valid token
  try {
    // checking if access token is present
    if (accessToken) {
      // check if the token is valid
      console.log('Access token is ', accessToken);
      jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, user: any) => {
        if (error) {
          logger.logError({
            name: 'AuthError',
            statusCode: 403,
            message: 'Invalid access token',
          });
          res.status(403).json({
            message: 'Invalid access token',
          });
          return;
        }
        req.body.user = user;
        return next();
      });
    } else if (refreshToken) {
      console.log('Refresh token is', refreshToken);
      jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (error: any, user: any) => {
          if (error) {
            logger.logError({
              name: 'AuthError',
              statusCode: 403,
              message: 'Invalid refresh token',
            });
            res.status(403).json({ message: 'Invalid refresh token' });
          }
          req.body.user = user;
          return next();
        }
      );
    }
  } catch (error) {
    logger.logError({
      name: 'AuthError',
      statusCode: 500,
      message: 'Token verification failed',
    });

    next({
      name: 'AuthError',
      statusCode: 500,
      message: 'Token verification failed',
    });
  }
};
