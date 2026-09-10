import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { provider, region, features, cloudAccountId, apiKey } = await req.json()

  if (!provider || !region) {
    return NextResponse.json({ error: "provider and region required" }, { status: 400 })
  }

  // Create server record
  const server = await prisma.server.create({
    data: {
      userId: session.user.id,
      provider,
      region,
      status: "pending",
    },
  })

  // Create initial deployment record
  await prisma.deployment.create({
    data: {
      serverId: server.id,
      status: "queued",
    },
  })

  // TODO: enqueue job to BullMQ for worker to pick up
  // For now, return the server record
  // In Phase 3, this will:
  // 1. Validate cloud credentials
  // 2. Enqueue deployment job
  // 3. Worker runs Algo VPN playbook

  return NextResponse.json(
    {
      serverId: server.id,
      status: "queued",
      message: "Deployment queued. Worker will provision your VPN server.",
    },
    { status: 202 }
  )
}