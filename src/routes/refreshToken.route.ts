import { Router } from 'express';
import { refreshTokenHandler } from '../controllers/refreshToken.controller';
import { verifyToken } from '../middleware/verifyToken.middleware';
const router = Router();

router.post('/', verifyToken, refreshTokenHandler);

export default router;
