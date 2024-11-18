import express from 'express';
import { userProfile } from '../controllers/profile.controller';
const router = express.Router();

// Login route
router.post('/', userProfile);

export default router;
