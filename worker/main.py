import logging
import os

from contextlib import asynccontextmanager

from bullmq import Worker
from fastapi import FastAPI
from redis import asyncio as aioredis

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
logger = logging.getLogger("worker")

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
QUEUE_NAME = os.getenv("BULLMQ_QUEUE", "deployments")


async def process_deploy_job(job, job_token):
    logger.info("processing deployment job %s (%s)", job.id, job.name)
    logger.info("job data: %s", job.data)
    return {"status": "handled", "jobId": job.id}


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = aioredis.from_url(REDIS_URL, decode_responses=True)
    await app.state.redis.ping()
    app.state.worker = Worker(QUEUE_NAME, process_deploy_job, {"connection": REDIS_URL})
    logger.info("bullmq worker started on queue %r (redis: %s)", QUEUE_NAME, REDIS_URL)
    yield
    await app.state.worker.close()
    await app.state.redis.aclose()
    logger.info("bullmq worker stopped")


app = FastAPI(title="SelfVPN Worker", lifespan=lifespan)


@app.get("/health")
async def health():
    redis_status = "ok"
    try:
        await app.state.redis.ping()
    except Exception as exc:
        redis_status = f"error: {exc}"
    worker = getattr(app.state, "worker", None)
    return {
        "status": "ok",
        "queue": QUEUE_NAME,
        "redis": redis_status,
        "worker": "running" if worker and not worker.closed else "stopped",
    }