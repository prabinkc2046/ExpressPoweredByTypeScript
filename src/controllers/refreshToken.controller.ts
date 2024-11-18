import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { Jwt } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'yourAccessTokenSecret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'yourRefreshTokenSecret';

export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    // read the cookie
    // cookie was set like this: res.cookies('refreshToken', refreshTOken)
    const token = req.cookies?.refreshToken;
    const { user } = req.body.user;
    // cookie could be empty like "" or null or have string
    // check if cookie is empty or null then return
    if (!token) {
      res.status(400).json({ message: 'Invalid Cookie' });
      return;
    }

    const newAccessToken = jwt.sign(
      { userId: user.userId },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7days' }
    );
    res.status(200).json({ accessTokenCreated: newAccessToken });
  } catch (error: any) {
    logger.logError({
      name: 'TokenError',
      statusCode: 500,
      message: error.message,
    });
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
