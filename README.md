# College ERP Dashboard

Full-stack College ERP: authentication & RBAC, academic modules (attendance, exams & results, timetable, curriculum, workload), finance, admissions, notifications (Socket.IO), exports, analytics, Google SSO, Redis caching, and a background job queue.

## Stack

- **Client** — React 19 + Vite, Tailwind, React Router, TanStack Query, axios, Socket.IO client
- **Server** — Node.js 20, Express 5, MongoDB (Mongoose), Redis (ioredis), BullMQ, Socket.IO
- **Infra** — MongoDB Atlas, Redis, Docker (optional), GitHub Actions CI

## Quick start (dev)

```bash
# 1. Server
cd server
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, ...
npm install
npm run dev               # http://localhost:5000  (Swagger at /api-docs)

# 2. Client (separate terminal)
cd client
npm install
npm run dev               # http://localhost:5173 (proxies /api and /socket.io to :5000)

# 3. Seed an admin (optional)
cd server && npm run seed:admin
```

Default login (after seeding): the email/password set via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env`.

## Tests

```bash
cd server && npm test     # Node test runner + supertest + mongodb-memory-server
```

## Data migrations & indexes

- `npm run migrate` (dry run) / `npm run migrate:apply` — one-time data migration (admins → users, ObjectId refs, drop manual counters).
- `npm run indexes` — ensure all Mongoose schema indexes exist in the database. Indexes are also ensured automatically at startup when `NODE_ENV=production`.

## Environment variables

See `server/.env.example` for the full list. Required: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`. Optional but recommended in production: `REFRESH_TOKEN_SECRET`, `REDIS_URL`, Google SSO vars, `LOCKOUT_*`, `PASSWORD_*`.

## Docker deployment

Runs MongoDB + Redis + API + web (nginx serving the built client and proxying `/api`, `/api-docs`, `/socket.io`) with one command:

```bash
cp server/.env.example .env   # root .env — set JWT_SECRET (required by compose), MONGO_URI override if needed
docker compose up -d --build
# Web:      http://localhost
# API:      http://localhost/api/v1
# Swagger:  http://localhost/api-docs
```

By default the container uses the bundled MongoDB/Redis. For MongoDB Atlas, set `MONGO_URI` in the root `.env` and remove/replace the `mongo` service in `docker-compose.yml`.

### Deploying to a cloud host

The `client` and `server` images are standard. Build and push them to a registry, then run on any container host (Render, Railway, Fly.io, ECS):

```bash
docker build -t erp-server ./server
docker build -t erp-client ./client
```

Point the images at a managed MongoDB/Redis and set the same environment variables from `server/.env.example`.

## Backups & disaster recovery

- **MongoDB Atlas** — enable the built-in cloud backup schedule (continuous or daily snapshots) in Atlas → Backups. Restore via the Atlas UI or `mongorestore`.
- **Self-hosted MongoDB** — the `mongo` container persists to the `mongo_data` volume. Back it up with `mongodump --uri "$MONGO_URI" --out backups/$(date +%F)` and schedule it via cron.
- **Redis** — a cache only; Redis data is not authoritative. Losing it just drops cached stats / in-flight jobs, which regenerate.
- **Disaster recovery procedure**
  1. Stand up a new server/container with the same environment variables.
  2. Restore the latest Mongo dump/backup into the new instance.
  3. Run `npm run migrate:apply` then `npm run indexes` (idempotent).
  4. Seed an admin if needed (`npm run seed:admin`).
  5. Verify: web loads, `/api-docs` opens, login works.

## API documentation

Swagger UI is served at `/api-docs` with the full OpenAPI 3.0 spec (`server/docs/swagger.js`).
