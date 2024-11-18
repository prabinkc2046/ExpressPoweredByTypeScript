import { Request, Response } from 'express';
import { User } from '../models/user.model';
import logger from '../utils/logger';

export const userProfile = async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) {
    res.status(401).json({ message: 'Unauthorized: User information missing' });
    return;
  }

  const existingUser = await User.findById(user.userId);
  if (!existingUser) {
    logger.logError({
      name: 'ProfileError',
      statusCode: 404,
      message: 'User not found in database',
    });
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json({ message: 'User profile fetched successfully', user });
};
