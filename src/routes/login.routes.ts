import express from 'express';
import { validateLoginRequestData } from '../middleware/validateLoginRequestData.middleware';
import loginUser from '../controllers/login.controller';
const router = express.Router();

// Login route
router.post('/', validateLoginRequestData, loginUser);
