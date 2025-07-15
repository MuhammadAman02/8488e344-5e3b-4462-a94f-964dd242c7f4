import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/", async function (request, reply) {
    return { 
      message: "Welcome to the Shoe Store API!",
      version: "1.0.0",
      endpoints: {
        docs: "/docs",
        auth: {
          signup: "POST /api/auth/signup",
          login: "POST /api/auth/login"
        },
        shoes: {
          getAll: "GET /api/shoes",
          getById: "GET /api/shoes/:id",
          create: "POST /api/shoes (requires auth)",
          update: "PUT /api/shoes/:id (requires auth)",
          delete: "DELETE /api/shoes/:id (requires auth)"
        }
      }
    };
  });

  fastify.get("/api/health", async function (request, reply) {
    return { 
      status: "OK", 
      message: "Shoe Store API is running",
      timestamp: new Date().toISOString()
    };
  });
};

export default root;