import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { type FastifyInstance } from 'fastify';
import { buildApp } from '../app.js';

describe('GET /health', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 with status ok', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' });

    expect(response.statusCode).toBe(200);

    const body = response.json<{ status: string; version: string; uptime: number }>();
    expect(body.status).toBe('ok');
    expect(body.version).toBe('0.1.0');
    expect(typeof body.uptime).toBe('number');
  });
});
