import { NextResponse } from "next/server"
import net from "node:net"
import tls from "node:tls"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const CRITICAL_ENV = ["DATABASE_URL", "REDIS_URL", "AUTH_SECRET", "NEXT_PUBLIC_APP_URL"]

const OPTIONAL_ENV = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "DIGITALOCEAN_CLIENT_ID",
  "DIGITALOCEAN_CLIENT_SECRET",
  "LINODE_CLIENT_ID",
  "LINODE_CLIENT_SECRET",
  "DO_API_TOKEN",
  "AWS_REGION",
  "KMS_KEY_ID",
]

function envSummary() {
  return Object.fromEntries([...CRITICAL_ENV, ...OPTIONAL_ENV].map((key) => [key, Boolean(process.env[key])]))
}

function parseUrl(url, defaultHost, defaultPort) {
  try {
    const parsed = new URL(url)
    return {
      host: parsed.hostname || defaultHost,
      port: Number(parsed.port) || defaultPort,
      username: parsed.username || null,
      password: parsed.password || null,
      pathname: parsed.pathname || "",
      search: parsed.search || "",
      protocol: parsed.protocol,
    }
  } catch {
    return { host: defaultHost, port: defaultPort, username: null, password: null, protocol: "tcp:" }
  }
}

function checkTcp(host, port, timeoutMs) {
  const start = Date.now()
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port })
    const done = (status, extra) => {
      socket.destroy()
      resolve({ status, latencyMs: Date.now() - start, ...extra })
    }
    socket.setTimeout(timeoutMs, () => done("error", { error: `connect timed out after ${timeoutMs}ms` }))
    socket.on("error", (err) => done("error", { error: err.code || err.message }))
    socket.on("connect", () => done("ok"))
  })
}

function checkRedis() {
  const start = Date.now()
  const url = process.env.REDIS_URL || "redis://localhost:6379"
  const { host, port, password, protocol } = parseUrl(url, "127.0.0.1", 6379)
  const isTls = protocol === "rediss:"

  return new Promise((resolve) => {
    const done = (status, extra) => {
      socket.destroy()
      resolve({ status, latencyMs: Date.now() - start, ...extra })
    }

    const onError = (err) => done("error", { error: err.code || err.message })
    const onTimeout = () => done("error", { error: "connect timed out after 3000ms" })

    const onConnect = (sock) => {
      sock.write("*1\r\n$4\r\nPING\r\n")
    }

    const onData = (sock) => (chunk) => {
      sock.removeAllListeners("data")
      const reply = chunk.toString().trim()
      if (isTls) {
        done("ok", { tls: true })
        return
      }
      if (reply === "+PONG") done("ok")
      else done("error", { error: `unexpected reply: ${reply.slice(0, 80)}` })
    }

    let socket
    if (isTls) {
      socket = tls.connect({ host, port, servername: host, rejectUnauthorized: false }, () => {
        socket.on("data", onData(socket))
      })
      // Best-effort PING after TLS handshake (Upstash needs auth; handshake success = reachable)
      socket.write("*1\r\n$4\r\nPING\r\n")
    } else {
      socket = net.createConnection({ host, port }, () => onConnect(socket))
      socket.on("data", onData(socket))
    }

    socket.setTimeout(3000, onTimeout)
    socket.on("error", onError)
  })
}

function checkDatabase() {
  const url = process.env.DATABASE_URL || ""
  const { host, port } = parseUrl(url, "127.0.0.1", 5432)
  return checkTcp(host, port, 5000).then((r) => ({ ...r, host, port }))
}

function checkInternal() {
  const summary = envSummary()
  const missingCritical = CRITICAL_ENV.filter((key) => !summary[key])
  return {
    status: missingCritical.length === 0 ? "ok" : "error",
    error: missingCritical.length ? `missing env vars: ${missingCritical.join(", ")}` : undefined,
    queue: process.env.BULLMQ_QUEUE || "deployments",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || null,
    env: summary,
  }
}

export async function GET() {
  const [database, redis, internal] = await Promise.all([checkDatabase(), checkRedis(), checkInternal()])

  const checks = { database, redis, internal }
  const ok = Object.values(checks).every((check) => check.status === "ok")

  return NextResponse.json(
    {
      status: ok ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks,
    },
    { status: ok ? 200 : 503 }
  )
}