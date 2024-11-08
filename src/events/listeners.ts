import eventEmitter from '../utils/customEmitter';
eventEmitter.on('productAdded', product => {
  console.log(`Event received: Product added with ID ${product.productId}`);
});
