import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log('auth header', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorised' });
    return;
  }
  const token = authHeader.split(' ')[1];

  if (token !== 'my-token-123') {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  next();
};

export default authMiddleware;
