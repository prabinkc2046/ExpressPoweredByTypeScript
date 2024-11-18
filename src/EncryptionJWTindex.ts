import express, { Request, Response, NextFunction } from 'express';
import ProductRoutes from './routes/productRoutes';
import { customErrorHandler } from './middleware/customeErrorHandler';
import validateProduct from './middleware/validateProduct';
import customCors from './middleware/customCors';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(customCors);
app.use(express.json());
app.use(cookieParser());

app.use('/products', validateProduct, ProductRoutes);
app.get('/set-cookie', (req: Request, res: Response) => {
  res.cookie('user', 'JohnDoe', {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.send('Cookie is set');
});

app.get('/get-cookie', (req: Request, res: Response) => {
  const userCookie = req.cookies.user;
  if (userCookie) {
    res.send(`Hello, ${userCookie}`);
  } else {
    res.send('No user cookie found');
  }
});

app.use(customErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
