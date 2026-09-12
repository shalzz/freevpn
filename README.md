# SelfVPN — Hosted WireGuard VPN as a Service

SelfVPN turns a static landing page into a hosted SaaS: users sign in with
Google, connect a cloud provider account (DigitalOcean, Linode, Hetzner, ...),
and the platform runs [Algo VPN](https://github.com/trailofbits/algo) Ansible
playbooks to provision a hardened WireGuard VPN server — billed to the user's
own cloud account. Users get their `.conf` files and QR codes to connect their
devices.

## Status

Following the execution plan in [`saas-plan/ACTION_PLAN.md`](saas-plan/ACTION_PLAN.md).
Steps 1–8 are done (see [`saas-plan/AGENTS.md`](saas-plan/AGENTS.md) for task
breakdown). Current state:

| Area | Status |
|------|--------|
| Google OAuth login | Working |
| Dashboard + deploy form | Implemented |
| DigitalOcean / Linode OAuth connect | Code done, credentials wired, live connect flow pending |
| Python worker (FastAPI + BullMQ consumer) | Skeleton done |
| Algo VPN runner (Ansible provider) | Code done, live droplet deploy pending |
| Job queue, config delivery, KMS, destroy, audit, rate limits, CI/CD | Pending (Steps 9–20) |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend / API | Next.js 16.3.4 (App Router) + NextAuth.js v5 |
| Database | PostgreSQL + Prisma |
| Job queue | BullMQ + Redis |
| Worker | Python 3.11 + FastAPI, `ansible-playbook` |
| VPN deploy | Algo VPN (WireGuard) |
| Encryption | AWS KMS (planned, Step 12) |

## Local Development

Prerequisites:

- Docker (Postgres + Redis run as containers)
- Node.js 18+ (Volta pins Node 22.18.0)
- Python 3.11 for the worker (venv managed by uv; no system pip required)
- A Google OAuth client and (optionally) DigitalOcean/Linode OAuth apps

1. Start infrastructure:

```bash
docker start selfvpn-postgres   # Postgres 16 on :5432 (selfvpn/selfvpn/selfvpn_dev_pass)
docker start selfvpn-redis      # Redis 7 on :6379
```

> Not running? Create with:
> `docker run -d --name selfvpn-postgres -p 5432:5432 -e POSTGRES_DB=selfvpn -e POSTGRES_USER=selfvpn -e POSTGRES_PASSWORD=selfvpn_dev_pass postgres:16-alpine`
> `docker run -d --name selfvpn-redis -p 6379:6379 redis:7-alpine`

2. Install deps and sync the dev database:

```bash
npm install        # runs prisma generate via postinstall
npx prisma db push
```

3. Copy `.env.example` to `.env.local` (and `.env`), then fill in
   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET`
   (`openssl rand -base64 32`), `DATABASE_URL`, and your provider OAuth values.

4. Start the app:

```bash
npm run dev        # http://localhost:3000
```

5. Start the worker (port 8000 is used by Plausible here, so run on 8100):

```bash
worker/.venv/bin/uvicorn main:app --app-dir worker --port 8100
```

  Or build/run the container:

```bash
docker build -t selfvpn-worker worker
docker run --rm -d --name selfvpn-worker -p 8100:8000 \
  -e REDIS_URL=redis://localhost:6379 -e BULLMQ_QUEUE=deployments selfvpn-worker
```

Health check: `curl http://localhost:8100/health` →
`{"status":"ok","queue":"deployments",...}`.

## OAuth Callback URLs

- Google (NextAuth): `https://selfvpn.8bitlabs.dev/api/auth/callback/google`
- DigitalOcean: `https://selfvpn.8bitlabs.dev/api/oauth/digitalocean/callback`
- Linode: `https://selfvpn.8bitlabs.dev/api/oauth/linode/callback`

Local equivalents use `http://localhost:3000`. The provider redirect URI must
match exactly (no trailing slash).

## Project Layout

```
app/                 Next.js App Router (pages + API routes)
app/api/             auth, oauth/[provider], deploy, servers, cloud-accounts
components/          AuthProvider, DeployForm, ServerCard
lib/                 auth, prisma, oauth-providers
prisma/schema.prisma Database schema (User, Server, CloudAccount, Deployment, AuditLog)
worker/              Python worker (FastAPI + BullMQ consumer)
worker/algo/         Vendored Algo VPN v2.0.1 + config.py / runner.py
saas-plan/           ACTION_PLAN.md (step status), AGENTS.md (task status), README.md
```

## Environment Variables

See `.env.example`. Key ones:

- `DATABASE_URL`, `REDIS_URL`, `BULLMQ_QUEUE`
- `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_APP_URL`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `DIGITALOCEAN_CLIENT_ID`, `DIGITALOCEAN_CLIENT_SECRET`, `LINODE_*`
- `DO_API_TOKEN` (Algo/provisioning fallback)
- `AWS_REGION`, `KMS_KEY_ID` (Step 12)

`.env.local` / `.env` are gitignored; keep them in sync.