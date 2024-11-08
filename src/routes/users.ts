import { Router, Request, Response, NextFunction } from 'express';
import { RequestBody } from '../types/user';
const router = Router();
import { logger } from '../utils/logger';

interface User {
  name: string;
  email: string;
}

const users: User[] = [{ name: 'Prabin', email: 'pk@gmail.com' }];

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (users.length === 0) {
    return next(new Error('No user found in database'));
  }
  res.status(200).json({ users: users });
});

router.post(
  '/',
  (req: Request<{}, {}, RequestBody>, res: Response, next: NextFunction) => {
    // see what's in the body
    const { name, email } = req.body;
    try {
      const newEntry = {
        name: name,
        email: email,
      };
      setTimeout(() => {
        users.push(newEntry);
        // write a log
        logger.log(`User created ${name} ${email}`);
        res.status(201).json({ messge: 'Name and Email is pushed into db' });
      }, 2000);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
