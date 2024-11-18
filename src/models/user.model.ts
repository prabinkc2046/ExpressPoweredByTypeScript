import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user.interface';

// Define
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// create and export model
export const User = model<IUser>('User', userSchema);
