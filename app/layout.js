import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import AuthProvider from "@/components/AuthProvider"

export const metadata = {
  title: {
    default: "SelfVPN — Own your VPN. No provider logs, no $12/mo.",
    template: "%s — SelfVPN",
  },
  description:
    "SelfVPN deploys a private WireGuard server you control on a cloud provider of your choice. Your traffic never passes through a commercial VPN's logs.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}