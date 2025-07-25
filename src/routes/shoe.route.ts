import { FastifyInstance } from 'fastify';
import {
  createShoeHandler,
  getShoesHandler,
  getShoeHandler,
  updateShoeHandler,
  deleteShoeHandler,
} from '../controllers/shoe.controller';
import {
  createShoeSchema,
  getShoesSchema,
  getShoeSchema,
  updateShoeSchema,
  deleteShoeSchema,
} from '../schemas/shoe.schema';
import { authenticateToken } from '../middleware/auth';

export async function shoeRoutes(app: FastifyInstance) {
  // Public routes
  app.get('/api/shoes', {
    schema: getShoesSchema,
    handler: getShoesHandler,
  });

  app.get('/api/shoes/:id', {
    schema: getShoeSchema,
    handler: getShoeHandler,
  });

  // Protected routes (require authentication)
  app.post('/api/shoes', {
    schema: createShoeSchema,
    preHandler: authenticateToken,
    handler: createShoeHandler,
  });

  app.put('/api/shoes/:id', {
    schema: updateShoeSchema,
    preHandler: authenticateToken,
    handler: updateShoeHandler,
  });

  app.delete('/api/shoes/:id', {
    schema: deleteShoeSchema,
    preHandler: authenticateToken,
    handler: deleteShoeHandler,
  });
}