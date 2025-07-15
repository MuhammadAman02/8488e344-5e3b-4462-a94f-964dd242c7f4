import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from './AppError';

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }
}