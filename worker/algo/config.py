import re
import shutil
import sys
import tempfile
from pathlib import Path

import yaml

ALGO_DIR = Path(__file__).resolve().parent


def _find_ansible_playbook():
    candidates = [
        Path(sys.prefix) / "bin" / "ansible-playbook",
        Path(__file__).resolve().parents[1] / ".venv" / "bin" / "ansible-playbook",
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    found = shutil.which("ansible-playbook")
    return Path(found) if found else candidates[0]


ANSIBLE_PLAYBOOK = _find_ansible_playbook()

PROVIDER_TOKEN_VARS = {
    "digitalocean": "do_token",
    "linode": "linode_token",
    "vultr": "vultr_config",
    "ec2": "aws_access_key",
    "lightsail": "aws_access_key",
    "azure": "azure_client_id",
    "gce": "gce_credentials_file",
    "hetzner": "hcloud_token",
    "scaleway": "scaleway_token",
    "cloudstack": "cs_api_key",
    "openstack": None,
    "local": None,
}


def sanitize_server_name(name):
    cleaned = re.sub(r"[^a-z0-9-]", "-", str(name).lower())
    cleaned = re.sub(r"-+", "-", cleaned).strip("-")
    return (cleaned or "algo")[:50]


def sanitize_user(name):
    cleaned = re.sub(r"[^a-zA-Z0-9_]", "_", str(name).strip())
    if not cleaned:
        cleaned = "selfvpn"
    if cleaned.isdigit():
        cleaned = "user_" + cleaned
    return cleaned


def build_extra_vars(provider, region, credentials, features, server_name, users):
    features = features or {}
    token_var = PROVIDER_TOKEN_VARS.get(provider)
    extra_vars = {
        "provider": provider,
        "server_name": server_name,
        "region": region,
        "ondemand_cellular": False,
        "ondemand_wifi": False,
        "store_pki": False,
        "dns_adblocking": bool(features.get("adblocking", False)),
        "ssh_tunneling": bool(features.get("ssh_tunneling", False)),
        "users": [sanitize_user(u) for u in users or ["selfvpn"]],
    }
    if token_var:
        extra_vars[token_var] = credentials
    return extra_vars


def write_vars_file(extra_vars, workdir=None):
    workdir = Path(workdir) if workdir else Path(tempfile.mkdtemp(prefix="algo-deploy-"))
    vars_file = workdir / "algo-vars.yml"
    vars_file.write_text(yaml.safe_dump(extra_vars, default_flow_style=False), encoding="utf-8")
    return vars_file


def write_inventory(workdir=None):
    workdir = Path(workdir) if workdir else Path(tempfile.mkdtemp(prefix="algo-deploy-"))
    inventory = workdir / "inventory"
    inventory.write_text(
        "[local]\nlocalhost ansible_connection=local ansible_python_interpreter=python3\n",
        encoding="utf-8",
    )
    return inventory