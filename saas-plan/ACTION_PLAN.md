# ACTION_PLAN.md — Step-by-Step Implementation

This is the ordered execution plan for building the SelfVPN SaaS. Follow these
steps sequentially. Each step produces a working, testable increment.

---

# Step Execution Status

Last updated: 2026-09-12

| Step | Title | Status |
|------|-------|--------|
| 1 | Project Bootstrap | [x] Done |
| 2 | Database Schema | [x] Done |
| 3 | Google OAuth Login | [x] Done |
| 4 | Dashboard UI | [x] Done |
| 5 | Deploy Form | [x] Done |
| 6 | DigitalOcean OAuth | [x] Code done — creds wired, live E2E pending |
| 7 | Python Worker Skeleton | [x] Done |
| 8 | Algo VPN Runner | [x] Code done — live droplet deploy pending |
| 9 | Provider Credential Exchange | [ ] Pending (thin base/registry + DigitalOcean scoped) |
| 10 | Job Queue Integration | [ ] Pending |
| 11 | Config File Delivery | [ ] Pending |
| 12 | KMS Encryption | [ ] Pending |
| 13 | AWS & GCP OAuth | [ ] Pending |
| 14 | Server Destroy Flow | [ ] Pending |
| 15 | Error Handling | [ ] Pending |
| 16 | Audit Logging | [ ] Pending |
| 17 | Rate Limiting | [ ] Pending |
| 18 | Landing Page Update | [ ] Pending |
| 19 | Docker Compose | [ ] Pending |
| 20 | CI/CD | [ ] Pending |

## Implementation Notes / Deviations

- **Next.js pinned to `16.3.4`** (plan said 15). It ships no `exports` map, so
  ESM subpaths like `next/server` don't resolve; workaround is
  `transpilePackages: ['next-auth']` in `next.config.js` (CJS `module.exports`).
- **DigitalOcean OAuth credentials are wired** into `.env.local` / `.env`
  (`DIGITALOCEAN_CLIENT_ID`, `DIGITALOCEAN_CLIENT_SECRET`). Registered
  redirect URIs:
  - `https://selfvpn.8bitlabs.dev/api/oauth/digitalocean/callback`
  - `http://localhost:3000/api/oauth/digitalocean/callback`
  Scope: `read write`. Live connect flow not yet verified end-to-end.
- **Port 8000 is taken by Plausible** (running container), so the worker runs
  locally on **8100**; inside its Docker image uvicorn binds 8000.
- **Python toolchain**: no system pip/venv (no `uv` on PATH). Worker venv at
  `worker/.venv` built from uv-managed 3.11 (`/home/dappnode/.local/bin/python3.11`).
- Container services: `selfvpn-postgres` (Postgres 16, :5432) and
  `selfvpn-redis` (Redis 7, :6379).
- Worker env vars: `REDIS_URL` (default `redis://localhost:6379`),
  `BULLMQ_QUEUE` (default `deployments`).

---

## Step 1: Project Bootstrap [x] DONE

**Duration:** 1 day

```bash
# Upgrade Next.js
pnpm add next@latest react@latest react-dom@latest

# Install auth
pnpm add next-auth@beta @auth/prisma-adapter @prisma/client
pnpm add -D prisma

# Install infrastructure
pnpm add bullmq ioredis @aws-sdk/client-kms @aws-sdk/client-sts

# Initialize Prisma
npx prisma init

# Create .env.local
cat > .env.local << 'EOF'
DATABASE_URL=postgresql://user:pass@localhost:5432/selfvpn
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=$(openssl rand -base64 32)
REDIS_URL=redis://localhost:6379
AWS_REGION=us-east-1
KMS_KEY_ID=
EOF
```

**Verify:** `pnpm dev` starts, Prisma generates client.

---

## Step 2: Database Schema [x] DONE

**Duration:** 0.5 day

1. Write `prisma/schema.prisma` with User, Server, CloudAccount, Deployment models
2. Run `npx prisma db push` (requires running PostgreSQL)
3. Run `npx prisma generate`

**Verify:** `npx prisma studio` shows empty tables.

---

## Step 3: Google OAuth Login [x] DONE

**Duration:** 1 day

1. Create Google OAuth app at https://console.cloud.google.com/apis/credentials
2. Set redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Create `lib/auth.js` with NextAuth config
4. Create `app/api/auth/[...nextauth]/route.js`
5. Create `app/login/page.js` with "Sign in with Google" button
6. Create `components/AuthProvider.js`
7. Wrap `_app.js` with AuthProvider
8. Create `proxy.js` for route protection

**Verify:** Can sign in via Google, session persists, `/dashboard` protected.

---

## Step 4: Dashboard UI [x] DONE

**Duration:** 1 day

1. Create `app/dashboard/page.js`
   - Fetch user's servers from API
   - Render list with status badges
   - "Deploy New Server" button
2. Create `components/ServerCard.js`
   - Shows provider, region, IP, status
   - "Destroy" button
3. Create `app/api/servers/route.js`
   - GET: list user's servers
   - Requires authenticated session

**Verify:** Dashboard renders, shows "No servers yet" empty state.

---

## Step 5: Deploy Form [x] DONE

**Duration:** 1 day

1. Create `app/deploy/page.js`
2. Create `components/DeployForm.js`
   - Provider dropdown (AWS, GCP, DigitalOcean, Linode, Vultr, Hetzner, Azure)
   - Region dropdown (populated per provider)
   - Feature checkboxes (ad-blocking, SSH tunneling)
   - Cloud account section (OAuth connect or API key input)
3. Create `components/ApiKeyInput.js`
   - Text input with validation
   - Encrypt before storing

**Verify:** Form renders, validates inputs, shows connect options.

---

## Step 6: DigitalOcean OAuth (First Provider) [x] CODE DONE — LIVE E2E PENDING

**Duration:** 1 day

1. Create DigitalOcean app at https://cloud.digitalocean.com/account/api/applications
2. Set callback URL: `http://localhost:3000/api/oauth/digitalocean/callback`
3. Create `app/api/oauth/[provider]/route.js`
   - Build authorization URL
   - Redirect to DigitalOcean
4. Create `app/api/oauth/[provider]/callback/route.js`
   - Exchange code for token
   - Store encrypted in CloudAccount
5. Wire up deploy form "Connect DigitalOcean" button

**Verify:** Click connect → DO auth page → redirect back → account appears in form.

---

## Step 7: Python Worker Skeleton [x] DONE

**Duration:** 1 day

1. Create `worker/` directory
2. Create `worker/requirements.txt`:
   ```
   fastapi
   uvicorn
   bullmq
   ansible-runner
   boto3
   python-digitalocean
   cryptography
   ```
3. Create `worker/main.py`:
   - FastAPI app with `/health` endpoint
   - BullMQ consumer listening for deployment jobs
   - Job handler that logs received job
4. Create `worker/Dockerfile`
5. Test with `docker compose up`

**Verify:** Worker starts, connects to Redis, health endpoint returns 200.

---

## Step 8: Algo VPN Runner [x] CODE DONE — LIVE DROPLET DEPLOY PENDING

**Duration:** 2 days

1. Clone Algo VPN into `worker/algo/` or install as submodule
2. Create `worker/algo/config.py`:
   - Generate `config.cfg` from deployment parameters
   - Write temporary inventory file
3. Create `worker/algo/runner.py`:
   ```python
   import ansible_runner
   
   def run_deployment(provider, region, credentials, features):
       # Generate config
       # Run ansible-playbook main.yml -e "provider=... region=..."
       # Parse output
       # Return server IP, config paths
   ```
4. Test with DigitalOcean (simplest):
   ```bash
   python -c "from algo.runner import run_deployment; 
              run_deployment('digitalocean', 'nyc3', {'do_token': '...'}, {})"
   ```

**Verify:** Algo deploys a Droplet with WireGuard, returns server IP.

---

## Step 9: Provider Credential Exchange [ ] PENDING — SCOPED

> Scoping decision: implement in Step 9 only a thin provider layer
> (`base.py` + `registry.py` + `digitalocean.py`) needed by Step 10. AWS/GCP/Azure
> credential exchange moves to Step 13, where their OAuth flows are implemented
> (their OAuth routes do not exist yet, so building exchange now is speculative).

**Duration:** 2 days

1. Create `worker/providers/base.py`:
   ```python
   class CloudProvider(ABC):
       def exchange_token(self, token) -> CloudCredentials: ...
       def validate_credentials(self, creds) -> bool: ...
       def get_regions(self) -> list[str]: ...
   ```
2. Create `worker/providers/digitalocean.py`:
   - Token passed directly as `do_token`
3. Create `worker/providers/aws.py`:
   - OIDC token → `sts.assume_role_with_web_identity()` → temp creds
4. Create `worker/providers/gcp.py`:
   - OAuth token → compute scope token
5. Create `worker/providers/azure.py`:
   - Federated identity → temp creds

**Verify:** Each provider returns valid temp credentials from OAuth token.

---

## Step 10: Job Queue Integration

**Duration:** 1 day

1. Create `lib/queue.js`:
   ```javascript
   import { Queue } from 'bullmq'
   const deployQueue = new Queue('deployments', { connection: { host: 'localhost', port: 6379 } })
   
   export async function enqueueDeployment(serverId, provider, region, credentials, features) {
     return deployQueue.add('deploy', { serverId, provider, region, credentials, features })
   }
   ```
2. Create `app/api/deploy/route.js`:
   - POST: validate input → create Server record → enqueue job → return 202
3. Update `worker/main.py` to consume jobs:
   - Receive job → call `run_deployment()` → update Server status → store configs

**Verify:** POST to `/api/deploy` → worker picks up job → server status updates.

---

## Step 11: Config File Delivery

**Duration:** 1 day

1. After deployment, Algo generates configs in `configs/<IP>/`
2. Worker copies relevant files to encrypted storage (S3 or local)
3. Create `app/api/servers/[id]/configs/route.js`:
   - GET: list configs for server
   - GET `?file=wireguard/<user>.conf`: download config
4. Update dashboard to show config download links and QR codes

**Verify:** After deployment, can download .conf file and view QR code.

---

## Step 12: KMS Encryption

**Duration:** 1 day

1. Create AWS KMS key (or use `aws kms create-key`)
2. Create `worker/crypto.py`:
   ```python
   import boto3
   from cryptography.fernet import Fernet
   
   class KMSEncryptor:
       def __init__(self, key_id):
           self.kms = boto3.client('kms')
           self.key_id = key_id
       
       def encrypt(self, plaintext):
           # Generate data key
           response = self.kms.generate_data_key(KeyId=self.key_id, KeySpec='AES_256')
           # Encrypt with data key
           cipher = Fernet(base64.urlsafe_b64encode(response['Plaintext'][:32]))
           encrypted = cipher.encrypt(plaintext.encode())
           # Return encrypted data + encrypted data key
           return {
               'encrypted_data': encrypted,
               'encrypted_key': response['CiphertextBlob']
           }
       
       def decrypt(self, encrypted_data, encrypted_key):
           # Decrypt data key
           response = self.kms.decrypt(CiphertextBlob=encrypted_key)
           # Decrypt data
           cipher = Fernet(base64.urlsafe_b64encode(response['Plaintext'][:32]))
           return cipher.decrypt(encrypted_data).decode()
   ```
3. Update all credential storage to use encryptor

**Verify:** Credentials stored encrypted in DB, decrypted only during deployment.

---

## Step 13: AWS & GCP OAuth

**Duration:** 2 days

1. **AWS:**
   - Create Cognito User Pool or IAM Identity Center
   - Configure OAuth app
   - Create `app/api/oauth/aws/route.js` + callback
   - Worker: exchange Cognito token for STS credentials

2. **GCP:**
   - Create GCP OAuth client
   - Configure Workload Identity Federation
   - Create `app/api/oauth/gcp/route.js` + callback
   - Worker: exchange token for compute access token

**Verify:** Can connect AWS and GCP accounts, deploy to each.

---

## Step 14: Server Destroy Flow

**Duration:** 1 day

1. Create `app/api/servers/[id]/destroy/route.js`:
   - POST: set status to "destroying" → enqueue destroy job
2. Create `worker/providers/*/destroy.py`:
   - AWS: `ec2.terminate_instances()`
   - GCP: `compute.delete()`
   - DO: `droplet.destroy()`
3. Update dashboard with destroy confirmation dialog

**Verify:** Click destroy → server terminated → status updated → resources cleaned up.

---

## Step 15: Error Handling

**Duration:** 1 day

1. Add try/catch to all API routes
2. Add error boundaries to React components
3. Add deployment error logs to dashboard
4. Handle specific errors:
   - OAuth provider down → "Provider unavailable, try later"
   - Invalid credentials → "Could not authenticate with [provider]"
   - Deployment failed → show Ansible logs, "Retry" button
   - Rate limited → "Too many requests, wait X minutes"

**Verify:** All error paths show user-friendly messages.

---

## Step 16: Audit Logging

**Duration:** 0.5 day

1. Add AuditLog model to schema
2. Create `lib/audit.js`:
   ```javascript
   export async function logAudit(userId, action, details) {
     await prisma.auditLog.create({ data: { userId, action, details } })
   }
   ```
3. Add logging calls to: login, deploy, destroy, config download

**Verify:** Actions logged in database.

---

## Step 17: Rate Limiting

**Duration:** 0.5 day

1. Create `lib/ratelimit.js` using Redis sliding window
2. Apply to:
   - `POST /api/deploy`: 5/hour
   - `POST /api/servers/*/destroy`: 3/hour
   - `GET /api/servers/*/configs`: 50/hour

**Verify:** Exceeding limits returns 429 with retry-after header.

---

## Step 18: Landing Page Update

**Duration:** 0.5 day

1. Update `app/page.js`:
   - Replace CTA: "Deploy your private VPN in 15 mins" → "Start Free" → `/login`
   - Remove all Gumroad links
   - Add "Login" link in header

**Verify:** No broken links, all CTAs point to app.

---

## Step 19: Docker Compose

**Duration:** 0.5 day

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports: ["3000:3000"]
    env_file: .env.local
    depends_on: [postgres, redis]
  
  worker:
    build: ./worker
    env_file: .env.local
    depends_on: [postgres, redis]
    volumes:
      - algo:/opt/algo/configs
  
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: selfvpn
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes: [pgdata:/var/lib/postgresql/data]
  
  redis:
    image: redis:7-alpine

volumes:
  pgdata:
  algo:
```

**Verify:** `docker compose up` starts all services, full flow works.

---

## Step 20: CI/CD

**Duration:** 1 day

1. Create `.github/workflows/ci.yml`:
   - On PR: lint, build, type-check
2. Create `.github/workflows/deploy.yml`:
   - On push to main: deploy frontend (Vercel), deploy worker (ECS)
3. Add environment secrets to GitHub

**Verify:** PR triggers CI, merge triggers deploy.

---

## Completion Checklist

Current state after Steps 1–8 (Steps 9+ not started):

- [x] Google OAuth login works
- [x] Dashboard shows servers
- [ ] Can connect DigitalOcean via OAuth (code done, live E2E pending)
- [ ] Can enter Hetzner API key (input exists in form; persistence path pending)
- [ ] Deploy form submits successfully (creates records; no queue yet)
- [ ] Worker picks up deployment job (skeleton only — no `/api/deploy` enqueue)
- [ ] Algo provisions VPN server (runner done; live droplet deploy pending)
- [ ] Config files downloadable
- [ ] Can destroy server
- [ ] Credentials encrypted at rest
- [ ] Error messages user-friendly
- [ ] Rate limiting active
- [ ] Landing page links to app
- [ ] Docker Compose works locally
- [ ] CI/CD pipeline running

**Estimated total: 20 steps, ~8 weeks for one developer.**
