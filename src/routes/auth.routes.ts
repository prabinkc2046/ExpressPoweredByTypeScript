import { Router } from 'express';

import { registerUser } from '../controllers/auth.controller';
import { validateRegister } from '../middleware/middleware.validateRegisterBody';

const router = Router();

router.post('/', validateRegister, registerUser);

export default router;
