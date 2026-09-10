# OAuth/Identity Federation Research for Algo VPN Cloud Providers

## Executive Summary

This document details OAuth 2.0 and OIDC capabilities for each cloud provider supported by Algo VPN, focusing on programmatic access for VM provisioning. Key findings:

- **AWS**: Most mature OAuth/OIDC support with IAM Identity Center, Cognito, and native OIDC federation
- **GCP**: Strong OAuth 2.0 support with Workload Identity Federation for cross-cloud scenarios
- **Azure**: Full OAuth 2.0/OIDC support via Entra ID with federated identity credentials
- **DigitalOcean**: OAuth 2.0 authorization code flow with personal access tokens
- **Linode/Akamai**: OAuth 2.0 authorization code and implicit flows
- **Vultr**: OAuth 2.0 with OIDC provider support and PKCE
- **Hetzner**: Limited to API tokens; no official OAuth 2.0 for programmatic access
- **Scaleway**: OAuth 2.0 via IAM with SAML/OIDC federation for SSO

---

## 1. AWS (IAM Identity Center, Cognito, Native OAuth)

### 1.1 OAuth 2.0/OIDC Support
**Yes** - AWS provides multiple OAuth/OIDC mechanisms:
- **IAM Identity Center (SSO)**: OIDC-based with Device Authorization Grant
- **Amazon Cognito**: Full OIDC provider
- **IAM Roles with OIDC Identity Providers**: For workload identity federation

### 1.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **Device Authorization Grant (RFC 8628)** | CLI/Headless tools | `https://device.sso.amazonaws.com` |
| **Authorization Code** | Web applications | `https://your-instance.awsapps.com/start` |
| **Client Credentials** | Service-to-service | Via Cognito or IAM |
| **Token Exchange (RFC 8693)** | Cross-account/cross-cloud | `sts.amazonaws.com` |

### 1.3 Permissions/Scopes for VM Provisioning
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:RunInstances",
        "ec2:CreateTags",
        "ec2:TerminateInstances",
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus"
      ],
      "Resource": "*"
    }
  ]
}
```

**IAM Identity Center Scopes:**
- `openid` - Basic OIDC scope
- `aws` - AWS account access
- `sts:identity_context` - For trusted identity propagation

### 1.4 Temporary API Credentials
**Yes** - AWS provides temporary credentials via:
- **STS AssumeRoleWithWebIdentity**: Exchange OIDC token for AWS credentials
- **STS AssumeRole**: Get temporary credentials (15 min - 12 hours)
- **IAM Identity Center sessions**: Up to 90 days with refresh tokens

```python
import boto3

# Get temporary credentials via OIDC federation
sts_client = boto3.client('sts')
response = sts_client.assume_role_with_web_identity(
    RoleArn='arn:aws:iam::123456789012:role/algo-vpn-provisioner',
    RoleSessionName='algo-vpn-session',
    WebIdentityToken=oidc_token,
    DurationSeconds=3600
)

# Use temporary credentials
credentials = response['Credentials']
ec2_client = boto3.client(
    'ec2',
    aws_access_key_id=credentials['AccessKeyId'],
    aws_secret_access_key=credentials['SecretAccessKey'],
    aws_session_token=credentials['SessionToken']
)
```

### 1.5 Limitations
| Limitation | Value |
|------------|-------|
| Access token lifetime | 1 hour (default) |
| STS session duration | 15 min - 12 hours |
| Refresh token lifetime | Configurable (up to 90 days) |
| OIDC token lifetime | 15 min - 1 hour |
| Max concurrent sessions | Varies by provider |

### 1.6 SDK Support
```python
# AWS SDK (boto3) - Built-in OIDC support
import boto3
from botocore.config import Config

config = Config(
    signature_version='v4',
    sso_regional_endpoint='us-east-1'
)

# Via IAM Identity Center
session = boto3.Session(profile_name='your-sso-profile')
client = session.client('ec2')
```

**Libraries:**
- `boto3` - AWS SDK for Python (native SSO support)
- `aws-sdk-js-v3` - JavaScript SDK
- `aws-sdk-go-v2` - Go SDK

---

## 2. Google Cloud Platform (GCP)

### 2.1 OAuth 2.0/OIDC Support
**Yes** - GCP provides comprehensive OAuth 2.0 support:
- **OAuth 2.0 for Web Server Applications**
- **OAuth 2.0 for Desktop Applications**
- **OAuth 2.0 for Mobile and Native Apps**
- **Service Account OAuth 2.0**
- **Workload Identity Federation**

### 2.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **Authorization Code** | Web apps | `https://accounts.google.com/o/oauth2/auth` |
| **Device Authorization Grant** | CLI/Headless | `https://oauth2.googleapis.com/device/code` |
| **Service Account (JWT Bearer)** | Server-to-server | `https://oauth2.googleapis.com/token` |
| **Implicit** | Client-side apps | `https://accounts.google.com/o/oauth2/auth` |

### 2.3 Permissions/Scopes for VM Provisioning
```
# Full Compute Engine access
https://www.googleapis.com/auth/compute

# Or more granular:
https://www.googleapis.com/auth/compute.readonly
https://www.googleapis.com/auth/cloud-platform
```

**IAM Roles for Service Accounts:**
```bash
# Grant Compute Engine admin role
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
    --role="roles/compute.admin"
```

### 2.4 Temporary API Credentials
**Yes** - GCP provides temporary credentials via:
- **Access tokens**: 1 hour lifetime (from OAuth 2.0)
- **Service account impersonation**: Short-lived credentials
- **Workload Identity Federation**: Exchange external tokens for GCP credentials

```python
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import requests

# Get access token via service account
credentials = service_account.Credentials.from_service_account_file(
    'service-account.json',
    scopes=['https://www.googleapis.com/auth/compute']
)
credentials.refresh(Request())

# Use access token
headers = {'Authorization': f'Bearer {credentials.token}'}
response = requests.get(
    'https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances',
    headers=headers
)
```

**Workload Identity Federation:**
```python
import google.auth
from google.auth import externalaccount

# Load workload identity federation configuration
credentials = externalaccount.Credentials.from_file(
    'credential_config.json',
    scopes=['https://www.googleapis.com/auth/compute']
)
```

### 2.5 Limitations
| Limitation | Value |
|------------|-------|
| Access token lifetime | 1 hour |
| Refresh token lifetime | 7 days (testing), 6 months (production) |
| Max refresh tokens per user | 100 per OAuth client ID |
| Service account key lifetime | Manual rotation required |
| Workload identity token | 1 hour |

### 2.6 SDK Support
```python
# Google Cloud SDK
from google.cloud import compute_v1
from google.auth import default

# Application Default Credentials (ADC)
credentials, project = default(
    scopes=['https://www.googleapis.com/auth/compute']
)

client = compute_v1.InstancesClient(credentials=credentials)
```

**Libraries:**
- `google-cloud-python` - Official GCP Python SDK
- `google-auth` - Google authentication library
- `googleapis` - Node.js client

---

## 3. DigitalOcean

### 3.1 OAuth 2.0/OIDC Support
**Yes** - DigitalOcean supports OAuth 2.0:
- **Authorization Code Flow** (web applications)
- **Implicit Flow** (client-side applications)
- **Personal Access Tokens** (API authentication)

### 3.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **Authorization Code** | Web apps | `https://cloud.digitalocean.com/v1/oauth/authorize` |
| **Implicit** | Client-side apps | `https://cloud.digitalocean.com/v1/oauth/authorize` |
| **Token Refresh** | Token renewal | `https://cloud.digitalocean.com/v1/oauth/token` |

### 3.3 Permissions/Scopes for VM Provisioning
```bash
# Scopes for Droplet management
scope="read write"

# Or granular scopes:
scope="droplet:create droplet:read droplet:delete"
```

**Available Scopes:**
- `read` - Read-only access
- `write` - Read/write access
- `droplet:create` - Create droplets
- `droplet:read` - Read droplet info
- `droplet:delete` - Delete droplets
- `api:read` - Read-only API access
- `api:write` - Full API access

### 3.4 Temporary API Credentials
**Limited** - DigitalOcean provides:
- **Access tokens**: 30 days lifetime
- **Refresh tokens**: Single-use, rotates on each refresh
- **Personal access tokens**: Configurable expiration

```python
import requests

# Exchange authorization code for access token
token_response = requests.post(
    'https://cloud.digitalocean.com/v1/oauth/token',
    data={
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'redirect_uri': 'https://your-app.com/callback'
    }
)

access_token = token_response.json()['access_token']

# Create a Droplet
headers = {'Authorization': f'Bearer {access_token}'}
response = requests.post(
    'https://api.digitalocean.com/v2/droplets',
    headers=headers,
    json={
        'name': 'algo-vpn',
        'region': 'nyc3',
        'size': 's-1vcpu-1gb',
        'image': 'ubuntu-22-04-x64'
    }
)
```

### 3.5 Limitations
| Limitation | Value |
|------------|-------|
| Access token lifetime | 30 days |
| Refresh token lifetime | Single-use (rotates) |
| Max refresh tokens | Not documented |
| Token expiration | Configurable for PAT |

### 3.6 SDK Support
```python
# DigitalOcean Python SDK
from digitalocean import DigitalOcean

do = DigitalOcean(token=access_token)
droplet = do.Droplet(
    name='algo-vpn',
    region='nyc3',
    image='ubuntu-22-04-x64',
    size='s-1vcpu-1gb'
)
droplet.create()
```

**Libraries:**
- `python-digitalocean` - Python SDK
- `doctl` - Official CLI tool

---

## 4. Microsoft Azure

### 4.1 OAuth 2.0/OIDC Support
**Yes** - Azure provides comprehensive OAuth 2.0/OIDC:
- **Microsoft Entra ID (Azure AD)**
- **Service Principals with OIDC**
- **Managed Identities**
- **Workload Identity Federation**

### 4.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **Authorization Code** | Web apps | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize` |
| **Device Code** | CLI/Headless | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/devicecode` |
| **Client Credentials** | Service-to-service | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` |
| **On-Behalf-Of** | Middle-tier apps | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` |
| **OIDC Federation** | Cross-cloud | Via federated identity credentials |

### 4.3 Permissions/Scopes for VM Provisioning
```
# Azure Resource Manager scopes
user_impersonation  # Impersonate user
access_as_user      # Access as user

# Specific API permissions
Microsoft.Compute/*
Microsoft.Network/*
Microsoft.Resources/*
```

**RBAC Roles:**
```bash
# Assign Contributor role to service principal
az role assignment create \
    --assignee APP_ID \
    --role "Contributor" \
    --scope "/subscriptions/{subscription-id}/resourceGroups/{rg-name}"
```

### 4.4 Temporary API Credentials
**Yes** - Azure provides temporary credentials via:
- **Managed Identity tokens**: 1 hour lifetime
- **Service principal tokens**: Configurable (1 min - hours)
- **Federated identity credentials**: OIDC-based

```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.compute import ComputeManagementClient

# Get credentials via OIDC federation
credential = DefaultAzureCredential()

# Create compute client
compute_client = ComputeManagementClient(
    credential=credential,
    subscription_id="your-subscription-id"
)

# Create a VM
compute_client.virtual_machines.begin_create_or_update(
    resource_group_name="myResourceGroup",
    vm_name="algo-vpn",
    parameters={
        "location": "eastus",
        "hardware_profile": {"vm_size": "Standard_DS1_v2"},
        "storage_profile": {
            "image_reference": {
                "publisher": "Canonical",
                "offer": "UbuntuServer",
                "sku": "22_04-lts",
                "version": "latest"
            }
        },
        "os_profile": {
            "computer_name": "algo-vpn",
            "admin_username": "azureuser"
        },
        "network_profile": {
            "network_interfaces": [{"id": nic_id}]
        }
    }
)
```

**OIDC Federation (GitHub Actions):**
```yaml
- name: Azure Login
  uses: azure/login@v2
  with:
    client-id: ${{ secrets.AZURE_CLIENT_ID }}
    tenant-id: ${{ secrets.AZURE_TENANT_ID }}
    subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

### 4.5 Limitations
| Limitation | Value |
|------------|-------|
| Access token lifetime | 1 hour (default) |
| Refresh token lifetime | Configurable (up to 90 days) |
| Managed identity token | 1 hour |
| Federated credential token | 1 hour |
| Max concurrent sessions | 100 per user |

### 4.6 SDK Support
```python
# Azure SDK
from azure.identity import ClientSecretCredential
from azure.mgmt.compute import ComputeManagementClient

# Via service principal with secret
credential = ClientSecretCredential(
    tenant_id="your-tenant-id",
    client_id="your-client-id",
    client_secret="your-client-secret"
)

# Via OIDC
from azure.identity import OIDCCredential
credential = OIDCCredential(
    tenant_id="your-tenant-id",
    client_id="your-client-id",
    token_url="https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token"
)
```

**Libraries:**
- `azure-identity` - Azure Identity library
- `azure-mgmt-compute` - Compute management client
- `azure-sdk-for-python` - Official Python SDK

---

## 5. Linode/Akamai

### 5.1 OAuth 2.0/OIDC Support
**Yes** - Linode supports OAuth 2.0:
- **Authorization Code Flow** (private workflow)
- **Implicit Flow** (public workflow)
- **Personal Access Tokens**

### 5.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **Authorization Code** | Web apps | `https://login.linode.com/oauth/authorize` |
| **Implicit** | Client-side apps | `https://login.linode.com/oauth/authorize` |
| **Token Refresh** | Token renewal | `https://login.linode.com/oauth/token` |

### 5.3 Permissions/Scopes for VM Provisioning
```bash
# Linode-specific scopes
scope="linodes:read_write"

# Or all Linode access
scope="*"

# Granular scopes:
scope="linodes:read_only linodes:read_write"
```

**Available Scopes:**
- `linodes:read_only` - View Linodes
- `linodes:read_write` - Manage Linodes
- `account:read_only` - View account
- `account:read_write` - Manage account
- `volumes:read_write` - Manage volumes
- `nodebalancers:read_write` - Manage load balancers

### 5.4 Temporary API Credentials
**Limited** - Linode provides:
- **Access tokens**: 2 hours lifetime
- **Refresh tokens**: Single-use
- **Personal access tokens**: Configurable expiration

```python
import requests

# Exchange authorization code
token_response = requests.post(
    'https://login.linode.com/oauth/token',
    data={
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET'
    }
)

access_token = token_response.json()['access_token']

# Create a Linode instance
headers = {'Authorization': f'Bearer {access_token}'}
response = requests.post(
    'https://api.linode.com/v4/linode/instances',
    headers=headers,
    json={
        'type': 'g6-nanode-1',
        'region': 'us-east',
        'image': 'linode/ubuntu22.04',
        'label': 'algo-vpn',
        'root_pass': 'secure-password'
    }
)
```

### 5.5 Limitations
| Limitation | Value |
|------------|-------|
| Access token lifetime | 2 hours |
| Refresh token lifetime | Single-use |
| Personal access token lifetime | Configurable (up to 1 year) |
| Max concurrent sessions | Not documented |

### 5.6 SDK Support
```python
# Linode Python SDK
from linode_api4 import LinodeClient, LinodeInstance

client = LinodeClient(token=access_token)

# Create a Linode instance
linode = client.linode.instance_create(
    LinodeInstance.Type('g6-nanode-1'),
    LinodeInstance.Region('us-east'),
    image='linode/ubuntu22.04',
    label='algo-vpn',
    root_pass='secure-password'
)
```

**Libraries:**
- `linode-api4` - Official Python SDK
- `linode-cli` - Official CLI tool

---

## 6. Vultr

### 6.1 OAuth 2.0/OIDC Support
**Yes** - Vultr supports OAuth 2.0:
- **Authorization Code Flow** with PKCE
- **OIDC Provider** support
- **Personal Access Tokens**

### 6.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **Authorization Code** | Web apps | `https://api.vultr.com/v2/oauth/authorize` |
| **Token Exchange** | Token swap | `https://api.vultr.com/v2/oidc/provider/{id}/token` |
| **Token Refresh** | Token renewal | `https://api.vultr.com/v2/oidc/provider/{id}/token` |

### 6.3 Permissions/Scopes for VM Provisioning
```bash
# Vultr scopes for instance management
scope="instance:create instance:read instance:delete"

# Or full access
scope="*"
```

**Available Scopes:**
- `instance:create` - Create instances
- `instance:read` - Read instance info
- `instance:delete` - Delete instances
- `account:read` - Read account info
- `api:read` - Read API access
- `api:write` - Write API access

### 6.4 Temporary API Credentials
**Yes** - Vultr provides temporary credentials via:
- **Access tokens**: 1 hour lifetime
- **Refresh tokens**: 30-day sliding expiry, rotates on use

```python
import requests
import base64

# Exchange authorization code for tokens
token_response = requests.post(
    'https://api.vultr.com/v2/oidc/provider/{provider-id}/token',
    headers={
        'Authorization': f'Basic {base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()}',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data={
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'redirect_url': 'https://your-app.com/callback'
    }
)

access_token = token_response.json()['access_token']
refresh_token = token_response.json()['refresh_token']

# Create an instance
headers = {'Authorization': f'Bearer {access_token}'}
response = requests.post(
    'https://api.vultr.com/v2/instances',
    headers=headers,
    json={
        'region': 'ewr',
        'plan': 'vc2-1c-1gb',
        'os_id': 401,  # Ubuntu 22.04
        'label': 'algo-vpn'
    }
)
```

### 6.5 Limitations
| Limitation | Value |
|------------|-------|
| Access token lifetime | 1 hour |
| Refresh token lifetime | 30 days (sliding) |
| Refresh token rotation | Single-use |
| Authorization code lifetime | 10 minutes |

### 6.6 SDK Support
```python
# Vultr Python SDK (unofficial)
import vultr

client = vultr.Client(api_key=access_token)
instance = client.instances.create(
    region='ewr',
    plan='vc2-1c-1gb',
    os_id=401,
    label='algo-vpn'
)
```

**Libraries:**
- `vultr` - Unofficial Python SDK
- `vultr-cli` - Unofficial CLI tool

---

## 7. Hetzner Cloud

### 7.1 OAuth 2.0/OIDC Support
**Limited** - Hetzner Cloud uses API tokens:
- **API Tokens** (per-project, bearer tokens)
- **No official OAuth 2.0** for programmatic access
- **Internal OAuth** exists for console but not exposed

### 7.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **API Token** | Direct API access | N/A |
| **Implicit Flow (Internal)** | Console login | `https://accounts.hetzner.com/oauth/authorize` |

### 7.3 Permissions/Scopes for VM Provisioning
```bash
# API token permissions
role="read_write"  # Full access
role="read"        # Read-only
```

**Available Permissions:**
- `read` - View resources
- `read_write` - View and manage resources

### 7.4 Temporary API Credentials
**No** - Hetzner Cloud provides:
- **API tokens**: Permanent (until revoked)
- **No refresh tokens**
- **No temporary credentials**

```python
import requests

# Use API token directly
headers = {'Authorization': 'Bearer YOUR_API_TOKEN'}

# Create a server
response = requests.post(
    'https://api.hetzner.cloud/v1/servers',
    headers=headers,
    json={
        'name': 'algo-vpn',
        'server_type': 'cx21',
        'location': 'nbg1',
        'image': 'ubuntu-22.04'
    }
)
```

### 7.5 Limitations
| Limitation | Value |
|------------|-------|
| Token lifetime | Permanent (until revoked) |
| Refresh tokens | Not supported |
| Token scope | Per-project only |
| API versioning | v1 only |

### 7.6 SDK Support
```python
# Hetzner Python SDK
from hcloud import Client

client = Client(token="YOUR_API_TOKEN")
server = client.servers.create(
    name='algo-vpn',
    server_type='cx21',
    location='nbg1',
    image='ubuntu-22.04'
)
```

**Libraries:**
- `hcloud-python` - Official Python SDK
- `hcloud` - Go SDK

---

## 8. Scaleway

### 8.1 OAuth 2.0/OIDC Support
**Yes** - Scaleway supports OAuth 2.0:
- **OAuth 2.0 for SSO** (Google, GitHub)
- **SAML Federation** for enterprise SSO
- **IAM Applications** for programmatic access

### 8.2 OAuth Flows
| Flow | Use Case | Endpoint |
|------|----------|----------|
| **Authorization Code** | Web apps | Scaleway console OAuth |
| **API Key** | Programmatic access | N/A |
| **IAM Application** | Service accounts | N/A |

### 8.3 Permissions/Scopes for VM Provisioning
```bash
# IAM Policy permissions
{
  "permission_set_names": ["InstanceManager"],
  "projects": ["project-id"]
}
```

**IAM Permission Sets:**
- `InstancesManager` - Manage instances
- `VolumesManager` - Manage volumes
- `NetworkManager` - Manage networks
- `IAMManager` - Manage IAM

### 8.4 Temporary API Credentials
**Limited** - Scaleway provides:
- **API keys**: Configurable expiration
- **IAM applications**: Programmatic access
- **No OAuth tokens** for direct API use

```python
import requests

# Use API key directly
headers = {'X-Auth-Token': 'YOUR_SECRET_KEY'}

# Create an instance
response = requests.post(
    'https://api.scaleway.com/instance/v1/zones/fr-par-1/servers',
    headers=headers,
    json={
        'name': 'algo-vpn',
        'commercial_type': 'DEV1-S',
        'image': 'ubuntu_focal'
    }
)
```

### 8.5 Limitations
| Limitation | Value |
|------------|-------|
| API key lifetime | Configurable (up to 1 year) |
| Refresh tokens | Not supported |
| OAuth scope | Console only |
| IAM application | API keys only |

### 8.6 SDK Support
```python
# Scaleway Python SDK
from scaleway import Scaleway

scw = Scaleway(api_key='YOUR_SECRET_KEY')
instance = scw.instance.create_server(
    name='algo-vpn',
    commercial_type='DEV1-S',
    image='ubuntu_focal'
)
```

**Libraries:**
- `scaleway-sdk` - Official Python SDK
- `scaleway-cli` - Official CLI tool

---

## 9. OAuth 2.0 Device Authorization Grant for CLI/Headless Tools

### 9.1 Overview
The OAuth 2.0 Device Authorization Grant (RFC 8628) is designed for devices that:
- Lack a browser (CLI tools, IoT devices)
- Have limited input capabilities
- Run in headless environments (SSH sessions, CI/CD)

### 9.2 Flow Diagram
```
+----------+                                +----------------+
|          |>---(A)-- Client ID ---------->|                |
|          |                                |                |
|          |<---(B)-- Device Code,      ---<|                |
|          |      User Code,               |                |
|  User    |      & Verification URI       | Authorization  |
|  Code &  |                                |    Server      |
|  Verif.  |>---(E)-- User Code -------->|                |
|   URI    |                                |                |
|          |<---(F)-- Polling ----------<|                |
+----------+                                +----------------+
    |                                              ^
    |                                              |
    v                                              |
+----------+                                +----------------+
|          |>---(C)-- Authorization Code -->|                |
|  Client  |                                |                |
|  Device  |<---(D)-- Access Token --------|                |
+----------+   (& Optional Refresh Token)   +----------------+
```

### 9.3 Provider Support for Device Flow

| Provider | Device Flow Support | Endpoint |
|----------|---------------------|----------|
| **AWS** | ✅ Yes | `https://device.sso.amazonaws.com` |
| **GCP** | ✅ Yes | `https://oauth2.googleapis.com/device/code` |
| **Azure** | ✅ Yes | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/devicecode` |
| **DigitalOcean** | ❌ No | N/A |
| **Linode** | ❌ No | N/A |
| **Vultr** | ❌ No | N/A |
| **Hetzner** | ❌ No | N/A |
| **Scaleway** | ❌ No | N/A |

### 9.4 Implementation Example (Python)

```python
import requests
import time
import json

class DeviceAuthorizationGrant:
    def __init__(self, client_id, device_endpoint, token_endpoint, scopes):
        self.client_id = client_id
        self.device_endpoint = device_endpoint
        self.token_endpoint = token_endpoint
        self.scopes = scopes
    
    def start_device_flow(self):
        """Step 1: Request device code"""
        response = requests.post(self.device_endpoint, data={
            'client_id': self.client_id,
            'scope': self.scopes
        })
        return response.json()
    
    def poll_for_token(self, device_code, interval=5):
        """Step 2: Poll for token"""
        while True:
            response = requests.post(self.token_endpoint, data={
                'grant_type': 'urn:ietf:params:oauth:grant-type:device_code',
                'device_code': device_code,
                'client_id': self.client_id
            })
            
            data = response.json()
            
            if 'access_token' in data:
                return data
            elif data.get('error') == 'authorization_pending':
                time.sleep(interval)
            elif data.get('error') == 'slow_down':
                interval += 5
            elif data.get('error') in ['access_denied', 'expired_token']:
                raise Exception(f"Device flow failed: {data['error']}")
            else:
                raise Exception(f"Unexpected error: {data}")

# AWS Device Flow Example
aws_device = DeviceAuthorizationGrant(
    client_id='your-client-id',
    device_endpoint='https://device.sso.amazonaws.com/device/authorization',
    token_endpoint='https://device.sso.amazonaws.com/oauth2/token',
    scopes='openid aws'
)

# Start device flow
device_info = aws_device.start_device_flow()
print(f"Go to: {device_info['verification_uri']}")
print(f"Enter code: {device_info['user_code']}")

# Poll for token
token = aws_device.poll_for_token(device_info['device_code'])
print(f"Access token: {token['access_token']}")
```

---

## 10. OIDC Federation Across Cloud Providers

### 10.1 Cross-Cloud Federation Architecture
```
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|   AWS STS      |<--->|   OIDC Token   |<--->|   GCP WIF      |
|   (Relying     |     |   (Identity)   |     |   (Relying     |
|    Party)      |     |                |     |    Party)      |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
        ^                      ^                      ^
        |                      |                      |
        v                      v                      v
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|  AWS IAM Role  |     |  GCP Service   |     |  Azure Managed |
|  Credentials   |     |  Account Creds |     |  Identity      |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
```

### 10.2 Federation Patterns

| Pattern | Source | Target | Mechanism |
|---------|--------|--------|-----------|
| **AWS → GCP** | AWS IAM Role | GCP Resources | GCP Workload Identity Federation (AWS provider) |
| **GCP → AWS** | GCP Service Account | AWS Resources | AWS OIDC provider (Google accounts.google.com) |
| **Azure → AWS** | Managed Identity | AWS Resources | AWS OIDC provider (Entra ID) |
| **AWS → Azure** | AWS IAM Role | Azure Resources | Entra ID federated credentials |
| **GitHub → Any** | GitHub Actions | All clouds | OIDC provider in each cloud |

### 10.3 Implementation Example

```python
# AWS to GCP Federation
import google.auth
from google.auth import externalaccount

# Configure workload identity federation
config = {
    "type": "external_account",
    "audience": "//iam.googleapis.com/projects/123456789/locations/global/workloadIdentityPools/aws-pool/providers/aws-provider",
    "subject_token_type": "urn:ietf:params:oauth:token-type:aws4_request",
    "token_url": "https://sts.googleapis.com/v1/token",
    "credential_source": {
        "environment_id": "aws1",
        "region_url": "http://169.254.169.254/latest/meta-data/placement/region",
        "url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/",
        "verification_url": "https://sts.amazonaws.com/aws/iam/v1/get-identity"
    }
}

# Load credentials
credentials = externalaccount.Credentials.from_info(config)
credentials.refresh(google.auth.transport.requests.Request())

# Use credentials with GCP services
print(f"GCP Access Token: {credentials.token}")
```

### 10.4 Limitations
| Limitation | Value |
|------------|-------|
| Token lifetime | 1 hour (typically) |
| Cross-cloud latency | Network dependent |
| Configuration complexity | High |
| Trust establishment | One-time setup |
| Token revocation | Immediate (but cached tokens may persist) |

---

## 11. Existing Tools/Projects for Cloud OAuth VPN Deployment

### 11.1 Algo VPN (Current)
- **Authentication**: Static API keys/tokens
- **OAuth Support**: None
- **Deployment**: Ansible-based

### 11.2 Algo-NG (Terraform-based)
- **Authentication**: Static API keys/tokens
- **OAuth Support**: None
- **Deployment**: Terraform-based

### 11.3 Terraform Cloud VPN Modules

#### infrahouse/openvpn/aws
```hcl
# Google OAuth for OpenVPN
module "vpn" {
  source  = "registry.infrahouse.com/infrahouse/openvpn/aws"
  version = "6.1.0"
  
  providers = {
    aws     = aws
    aws.dns = aws
  }
  
  backend_subnet_ids         = module.management.subnet_private_ids
  lb_subnet_ids              = module.management.subnet_public_ids
  google_oauth_client_writer = tolist(data.aws_iam_roles.sso-admin.arns)[0]
  zone_id                    = module.infrahouse_com.infrahouse_zone_id
  allowed_domains            = ["company.com"]
}
```

**Features:**
- Google OAuth 2.0 authentication
- Multi-domain support
- Let's Encrypt SSL
- Auto-scaling

### 11.4 CLI OAuth Libraries

#### go-authgate/cli
```go
// Go library for CLI OAuth
import "github.com/go-authgate/cli"

// Auto-selects PKCE or Device Flow based on environment
mgr, err := tokenmanager.New(tokenmanager.Config{
    Issuer:   "https://your-idp.com",
    ClientID: "your-client-id",
    STSPath:  "/oauth/token",
    Store:    store,
    Scope:    "cli",
})
```

**Features:**
- Automatic PKCE/Device Flow selection
- Token caching
- Refresh token handling
- Provider-agnostic

#### entireio/auth-go
```go
// Go library for OAuth 2.0 Device Flow + STS
import "github.com/entireio/auth-go/deviceflow"

// Device flow client
dfc, err := deviceflow.New(&deviceflow.Client{
    BaseURL:        "https://your-idp.com",
    ClientID:       "your-client-id",
    Scope:          "cli",
    DeviceCodePath: "/oauth/device/code",
    TokenPath:      "/oauth/token",
})

// Start device auth
dc, err := dfc.StartDeviceAuth(ctx)
fmt.Printf("Go to: %s\n", dc.VerificationURI)
fmt.Printf("Enter code: %s\n", dc.UserCode)

// Poll until token received
ts, err := dfc.PollUntil(ctx, dc)
```

**Features:**
- RFC 8628 Device Flow
- RFC 8693 Token Exchange
- Token management
- Provider-agnostic

#### abinnovision/oidc-token-cli
```bash
# OIDC token helper for CLI
oidc-token \
  --issuer https://id.example.com/ \
  --client-id my-public-client \
  --scope "openid offline_access" \
  --grant-type auto \
  --format token
```

**Features:**
- Auto grant selection
- Token caching
- Multiple storage backends
- kubectl integration

### 11.5 Comparison Matrix

| Tool | Provider Support | OAuth Flows | Token Management | Language |
|------|------------------|-------------|------------------|----------|
| **Algo VPN** | Multiple | None | Static keys | Python/Ansible |
| **Terraform AWS OpenVPN** | AWS | Google OAuth | Managed | HCL |
| **go-authgate/cli** | Any OIDC | PKCE, Device | Yes | Go |
| **entireio/auth-go** | Any OIDC | Device, STS | Yes | Go |
| **oidc-token-cli** | Any OIDC | Auto | Yes | Go |

---

## 12. Recommendations for Algo VPN OAuth Integration

### 12.1 Priority Implementation Order

1. **AWS** - Most mature OAuth/OIDC support, best for initial implementation
2. **GCP** - Strong Workload Identity Federation support
3. **Azure** - Full OIDC support with federated credentials
4. **DigitalOcean** - Simple OAuth 2.0 implementation
5. **Linode** - OAuth 2.0 with good SDK support
6. **Vultr** - OAuth 2.0 with OIDC provider support
7. **Scaleway** - OAuth for SSO, API keys for programmatic
8. **Hetzner** - Limited to API tokens (no OAuth)

### 12.2 Architecture Recommendations

```
+------------------+
|   Algo VPN CLI   |
+------------------+
         |
         v
+------------------+
|  OAuth Manager   |
|  (Go Library)    |
+------------------+
         |
    +----+----+
    |         |
    v         v
+--------+ +--------+
|  AWS   | |  GCP   |
|  OIDC  | |  WIF   |
+--------+ +--------+
    |         |
    v         v
+--------+ +--------+
|  STS   | |  STS   |
| Token  | | Token  |
+--------+ +--------+
    |         |
    v         v
+------------------+
|  VM Provisioner  |
|  (Ansible/TF)    |
+------------------+
```

### 12.3 Implementation Checklist

- [ ] **Phase 1: Core OAuth Infrastructure**
  - [ ] Implement OAuth Manager library
  - [ ] Add Device Flow support for CLI
  - [ ] Add PKCE support for web-based auth
  - [ ] Implement token caching and refresh

- [ ] **Phase 2: Provider Integration**
  - [ ] AWS IAM Identity Center integration
  - [ ] GCP Workload Identity Federation
  - [ ] Azure Entra ID OIDC federation
  - [ ] DigitalOcean OAuth 2.0

- [ ] **Phase 3: Cross-Cloud Federation**
  - [ ] OIDC federation setup
  - [ ] Cross-cloud token exchange
  - [ ] Multi-cloud credential management

- [ ] **Phase 4: Security & Compliance**
  - [ ] Token rotation policies
  - [ ] Audit logging
  - [ ] MFA enforcement
  - [ ] Access reviews

### 12.4 Security Considerations

1. **Never store static credentials** - Use OAuth tokens or temporary credentials
2. **Implement token rotation** - Automatically refresh tokens before expiry
3. **Use minimal scopes** - Request only necessary permissions
4. **Enable MFA** - Enforce multi-factor authentication
5. **Audit all access** - Log all token exchanges and API calls
6. **Implement rate limiting** - Prevent token abuse
7. **Use secure storage** - Store tokens in encrypted keyring or secure vault

---

## 13. Code Examples for Implementation

### 13.1 Generic OAuth Manager (Python)

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional
import time
import json

@dataclass
class OAuthToken:
    access_token: str
    refresh_token: Optional[str]
    expires_at: float
    token_type: str = "Bearer"

class OAuthProvider(ABC):
    @abstractmethod
    def get_authorization_url(self) -> str:
        pass
    
    @abstractmethod
    def exchange_code(self, code: str) -> OAuthToken:
        pass
    
    @abstractmethod
    def refresh_token(self, refresh_token: str) -> OAuthToken:
        pass

class AWSProvider(OAuthProvider):
    def __init__(self, client_id, client_secret, redirect_uri):
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri
    
    def get_authorization_url(self) -> str:
        return (
            f"https://your-instance.awsapps.com/start?"
            f"client_id={self.client_id}&"
            f"redirect_uri={self.redirect_uri}&"
            f"response_type=code"
        )
    
    def exchange_code(self, code: str) -> OAuthToken:
        # Exchange authorization code for tokens
        # Implementation depends on specific AWS setup
        pass
    
    def refresh_token(self, refresh_token: str) -> OAuthToken:
        # Refresh access token
        pass

class OAuthManager:
    def __init__(self, provider: OAuthProvider):
        self.provider = provider
        self.token_cache = {}
    
    def authenticate(self) -> OAuthToken:
        # Check cache first
        if 'current_token' in self.token_cache:
            token = self.token_cache['current_token']
            if token.expires_at > time.time():
                return token
        
        # Get new token via device flow
        auth_url = self.provider.get_authorization_url()
        print(f"Go to: {auth_url}")
        code = input("Enter authorization code: ")
        
        token = self.provider.exchange_code(code)
        self.token_cache['current_token'] = token
        return token
    
    def get_valid_token(self) -> OAuthToken:
        token = self.token_cache.get('current_token')
        if token and token.expires_at > time.time() + 300:  # 5 min buffer
            return token
        
        if token and token.refresh_token:
            try:
                return self.provider.refresh_token(token.refresh_token)
            except Exception:
                pass
        
        return self.authenticate()
```

### 13.2 Device Flow Implementation (Go)

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
    
    "github.com/cli/oauth/device"
    "github.com/cli/oauth/webapp"
)

func main() {
    // Device flow for CLI
    deviceFlow := device.New(
        "https://device.sso.amazonaws.com/device/authorization",
        "https://device.sso.amazonaws.com/oauth2/token",
        "your-client-id",
        "openid aws",
        false,
    )
    
    ctx := context.Background()
    
    // Start device flow
    code, err := deviceFlow.RequestCode(ctx, nil, http.DefaultClient)
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Go to: %s\n", code.VerificationURI)
    fmt.Printf("Enter code: %s\n", code.UserCode)
    
    // Poll for token
    token, err := deviceFlow.Poll(ctx, code, http.DefaultClient, nil)
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Access Token: %s\n", token.AccessToken)
    fmt.Printf("Expires In: %d seconds\n", token.ExpiresIn)
}
```

### 13.3 Multi-Cloud Credential Manager (Python)

```python
from typing import Dict, Optional
from dataclasses import dataclass
import json

@dataclass
class CloudCredentials:
    provider: str
    access_key: Optional[str] = None
    secret_key: Optional[str] = None
    session_token: Optional[str] = None
    expires_at: float = 0

class MultiCloudManager:
    def __init__(self):
        self.credentials: Dict[str, CloudCredentials] = {}
        self.oauth_providers: Dict[str, OAuthProvider] = {}
    
    def register_provider(self, provider_name: str, oauth_provider: OAuthProvider):
        self.oauth_providers[provider_name] = oauth_provider
    
    def get_credentials(self, provider: str) -> CloudCredentials:
        if provider in self.credentials:
            creds = self.credentials[provider]
            if creds.expires_at > time.time():
                return creds
        
        # Authenticate via OAuth
        oauth_provider = self.oauth_providers[provider]
        token = oauth_provider.authenticate()
        
        # Exchange for cloud-specific credentials
        cloud_creds = self._exchange_for_cloud_credentials(provider, token)
        self.credentials[provider] = cloud_creds
        
        return cloud_creds
    
    def _exchange_for_cloud_credentials(self, provider: str, token: OAuthToken) -> CloudCredentials:
        if provider == 'aws':
            return self._exchange_aws(token)
        elif provider == 'gcp':
            return self._exchange_gcp(token)
        elif provider == 'azure':
            return self._exchange_azure(token)
        else:
            raise ValueError(f"Unsupported provider: {provider}")
    
    def _exchange_aws(self, token: OAuthToken) -> CloudCredentials:
        import boto3
        
        sts = boto3.client('sts')
        response = sts.assume_role_with_web_identity(
            RoleArn='arn:aws:iam::ACCOUNT:role/algo-vpn',
            RoleSessionName='algo-vpn',
            WebIdentityToken=token.access_token
        )
        
        return CloudCredentials(
            provider='aws',
            access_key=response['Credentials']['AccessKeyId'],
            secret_key=response['Credentials']['SecretAccessKey'],
            session_token=response['Credentials']['SessionToken'],
            expires_at=response['Credentials']['Expiration'].timestamp()
        )
    
    def _exchange_gcp(self, token: OAuthToken) -> CloudCredentials:
        # GCP credential exchange
        pass
    
    def _exchange_azure(self, token: OAuthToken) -> CloudCredentials:
        # Azure credential exchange
        pass
```

---

## 14. Conclusion

### 14.1 Key Findings

1. **AWS, GCP, and Azure** have mature OAuth 2.0/OIDC support suitable for Algo VPN integration
2. **DigitalOcean, Linode, and Vultr** support OAuth 2.0 but with limitations for CLI tools
3. **Hetzner** lacks OAuth 2.0 support and relies on static API tokens
4. **Scaleway** supports OAuth for SSO but uses API keys for programmatic access
5. **Device Authorization Grant** is supported by AWS, GCP, and Azure for CLI tools
6. **OIDC Federation** enables cross-cloud identity without storing credentials

### 14.2 Recommended Architecture

- Use **OAuth 2.0 with Device Flow** for CLI authentication
- Implement **OIDC Federation** for cross-cloud scenarios
- Store tokens in **encrypted keyring** with automatic refresh
- Use **minimal scopes** and **just-in-time provisioning**

### 14.3 Next Steps

1. Implement OAuth Manager library with Device Flow support
2. Start with AWS integration (most mature)
3. Add GCP and Azure support
4. Implement cross-cloud federation
5. Add support for remaining providers
6. Implement security features (MFA, audit logging)

---

*Document Version: 1.0*  
*Last Updated: 2026-09-09*  
*Author: Research Team*
