import crypto from "crypto"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getOAuthConfig } from "@/lib/oauth-providers"

export async function GET(req, { params }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { provider } = await params
  const config = getOAuthConfig(provider)

  if (!config) {
    return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 })
  }

  if (!config.clientId || !config.clientSecret) {
    return NextResponse.json({ error: `${config.label} OAuth not configured` }, { status: 500 })
  }

  // Generate state token to prevent CSRF
  const state = crypto.randomUUID()

  const paramsObj = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/${provider}/callback`,
    response_type: "code",
    scope: config.scope,
    state,
  })

  const res = NextResponse.redirect(`${config.authorizeUrl}?${paramsObj.toString()}`)

  // Store state in a cookie (simple approach; production should use encrypted session)
  res.cookies.set("oauth_state", state, { path: "/", httpOnly: true, sameSite: "lax", maxAge: 600 })
  res.cookies.set("oauth_provider", provider, { path: "/", httpOnly: true, sameSite: "lax", maxAge: 600 })

  return res
}