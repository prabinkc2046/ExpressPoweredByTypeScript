import express, { NextFunction, Request, Response } from 'express';
import EventEmitter from 'events';
import { promises as fs } from 'fs';
import userRoutes from './routes/users';
import validateUser from './middleware/validateUser';
import requestLogger from './middleware/requestLogger';

const app = express();

app.use(requestLogger);
app.use(express.json());

app.use('/users', validateUser, userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(400).json({ message: err.message });
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
