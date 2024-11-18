import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'yourAccessTokenSecret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'yourRefreshTokenSecret';

export const generateAccessToken = (payload: Object, expiresIn = '1m') => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });
};

export const generateRefreshToken = (payload: object, expiresIn = '7d') => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn });
};

export const verifyToken = (token: string, isRefreshToken: false) => {
  const secret = isRefreshToken ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
  return jwt.verify(token, secret);
};
