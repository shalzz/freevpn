import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getOAuthConfig } from "@/lib/oauth-providers"

function parseCookies(cookieHeader) {
  const cookies = {}
  cookieHeader?.split(";").forEach((c) => {
    const [key, ...val] = c.split("=")
    cookies[key.trim()] = val.join("=").trim()
  })
  return cookies
}

export default async function handler(req, res) {
  const session = await auth()

  if (!session) {
    return res.redirect("/login")
  }

  const { provider } = req.query
  const { code, state, error } = req.query
  const config = getOAuthConfig(provider)

  // Validate provider
  if (!config) {
    return res.redirect("/deploy?error=unsupported_provider")
  }

  // Check for OAuth error
  if (error) {
    return res.redirect(`/deploy?error=oauth_denied`)
  }

  // Validate state (CSRF protection)
  const cookies = parseCookies(req.headers.cookie)
  if (state !== cookies.oauth_state || provider !== cookies.oauth_provider) {
    return res.redirect("/deploy?error=invalid_state")
  }

  // Clear OAuth cookies
  res.setHeader("Set-Cookie", [
    "oauth_state=; Path=/; Max-Age=0",
    "oauth_provider=; Path=/; Max-Age=0",
  ])

  if (!code) {
    return res.redirect("/deploy?error=no_code")
  }

  // Exchange authorization code for access token
  const tokenResponse = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/${provider}/callback`,
    }),
  })

  if (!tokenResponse.ok) {
    const err = await tokenResponse.text()
    console.error(`OAuth token exchange failed for ${provider}:`, err)
    return res.redirect("/deploy?error=token_exchange_failed")
  }

  const tokenData = await tokenResponse.json()

  // TODO: encrypt with KMS before storing (Phase 4)
  // For now store the token directly
  const credentials = JSON.stringify({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token || null,
    expires_in: tokenData.expires_in || null,
    token_type: tokenData.token_type || "Bearer",
    scope: tokenData.scope || config.scope,
  })

  // Fetch account info for display name
  let accountName = null
  try {
    if (provider === "digitalocean") {
      const acctRes = await fetch("https://api.digitalocean.com/v2/account", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      })
      if (acctRes.ok) {
        const acct = await acctRes.json()
        accountName = acct.account?.email || acct.account?.uuid || null
      }
    }
  } catch {}

  await prisma.cloudAccount.create({
    data: {
      userId: session.user.id,
      provider,
      name: accountName,
      credentials,
    },
  })

  res.redirect("/deploy?connected=" + provider)
}
