import Head from "next/head"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <main style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f"
      }}>
        <p style={{ color: "#8888aa" }}>Loading...</p>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard — SelfVPN</title>
        <meta name="description" content="Manage your SelfVPN servers." />
      </Head>
      <main style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "40px 20px"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40
          }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
              SelfVPN
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#8888aa", fontSize: 14 }}>
                {session?.user?.email}
              </span>
              <Link
                href="/api/auth/signout"
                style={{
                  color: "#8888aa",
                  fontSize: 14,
                  textDecoration: "none"
                }}
              >
                Sign out
              </Link>
            </div>
          </header>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#ffffff" }}>
              Your Servers
            </h2>
            <Link
              href="/deploy"
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #6699FF 0%, #FF3366 100%)",
                color: "#ffffff",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Deploy New Server
            </Link>
          </div>

          <div style={{
            padding: 60,
            background: "#12121a",
            borderRadius: 12,
            border: "1px solid #1e1e2e",
            textAlign: "center"
          }}>
            <p style={{ color: "#8888aa", fontSize: 16, marginBottom: 8 }}>
              No servers yet
            </p>
            <p style={{ color: "#555577", fontSize: 14 }}>
              Deploy your first private WireGuard VPN server to get started.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
