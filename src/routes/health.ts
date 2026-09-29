import type { FastifyPluginAsync } from 'fastify';

const health: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/health',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              status:  { type: 'string' },
              version: { type: 'string' },
              uptime:  { type: 'number' },
            },
            required: ['status', 'version', 'uptime'],
          },
        },
      },
    },
    async (_request, reply) => {
      return reply.send({
        status:  'ok',
        version: '0.1.0',
        uptime:  process.uptime(),
      });
    },
  );
};

export default health;
