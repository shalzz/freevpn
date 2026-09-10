import { auth } from "@/lib/auth"
import { getOAuthConfig } from "@/lib/oauth-providers"
import crypto from "crypto"

export default async function handler(req, res) {
  const session = await auth()

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { provider } = req.query
  const config = getOAuthConfig(provider)

  if (!config) {
    return res.status(400).json({ error: `Unsupported provider: ${provider}` })
  }

  if (!config.clientId || !config.clientSecret) {
    return res.status(500).json({ error: `${config.label} OAuth not configured` })
  }

  // Generate state token to prevent CSRF
  const state = crypto.randomUUID()

  // Store state in a cookie (simple approach; production should use encrypted session)
  res.setHeader("Set-Cookie", [
    `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`,
    `oauth_provider=${provider}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`,
  ])

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/${provider}/callback`,
    response_type: "code",
    scope: config.scope,
    state,
  })

  res.redirect(`${config.authorizeUrl}?${params.toString()}`)
}
