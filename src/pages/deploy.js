"use client"

import Head from "next/head"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import DeployForm from "@/components/DeployForm"

export default function DeployPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [cloudAccounts, setCloudAccounts] = useState([])
  const [deploying, setDeploying] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/cloud-accounts")
        .then((res) => res.json())
        .then((data) => setCloudAccounts(data))
        .catch(() => {})
    }
  }, [status])

  if (status === "loading") {
    return (
      <>
        <Head><title>Deploy — SelfVPN</title></Head>
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

  async function handleDeploy(formData) {
    setDeploying(true)
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Deployment failed")
        return
      }

      router.push("/dashboard")
    } catch (err) {
      alert("Something went wrong. Please try again.")
    } finally {
      setDeploying(false)
    }
  }

  return (
    <>
      <Head>
        <title>Deploy — SelfVPN</title>
        <meta name="description" content="Deploy your private WireGuard VPN server." />
      </Head>
      <main style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "40px 20px"
      }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40
          }}>
            <Link href="/" style={{ fontSize: 24, fontWeight: 700, color: "#ffffff", textDecoration: "none" }}>
              SelfVPN
            </Link>
            <Link href="/dashboard" style={{ color: "#8888aa", fontSize: 14, textDecoration: "none" }}>
              Dashboard
            </Link>
          </header>

          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>
            Deploy VPN Server
          </h1>
          <p style={{ color: "#8888aa", fontSize: 14, marginBottom: 32 }}>
            Select your cloud provider, region, and features. Your credentials are encrypted and never stored in plaintext.
          </p>

          <div style={{
            padding: 24,
            background: "#12121a",
            borderRadius: 12,
            border: "1px solid #1e1e2e",
          }}>
            <DeployForm
              cloudAccounts={cloudAccounts}
              onDeploy={handleDeploy}
            />
          </div>
        </div>
      </main>
    </>
  )
}
