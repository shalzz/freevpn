import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  const session = await auth()

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method === "GET") {
    const servers = await prisma.server.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        deployments: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    })
    return res.status(200).json(servers)
  }

  return res.status(405).json({ error: "Method not allowed" })
}
