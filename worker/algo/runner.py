import logging
import os
import re
import subprocess
import sys
from pathlib import Path

from algo import config

logger = logging.getLogger("algo.runner")


class DeploymentError(Exception):
    def __init__(self, message, logs=None):
        super().__init__(message)
        self.logs = logs or ""


def _algo_env():
    venv = Path(sys.prefix)
    env = os.environ.copy()
    env["VIRTUAL_ENV"] = str(venv)
    env["PATH"] = f"{venv / 'bin'}:{env.get('PATH', '')}"
    env.setdefault("PYTHONUNBUFFERED", "1")
    env.pop("ANSIBLE_LOCALHOST_WARNING", None)
    env.pop("ANSIBLE_INVENTORY_UNPARSED_WARNING", None)
    return env


def _run(cmd, cwd, env):
    logger.info("running: %s (cwd=%s)", " ".join(cmd), cwd)
    proc = subprocess.Popen(
        cmd,
        cwd=cwd,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    lines = []
    for raw in proc.stdout:
        line = raw.rstrip()
        logger.info("[algo] %s", line)
        lines.append(line)
    proc.wait()
    return proc.returncode, "\n".join(lines)


def _collect_result(algo_dir):
    conf_dir = algo_dir / "configs"
    confs = sorted(Path(fp) for fp in conf_dir.glob("*/wireguard/*.conf"))
    server_ip = None
    users = set()
    for conf in confs:
        users.add(conf.stem)
        if server_ip is None:
            match = re.search(r"^Endpoint\s*=\s*(\[?[^:]+?\]?|\S+):", conf.read_text(encoding="utf-8"))
            if match:
                server_ip = match.group(1).strip("[]")
    return {
        "server_ip": server_ip,
        "users": sorted(users),
        "configs_dir": str(conf_dir.resolve()),
        "wireguard_confs": [str(p.resolve()) for p in confs],
    }


def run_deployment(provider, region, credentials, features=None, server_name=None, users=None):
    server_name = config.sanitize_server_name(server_name or "algo")
    extra_vars = config.build_extra_vars(provider, region, credentials, features, server_name, users)
    vars_file = config.write_vars_file(extra_vars)
    inventory = config.write_inventory(vars_file.parent)

    cmd = [
        str(config.ANSIBLE_PLAYBOOK),
        "main.yml",
        "-i",
        str(inventory),
        "-e",
        f"@{vars_file}",
    ]
    rc, output = _run(cmd, cwd=str(config.ALGO_DIR), env=_algo_env())

    if rc != 0:
        raise DeploymentError(
            f"Algo deployment failed (provider={provider}, region={region}), rc={rc}",
            logs=output,
        )

    result = _collect_result(config.ALGO_DIR)
    result["provider"] = provider
    result["region"] = region
    result["server_name"] = server_name
    return result