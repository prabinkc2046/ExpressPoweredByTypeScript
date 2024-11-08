import express from 'express';
import productRoutes from './routes/products';
import logRequest from './middleware/requestLogger';
import responseTimer from './middleware/responseTimer';
import authMiddleware from './middleware/authMiddleware';
import validateProduct from './middleware/validateProduct';
import handleError from './middleware/handleError';

const app = express();
const PORT = process.env.PORT || 3000;

//  #1 first middle man: log request middleware
app.use(logRequest);

// #2 second middle man: capture response time
app.use(responseTimer);

// #3 third middle man: middleware to parse json body
app.use(express.json());

app.use('/products', authMiddleware, validateProduct, productRoutes);

app.use(handleError);
// run server
app.listen(PORT, () => {
  console.log(`Server is listening on http:localhost:${PORT}`);
});
