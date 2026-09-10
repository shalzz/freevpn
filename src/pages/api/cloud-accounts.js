import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  const session = await auth()

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method === "GET") {
    const accounts = await prisma.cloudAccount.findMany({
      where: { userId: session.user.id },
      select: { id: true, provider: true, name: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    })
    return res.status(200).json(accounts)
  }

  if (req.method === "POST") {
    const { provider, name, credentials } = req.body

    if (!provider || !credentials) {
      return res.status(400).json({ error: "provider and credentials required" })
    }

    // TODO: encrypt credentials with KMS before storing
    const account = await prisma.cloudAccount.create({
      data: {
        userId: session.user.id,
        provider,
        name: name || null,
        credentials: credentials, // will be encrypted in Phase 4
      },
      select: { id: true, provider: true, name: true, createdAt: true },
    })
    return res.status(201).json(account)
  }

  return res.status(405).json({ error: "Method not allowed" })
}
