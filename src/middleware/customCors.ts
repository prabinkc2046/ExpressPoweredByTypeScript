import cors, { CorsOptions } from 'cors';
import { Request, Response, NextFunction } from 'express';
const whiteList = ['http://localhost', 'https://yourserver.com'];

// allow access from same origin when request origin is undefined

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin || whiteList.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'), false);
    }
  },
  optionsSuccessStatus: 2000,
};

const customCors = (req: Request, res: Response, next: NextFunction) => {
  cors(corsOptions)(req, res, next);
};

export default customCors;
