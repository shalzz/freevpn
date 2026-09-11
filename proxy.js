import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default async function proxy(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const isLoggedIn = !!token
  const isOnAuth = req.nextUrl.pathname.startsWith("/login")
  const isPublic = req.nextUrl.pathname === "/" || isOnAuth

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isLoggedIn && isOnAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|robots.txt|sitemap.xml).*)"],
}