"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <>
      <title>Login — SelfVPN</title>
      <meta name="description" content="Sign in to SelfVPN to deploy your private WireGuard VPN server." />
      <main style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
        fontFamily: "Inter, system-ui, sans-serif"
      }}>
        <div style={{
          width: "100%",
          maxWidth: 400,
          padding: 40,
          background: "#12121a",
          borderRadius: 16,
          border: "1px solid #1e1e2e",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 8
          }}>
            SelfVPN
          </h1>
          <p style={{
            fontSize: 14,
            color: "#8888aa",
            marginBottom: 32
          }}>
            Deploy your private WireGuard VPN server
          </p>

          <button
            onClick={() => signIn("google")}
            style={{
              width: "100%",
              padding: "12px 24px",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "opacity 0.2s"
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p style={{
            fontSize: 12,
            color: "#555577",
            marginTop: 24,
            lineHeight: 1.5
          }}>
            By signing in, you agree to our Terms of Service.
            Your cloud provider credentials are encrypted and never stored in plaintext.
          </p>
        </div>
      </main>
    </>
  )
}