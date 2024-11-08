import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to log timestamp and request method
const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request to ${req.url}`
  );
  next();
};

app.use(express.static(path.join(__dirname, '../public')));

app.get(/^\/myindex(:?\.html)?$/, (req: Request, res: Response) => {
  res.status(200).json({ message: 'You hit the /index or /index.html route' });
});

app.get(/^\/user\/([a-zA-Z0-9]+)$/, (req: Request, res: Response) => {
  console.log(req.params[0]);
});

app.get(/^\/images\/.*\.(png|jpg)$/, (req: Request, res: Response) => {
  res.status(200).send('serving images');
});

app.get(/^\/(post|product)\/([0-9]+)$/, (req: Request, res: Response) => {
  //   console.log(req.params);
  const item = req.params[0];
  const number = req.params[1];
  res.status(200).json({ item: item, number: number });
});

app.get(/^\/api\/(get|post|delete|put)/, (req: Request, res: Response) => {
  res.status(200).send(`Method is ${req.params[0]}`);
});

app.get('/welcome', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'Welcome to my Express server with TypeScript!' });
});

app.get('/about', (req: Request, res: Response) => {
  res.status(200).send('This is an Express server built using TypeScript.');
});

app.get('/old-page', (req: Request, res: Response) => {
  res.redirect(302, '/welcome');
});

app.get('/log', myMiddleware, (req: Request, res: Response) => {
  res.status(200).send('Log is complete');
});

app.all('/*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
