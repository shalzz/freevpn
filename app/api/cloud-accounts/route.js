import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const accounts = await prisma.cloudAccount.findMany({
    where: { userId: session.user.id },
    select: { id: true, provider: true, name: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(accounts)
}

export async function POST(req) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { provider, name, credentials } = await req.json()

  if (!provider || !credentials) {
    return NextResponse.json({ error: "provider and credentials required" }, { status: 400 })
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

  return NextResponse.json(account, { status: 201 })
}