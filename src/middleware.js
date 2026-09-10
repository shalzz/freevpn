import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAuth = req.nextUrl.pathname.startsWith("/login")
  const isOnApiAuth = req.nextUrl.pathname.startsWith("/api/auth")
  const isPublic = req.nextUrl.pathname === "/" || isOnAuth || isOnApiAuth

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isLoggedIn && isOnAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|site.webmanifest|robots.txt|sitemap.xml).*)"],
}
