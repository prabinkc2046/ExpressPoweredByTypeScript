import { Router, Request, Response, NextFunction } from 'express';
import { Product } from '../types/products';
import logger from '../utils/logger';
const router = Router();

// product list
const products: Product[] = [];
let nextId = 0;

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ product: products });
});

router.post(
  '/',
  async (req: Request<{}, {}, Product>, res: Response, next: NextFunction) => {
    try {
      const { name, price } = req.body;
      const newProduct: Product = {
        productId: nextId++,
        name: name,
        price: price,
      };
      await new Promise(resolve => setTimeout(resolve, 500));
      products.push(newProduct);

      // emit event for adding product
      logger.log(`Producted added: ${JSON.stringify(newProduct)}`);
      res.status(201).json({ newProduct });
    } catch (error) {
      next(error);
    }
  }
);

interface Params {
  id: string;
}
router.put(
  '/:id',
  async (
    req: Request<Params, {}, { price: number; name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const { id } = req.params;
      const { price } = req.body;
      console.log(products);
      console.log(id);
      const updatedProduct = products.find(
        item => item.productId === parseInt(id)
      );
      if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        updatedProduct.price = price;
        logger.log(`Product updated: ${JSON.stringify(updatedProduct)}`);
        res.json(updatedProduct);
      }
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

// DELETE/products/:id
router.delete(
  '/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      await new Promise(resolve => setTimeout(resolve, 500));
      const index = products.findIndex(item => item.productId === id);
      if (index === -1) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      const deletedProduct = products.splice(index, 1)[0];
      logger.log(`Product deleted: ${JSON.stringify(deletedProduct)}`);
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
