import express, { Request, Response, NextFunction } from 'express';
import ProductRoutes from '../src/routes/productRoutes';
import { customErrorHandler } from './middleware/customeErrorHandler';
import validateProduct from './middleware/validateProduct';
import customCors from './middleware/customCors';

const app = express();
const PORT = 3000;

app.use(customCors);
app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('You have no cors issue');
});
app.use('/products', validateProduct, ProductRoutes);
app.use(customErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
