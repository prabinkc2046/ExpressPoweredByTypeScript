import express from 'express';
import ProductRoutes from '../src/routes/productRoutes';
import { customErrorHandler } from './middleware/customeErrorHandler';
import validateProduct from './middleware/validateProduct';

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/products', validateProduct, ProductRoutes);
app.use(customErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
