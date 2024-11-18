import express from 'express';
import connectDB from './config/database';
import dotenv from 'dotenv';
import { customErrorHandler } from './middleware/customeErrorHandler';
import authRoutes from '../src/routes/auth.routes';
import userLoginRoutes from './controllers/login.controller';
import cookieParser from 'cookie-parser';
import refreshTokenRoutes from './routes/refreshToken.route';
import userProfileRoute from './routes/profile.routes';
import { verifyToken } from './middleware/verifyToken.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Routes

app.use('/api/auth/register', authRoutes);
app.use('/api/auth/login', userLoginRoutes);
app.use('/api/auth/refresh-token', refreshTokenRoutes);

// protected routes

app.use('/profile', verifyToken, userProfileRoute);
// handle error middleware
app.use(customErrorHandler);

// Connect to DB
connectDB();

export default app;
