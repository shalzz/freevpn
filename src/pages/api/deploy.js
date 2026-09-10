import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  const session = await auth()

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method === "POST") {
    const { provider, region, features, cloudAccountId, apiKey } = req.body

    if (!provider || !region) {
      return res.status(400).json({ error: "provider and region required" })
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

    return res.status(202).json({
      serverId: server.id,
      status: "queued",
      message: "Deployment queued. Worker will provision your VPN server.",
    })
  }

  return res.status(405).json({ error: "Method not allowed" })
}
