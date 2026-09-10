import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getOAuthConfig } from "@/lib/oauth-providers"
import { prisma } from "@/lib/prisma"

export async function GET(req, { params }) {
  const session = await auth()

  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`)
  }

  const { provider } = await params
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")
  const config = getOAuthConfig(provider)

  // Validate provider
  if (!config) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=unsupported_provider`)
  }

  // Check for OAuth error
  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=oauth_denied`)
  }

  // Validate state (CSRF protection)
  const cookieStore = await cookies()
  if (state !== cookieStore.get("oauth_state")?.value || provider !== cookieStore.get("oauth_provider")?.value) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=invalid_state`)
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=no_code`)
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
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=token_exchange_failed`)
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

  const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?connected=${provider}`)

  // Clear OAuth cookies
  res.cookies.set("oauth_state", "", { path: "/", maxAge: 0 })
  res.cookies.set("oauth_provider", "", { path: "/", maxAge: 0 })

  return res
}