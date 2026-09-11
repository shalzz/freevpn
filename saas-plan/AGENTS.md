# AGENTS.md — Task Breakdown for SelfVPN SaaS

This file defines the work units for building the SelfVPN SaaS. Each task is
scoped to be completable by a single agent/developer in one sitting. Tasks are
ordered by dependency — later tasks depend on earlier ones.

---

## Phase 1: Project Setup & Auth (Week 1-2)

### Task 1.1: Upgrade Next.js & Install Dependencies

**Goal:** Upgrade from Next.js 13 to 15, install all required packages.

**Files to modify:**
- `package.json`

**Packages to install:**
```
next@latest react@latest react-dom@latest
next-auth@beta           # Auth.js v5
@auth/prisma-adapter     # DB adapter
@prisma/client           # ORM
prisma                   # Dev dependency
@aws-sdk/client-kms      # KMS encryption
@aws-sdk/client-sts      # STS token exchange
bullmq                   # Job queue
ioredis                  # Redis client
```

**Acceptance criteria:**
- `pnpm dev` starts without errors
- All packages resolve in lockfile

---

### Task 1.2: Database Schema (Prisma)

**Goal:** Define the database schema for users, servers, and deployments.

**Files to create:**
- `prisma/schema.prisma`

**Schema:**
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  servers       Server[]
  cloudAccounts CloudAccount[]
}

model Server {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  provider      String    // aws, gcp, digitalocean, etc.
  region        String
  status        String    // pending, deploying, running, destroyed, failed
  ipAddress     String?
  vpnConfigPath String?   // path to encrypted configs
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deployments   Deployment[]
}

model CloudAccount {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  provider      String
  credentials   String    // KMS-encrypted blob
  expiresAt     DateTime?
  createdAt     DateTime  @default(now())
}

model Deployment {
  id            String    @id @default(cuid())
  serverId      String
  server        Server    @relation(fields: [serverId], references: [id])
  status        String    // queued, running, success, failed
  logs          String?
  startedAt     DateTime?
  completedAt   DateTime?
  createdAt     DateTime  @default(now())
}
```

**Acceptance criteria:**
- `npx prisma db push` succeeds
- `npx prisma generate` produces client

---

### Task 1.3: NextAuth Configuration

**Goal:** Set up Google OAuth login with NextAuth v5.

**Files to create:**
- `lib/auth.js`
- `app/api/auth/[...nextauth]/route.js`
- `app/login/page.js`
- `components/AuthProvider.js`
- `app/layout.js` (modify)

**Environment variables:**
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=         # openssl rand -base64 32
DATABASE_URL=        # postgres://...
```

**Acceptance criteria:**
- Visit `/login` → redirected to Google
- After auth → redirected to `/dashboard`
- Session contains `user.id`, `user.email`
- Unauthenticated users cannot access `/dashboard`

---

### Task 1.4: Middleware Route Protection

**Goal:** Protect dashboard, deploy, and API routes.

**Files to create:**
- `proxy.js`

**Logic:**
- `/dashboard/*`, `/deploy/*`, `/api/deploy/*`, `/api/servers/*` require session
- `/`, `/login`, `/api/auth/*` are public
- Redirect unauthenticated users to `/login`

**Acceptance criteria:**
- Direct URL to `/dashboard` without auth → redirects to `/login`
- After login → can access `/dashboard`

---

## Phase 2: Dashboard & Deploy UI (Week 2-3)

### Task 2.1: Dashboard Page

**Goal:** Show user's deployed servers and status.

**Files to create:**
- `app/dashboard/page.js`
- `components/ServerCard.js`

**Features:**
- List servers with status (running, deploying, failed)
- Show server IP, provider, region
- "Deploy New" button
- "Destroy" button per server

**Acceptance criteria:**
- Dashboard renders with user's servers
- Empty state shows "No servers yet — deploy one!"

---

### Task 2.2: Deploy Form Page

**Goal:** Form to select cloud provider, region, and features.

**Files to create:**
- `app/deploy/page.js`
- `components/DeployForm.js`

**Form fields:**
- Cloud provider dropdown (AWS, GCP, DigitalOcean, etc.)
- Region dropdown (dynamic based on provider)
- Features checkboxes (DNS ad-blocking, SSH tunneling)
- "Connect Cloud Account" button (OAuth) or API key input

**Acceptance criteria:**
- Form validates required fields
- OAuth button initiates provider OAuth flow
- API key input validates format
- Submit triggers deployment

---

### Task 2.3: Cloud Provider OAuth Flows

**Goal:** Implement OAuth authorization for each cloud provider.

**Files to create:**
- `app/api/oauth/[provider]/route.js` (initiate)
- `app/api/oauth/[provider]/callback/route.js` (exchange)

**Providers to implement (Phase 2):**
1. DigitalOcean — simplest OAuth, 30-day tokens
2. AWS — Cognito + STS AssumeRoleWithWebIdentity
3. GCP — OAuth + Workload Identity Federation

**For each provider:**
- `/api/oauth/digitalocean` → redirect to DO authorization URL
- `/api/oauth/digitalocean/callback` → exchange code for token, store encrypted
- Token stored encrypted in `CloudAccount` table

**Acceptance criteria:**
- Click "Connect DigitalOcean" → DO auth page → redirect back → token stored
- Token encrypted at rest in database
- Can list connected accounts on deploy page

---

### Task 2.4: API Key Fallback for Non-OAuth Providers

**Goal:** Handle Hetzner, Scaleway, and other providers without OAuth.

**Files to create:**
- `components/ApiKeyInput.js`

**Logic:**
- Text input for API key
- Validate key format before accepting
- Encrypt with KMS before storing in `CloudAccount`
- Set `expiresAt` for auto-cleanup

**Acceptance criteria:**
- Can enter Hetzner API key
- Key encrypted and stored
- Visible in dashboard as "Connected"

---

## Phase 3: Deployment Worker (Week 3-5)

### Task 3.1: Python Worker Setup

**Goal:** Create the Python worker that consumes deployment jobs.

**Files to create:**
- `worker/main.py`
- `worker/requirements.txt`
- `worker/Dockerfile`

**Stack:**
- FastAPI (health check endpoint)
- BullMQ consumer (via `bullmq` Python library)
- ansible-runner (run Algo playbooks)

**Acceptance criteria:**
- `worker/` runs locally with `python main.py`
- Connects to Redis, listens for jobs
- Health endpoint returns 200

---

### Task 3.2: Algo VPN Runner

**Goal:** Wrapper around ansible-runner to invoke Algo playbooks.

**Files to create:**
- `worker/algo/runner.py`
- `worker/algo/config.py`

**Logic:**
```python
def run_algo(provider, region, credentials, features):
    # 1. Generate config.cfg for Algo
    # 2. Write temp inventory
    # 3. Run: ansible-playbook main.yml -e "provider=... region=..."
    # 4. Parse output for server IP, configs
    # 5. Return results
```

**Acceptance criteria:**
- Can deploy a DigitalOcean droplet with WireGuard
- Server IP returned on success
- Config files captured in `configs/` directory

---

### Task 3.3: Provider Credential Exchange

**Goal:** Exchange OAuth tokens for cloud-specific API credentials.

**Files to create:**
- `worker/providers/base.py`
- `worker/providers/aws.py`
- `worker/providers/gcp.py`
- `worker/providers/digitalocean.py`
- `worker/providers/azure.py`

**Each provider implements:**
```python
class CloudProvider(ABC):
    @abstractmethod
    def exchange_token(self, oauth_token) -> CloudCredentials: ...
    
    @abstractmethod
    def validate_credentials(self, creds) -> bool: ...
    
    @abstractmethod
    def get_regions(self) -> list[str]: ...
```

**Acceptance criteria:**
- AWS: OIDC token → STS AssumeRoleWithWebIdentity → temp access_key/secret
- GCP: OAuth token → compute scope access token
- DigitalOcean: OAuth token used directly as API token

---

### Task 3.4: Job Queue Integration

**Goal:** Next.js API creates jobs, worker consumes them.

**Files to create:**
- `lib/queue.js` (Next.js side)
- `worker/main.py` (modify to consume)

**Flow:**
```
POST /api/deploy → validate → create Server record → enqueue job → 202
Worker picks up job → run algo → update Server status → store configs
```

**Acceptance criteria:**
- POST to `/api/deploy` returns 202 with deployment ID
- Worker picks up job within 5 seconds
- Server status updates: pending → deploying → running/failed
- Deployment logs stored in `Deployment` record

---

### Task 3.5: Config File Delivery

**Goal:** Make VPN configs available to the user after deployment.

**Files to create:**
- `app/api/servers/[id]/configs/route.js`

**Features:**
- List available configs (WireGuard .conf, QR codes, Apple profiles)
- Download individual config files
- QR code display in dashboard

**Acceptance criteria:**
- After deployment, configs visible in dashboard
- Can download `.conf` file
- Can view QR code for mobile import

---

## Phase 4: Security & Hardening (Week 5-6)

### Task 4.1: KMS Envelope Encryption

**Goal:** Encrypt cloud credentials at rest using AWS KMS.

**Files to create:**
- `worker/crypto.py`
- `lib/crypto.js`

**Logic:**
- Generate data key via KMS `GenerateDataKey`
- Encrypt credentials with data key
- Store encrypted blob + encrypted data key in DB
- Decrypt only at deployment time

**Acceptance criteria:**
- Credentials encrypted in database (not plaintext)
- Decryption works during deployment
- KMS key rotation supported

---

### Task 4.2: Credential Auto-Expiry

**Goal:** Automatically expire and clean up old credentials.

**Files to create:**
- `worker/cleanup.py` (scheduled task)

**Logic:**
- Cron job runs daily
- Delete `CloudAccount` records past `expiresAt`
- Terminate VPN servers past expiry (optional)
- Send notification email before expiry

**Acceptance criteria:**
- Expired credentials deleted from DB
- User notified before expiry

---

### Task 4.3: Audit Logging

**Goal:** Log all deployment actions for security.

**Files to create:**
- `prisma/schema.prisma` (add AuditLog model)
- `lib/audit.js`

**Events to log:**
- User login/logout
- Cloud account connected/disconnected
- Deployment triggered/completed/failed
- Server destroyed
- Config downloaded

**Acceptance criteria:**
- All actions logged with user ID, timestamp, action type
- Logs queryable via API

---

### Task 4.4: Rate Limiting

**Goal:** Prevent abuse of deployment endpoints.

**Files to create:**
- `lib/ratelimit.js`

**Limits:**
- Deploy: 5 per hour per user
- OAuth callback: 10 per hour per IP
- Config download: 50 per hour per user

**Acceptance criteria:**
- Exceeding limits returns 429
- Limits configurable via environment

---

## Phase 5: Polish & Deploy (Week 6-8)

### Task 5.1: Error Handling & User Feedback

**Goal:** Graceful error handling throughout the app.

**Files to modify:**
- All API routes
- Deploy form
- Dashboard

**Scenarios to handle:**
- OAuth provider down → "Try again later"
- Algo deployment fails → show error logs, suggest retry
- Invalid API key → clear error message
- Region unavailable → show alternative regions

**Acceptance criteria:**
- No unhandled promise rejections
- User sees actionable error messages
- Failed deployments can be retried

---

### Task 5.2: Server Destroy Flow

**Goal:** Users can destroy their VPN servers.

**Files to create/modify:**
- `app/api/servers/[id]/destroy/route.js`
- `worker/providers/*/destroy.py`

**Logic:**
- Call cloud provider API to terminate instance
- Clean up security groups, VPCs, key pairs
- Update server status to "destroyed"
- Remove encrypted configs

**Acceptance criteria:**
- Click "Destroy" → confirmation dialog → server terminated
- Cloud resources cleaned up
- Status updated in dashboard

---

### Task 5.3: Landing Page Integration

**Goal:** Update landing page to link to SaaS instead of Gumroad.

**Files to modify:**
- `app/page.js`

**Changes:**
- Replace "Deploy your private VPN in 15 mins" CTA → "Start Free" → `/login`
- Remove Gumroad links
- Add pricing section (if applicable)
- Update meta tags

**Acceptance criteria:**
- All CTAs point to `/login`
- No broken links to Gumroad

---

### Task 5.4: Docker Compose for Local Dev

**Goal:** One-command local development setup.

**Files to create:**
- `docker-compose.yml`

**Services:**
- `app` (Next.js on :3000)
- `worker` (Python worker)
- `postgres` (:5432)
- `redis` (:6379)
- `algo` (Algo VPN in container, optional)

**Acceptance criteria:**
- `docker compose up` starts all services
- Can complete full deploy flow locally

---

### Task 5.5: CI/CD Pipeline

**Goal:** Automated testing and deployment.

**Files to create:**
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`

**CI steps:**
- Lint Next.js (`next lint`)
- Type check (if TypeScript added)
- Run Prisma migrations
- Build Next.js
- Build worker Docker image

**Deploy steps:**
- Deploy frontend to Vercel
- Deploy worker to ECS/Fargate
- Run database migrations

**Acceptance criteria:**
- PR triggers CI checks
- Merge to main triggers deploy
- Deployment status visible in GitHub

---

## Task Summary

| Phase | Tasks | Duration | Dependencies |
|-------|-------|----------|--------------|
| 1: Setup & Auth | 4 tasks | Week 1-2 | None |
| 2: Dashboard & UI | 4 tasks | Week 2-3 | Phase 1 |
| 3: Worker | 5 tasks | Week 3-5 | Phase 1 |
| 4: Security | 4 tasks | Week 5-6 | Phase 3 |
| 5: Polish | 5 tasks | Week 6-8 | All |

**Total: 22 tasks, ~8 weeks**

---

## Agent Assignment Rules

- **Frontend agent**: Tasks 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 5.1, 5.3
- **Backend agent**: Tasks 1.1, 1.2, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 5.2
- **DevOps agent**: Tasks 5.4, 5.5

Each task includes all files to create/modify and acceptance criteria for
verification. Tasks are independent within phases where possible.
