import Fastify, { type FastifyInstance } from 'fastify';
import healthRoutes from './routes/health.js';

/**
 * Builds and configures the Fastify application instance.
 *
 * Returns the app without binding to any port, which allows it to be used
 * directly in tests via `app.inject()` without opening a real socket.
 */
export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: { level: process.env['LOG_LEVEL'] ?? 'info' },
    // Honour X-Forwarded-For / X-Forwarded-Proto headers from the upstream proxy
    // so that request.ip and request.protocol reflect the real client values.
    trustProxy: true,
  });

  await app.register(healthRoutes);

  return app;
}
