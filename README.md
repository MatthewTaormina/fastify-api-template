# fastify-api-template

A minimal, production-ready **Fastify v5 + TypeScript** API template. Designed to run behind a reverse proxy (nginx, Caddy, AWS ALB, etc.).

## Stack

| Tool | Version | Purpose |
|---|---|---|
| [Fastify](https://fastify.dev) | `^5.12.5` | HTTP framework |
| [TypeScript](https://www.typescriptlang.org) | `^5.8` | Language (`ES2022`, `Bundler` resolution) |
| [tsx](https://tsx.is) | `^4.23.15` | Dev runner (no separate build step) |
| [vitest](https://vitest.dev) | `^5.0.2` | Test runner |
| [ESLint](https://eslint.org) | `^10.11.0` | Linter (flat config) |
| [pnpm](https://pnpm.io) | `^9.15.9` | Package manager |

## Prerequisites

- **Node.js** `>=24`
- **pnpm** `>=9` — install via [Corepack](https://nodejs.org/api/corepack.html):
  ```bash
  corepack enable
  ```

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and adjust values
cp .env.example .env

# 3. Start the dev server (watches for changes)
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with hot-reload (`tsx watch`) |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run the compiled output (`node dist/server.js`) |
| `pnpm test` | Run tests once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | Lint all source files |

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed.

| Variable | Default | Description |
|---|---|---|
| `HOST` | `127.0.0.1` | Bind address. Use `0.0.0.0` in Docker. |
| `PORT` | `3000` | TCP port to listen on. |
| `LOG_LEVEL` | `info` | Pino log level: `trace` \| `debug` \| `info` \| `warn` \| `error` \| `fatal` \| `silent` |

## Proxy Configuration

The server binds to `127.0.0.1` by default and sets `trustProxy: true`. This means:

- The proxy (nginx, Caddy, etc.) forwards requests to `localhost:PORT`.
- `request.ip` and `request.protocol` correctly reflect the real client via `X-Forwarded-For` / `X-Forwarded-Proto`.
- The API is not directly reachable from outside the host.

**Docker / separate-host proxy:** set `HOST=0.0.0.0` so the server binds on all interfaces.

## Endpoints

### `GET /health`

Returns server health and uptime. No authentication required.

**Response `200 OK`:**
```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime": 12.345
}
```

| Field | Type | Description |
|---|---|---|
| `status` | `string` | Always `"ok"` when the server is up |
| `version` | `string` | Application version from `package.json` |
| `uptime` | `number` | Process uptime in seconds |

## Project Structure

```
src/
├── app.ts          # Fastify instance factory — register plugins & routes here
├── server.ts       # Entry point — reads env vars, starts listening
└── routes/
    └── health.ts   # GET /health route plugin
src/tests/
└── health.test.ts  # In-process tests via app.inject()
```

## Adding Routes

Create a new plugin file in `src/routes/`:

```typescript
// src/routes/example.ts
import type { FastifyPluginAsync } from 'fastify';

const example: FastifyPluginAsync = async (fastify) => {
  fastify.get('/example', async (_request, reply) => {
    return reply.send({ hello: 'world' });
  });
};

export default example;
```

Then register it in [`src/app.ts`](src/app.ts):

```typescript
import exampleRoutes from './routes/example.js';

await app.register(exampleRoutes);
```

## License

See [LICENSE](LICENSE).