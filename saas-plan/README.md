# SelfVPN SaaS — OAuth-Driven VPN Deployment Platform

Convert the SelfVPN landing page into a hosted SaaS where users authenticate via
Google OAuth or provide cloud provider API keys, and the server deploys a WireGuard
VPN server using Algo VPN Ansible playbooks.

## Problem

The current project is a static Next.js landing page that sells a VPN deployment
guide on Gumroad. There is no backend, no authentication, no database, and no
deployment logic. Converting to SaaS requires building a complete application.

## Goals

1. Users log in via Google OAuth (via Cognito or NextAuth)
2. Users connect their cloud provider (AWS, GCP, DigitalOcean, etc.) via OAuth
   or API key
3. Server runs Algo VPN Ansible playbooks to deploy WireGuard on the user's
   cloud account
4. Users receive VPN configs (`.conf` files, QR codes, Apple profiles)
5. Users can manage (add/remove users, destroy) their VPN servers

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                        │
│  ┌────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Landing   │  │  Login   │  │Dashboard │  │  Deploy Form │  │
│  │  Page      │  │  (OAuth) │  │          │  │  (provider,  │  │
│  │  (existing)│  │          │  │          │  │   region)     │  │
│  └────────────┘  └──────────┘  └──────────┘  └──────────────┘  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                      API Layer (Next.js API Routes)              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │ /api/auth/*  │  │ /api/deploy  │  │ /api/servers       │     │
│  │ (NextAuth)   │  │ (trigger     │  │ (list, status,     │     │
│  │              │  │  deployment) │  │  configs)          │     │
│  └──────────────┘  └──────┬───────┘  └────────────────────┘     │
└───────────────────────────┼──────────────────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│                  Deployment Worker (Python)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │  OAuth Token │  │  Algo VPN    │  │  Config Generator  │     │
│  │  Exchange    │  │  Orchestrator│  │  (QR, .conf,       │     │
│  │  (STS, WIF)  │  │              │  │   .mobileconfig)   │     │
│  └──────────────┘  └──────┬───────┘  └────────────────────┘     │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │  ansible-runner: ansible-playbook main.yml -e "..."       │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│                       Data Store                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │  Users       │  │  Servers     │  │  Deployments       │     │
│  │  (Prisma/    │  │  (status,    │  │  (logs, configs,   │     │
│  │   Postgres)  │  │   IP, creds) │  │   status)          │     │
│  └──────────────┘  └──────────────┘  └────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 15 (Pages Router) | Existing codebase is Next.js 13; upgrade in place |
| Auth | NextAuth.js v5 (Auth.js) | Google OAuth, JWT sessions, middleware protection |
| API | Next.js API Routes | Keep monorepo simple; add Python worker separately |
| Database | PostgreSQL + Prisma | Relational data, migrations, type safety |
| Job Queue | BullMQ + Redis | Async deployment jobs with retry logic |
| VPN Deploy | Algo VPN via ansible-runner | Proven WireGuard deployment, multi-cloud |
| Secrets | AWS KMS | Envelope encryption for user cloud credentials |
| Worker | Python 3.11 + FastAPI | Runs Ansible playbooks, separate from Next.js |
| Hosting | Vercel (frontend) + ECS/Fargate (worker) | Managed compute, auto-scaling |

## Cloud Provider OAuth Support

| Provider | OAuth 2.0 | Device Flow | Token → Cloud Creds | Algo Compatible |
|----------|-----------|-------------|---------------------|-----------------|
| AWS | Yes | Yes | `sts:AssumeRoleWithWebIdentity` | Pass temp keys as extra vars |
| GCP | Yes | Yes | `sts.googleapis.com/v1/token` | Exchange for compute scope |
| Azure | Yes | Yes | Federated identity credentials | Service principal exchange |
| DigitalOcean | Yes | No | Token = API token | Direct use as `do_token` |
| Linode | Yes | No | 2-hour tokens | Short-lived, needs refresh |
| Vultr | Yes + PKCE | No | 1-hour tokens | Short-lived, needs refresh |
| Hetzner | No | — | — | API key input form only |
| Scaleway | SSO only | — | — | API key input form only |

## Provider Auth Strategy

**OAuth providers (AWS, GCP, Azure, DO, Linode, Vultr):**
- Authorization Code + PKCE flow in the browser
- Tokens exchanged for cloud-specific credentials server-side
- Temporary credentials used only during deployment, never persisted

**Non-OAuth providers (Hetzner, Scaleway):**
- Traditional API key input form
- Keys encrypted with KMS envelope encryption before storage
- Auto-expiry after configurable period

## Deployment Flow

```
1. User signs in via Google OAuth
2. User selects cloud provider (e.g., AWS)
3. User authorizes via OAuth → redirected back with auth code
4. Backend exchanges code for access token
5. Backend exchanges token for temporary cloud credentials (STS/WIF)
6. User selects region + features (ad blocking, SSH tunneling)
7. Backend creates deployment job in BullMQ queue
8. Worker picks up job, runs Algo VPN playbook with temp credentials
9. Algo provisions VM, installs WireGuard, generates configs
10. Worker stores configs (encrypted), updates server status
11. User sees deployment complete, downloads configs / scans QR
```

## Security Principles

1. **Never store long-lived cloud credentials** — use OAuth token exchange
2. **Envelope encryption** — if API keys must be stored, encrypt with KMS
3. **Process isolation** — each deployment runs in isolated subprocess
4. **Minimal scopes** — request only permissions needed for VM provisioning
5. **Auto-expiry** — cloud credentials expire after deployment window
6. **Audit logging** — every deployment logged with user, provider, timestamp

## Estimated Cost

| Component | Monthly Cost |
|-----------|-------------|
| Vercel (frontend) | $0 (free tier) |
| PostgreSQL (RDS/Supabase) | $15-50 |
| Redis (ElastiCache) | $15-30 |
| Worker compute (ECS Fargate) | $50-200 |
| AWS KMS | ~$1 |
| **Total** | **$80-280/mo** |

Customer cloud costs (VPN server) are billed to their own cloud account.

## Directory Structure (Proposed)

```
freevpn/
├── src/                          # Next.js app
│   ├── pages/
│   │   ├── index.js              # Existing landing page
│   │   ├── login.js              # Login page
│   │   ├── dashboard.js          # User dashboard
│   │   ├── deploy.js             # Deployment form
│   │   └── api/
│   │       ├── auth/[...nextauth].js  # NextAuth routes
│   │       ├── deploy.js         # Trigger deployment
│   │       ├── servers.js        # List servers
│   │       └── servers/[id].js   # Server details
│   ├── components/
│   │   ├── AuthProvider.js       # Session provider wrapper
│   │   ├── Navbar.js
│   │   ├── DeployForm.js
│   │   └── ServerCard.js
│   └── lib/
│       ├── prisma.js             # Prisma client singleton
│       └── auth.js               # NextAuth config
├── worker/                       # Python deployment worker
│   ├── main.py                   # FastAPI + BullMQ consumer
│   ├── providers/
│   │   ├── aws.py                # AWS credential exchange
│   │   ├── gcp.py                # GCP credential exchange
│   │   ├── azure.py              # Azure credential exchange
│   │   ├── digitalocean.py       # DO OAuth
│   │   └── base.py               # Abstract provider
│   ├── algo/
│   │   ├── runner.py             # ansible-runner wrapper
│   │   └── config.py             # Algo config generator
│   └── crypto.py                 # KMS envelope encryption
├── prisma/
│   └── schema.prisma             # Database schema
├── docker/
│   └── worker.Dockerfile         # Worker container
├── saas-plan/
│   ├── README.md                 # This file
│   ├── AGENTS.md                 # Task breakdown
│   └── ACTION_PLAN.md            # Implementation steps
└── ...existing files...
```
