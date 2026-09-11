"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import ServerCard from "@/components/ServerCard"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/servers")
        .then((res) => res.json())
        .then((data) => {
          setServers(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [status])

  if (status === "loading" || loading) {
    return (
      <>
        <title>Dashboard — SelfVPN</title>
        <main style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          fontFamily: "Inter, system-ui, sans-serif"
        }}>
          <p style={{ color: "#8888aa" }}>Loading...</p>
        </main>
      </>
    )
  }

  return (
    <>
      <title>Dashboard — SelfVPN</title>
      <meta name="description" content="Manage your SelfVPN servers." />
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
            <Link href="/" style={{ fontSize: 24, fontWeight: 700, color: "#ffffff", textDecoration: "none" }}>
              SelfVPN
            </Link>
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

          {servers.length === 0 ? (
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
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {servers.map((server) => (
                <ServerCard
                  key={server.id}
                  server={server}
                  onDestroy={(id) => {
                    fetch(`/api/servers/${id}/destroy`, { method: "POST" })
                      .then(() => setServers((prev) => prev.filter((s) => s.id !== id)))
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}