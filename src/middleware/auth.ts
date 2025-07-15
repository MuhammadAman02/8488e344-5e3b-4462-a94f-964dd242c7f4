import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

export async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new AppError('Access token required', 401);
    }

    const decoded = verifyToken(token);
    (request as any).userId = decoded.userId;
  } catch (error) {
    if (error instanceof AppError) {
      reply.status(error.statusCode).send({ error: error.message });
    } else {
      reply.status(401).send({ error: 'Invalid token' });
    }
  }
}