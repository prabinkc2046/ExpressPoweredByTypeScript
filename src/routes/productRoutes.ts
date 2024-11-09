import { Router, Request, Response, NextFunction } from 'express';
import { Product } from '../types/products';
import eventEmitter from '../utils/customEmitter';
import '../events/listeners';

const router = Router();
const products: Product[] = [];
let nextId = 0;

router.post(
  '/',
  async (req: Request<{}, {}, Product>, res: Response, next: NextFunction) => {
    try {
      const { name, price } = req.body;

      const newProduct: Product = {
        name,
        price,
        productId: nextId++,
      };
      await new Promise(resolve => setTimeout(resolve, 500));
      products.push(newProduct);

      //   emit an event for added product
      eventEmitter.emit('productAdded', newProduct);
      // log it

      res.status(201).send('accetped');
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default router;
