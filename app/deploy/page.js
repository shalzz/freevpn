"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Suspense, useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DeployForm from "@/components/DeployForm"

export default function DeployPage() {
  return (
    <Suspense fallback={<div style={{ color: "#8888aa", textAlign: "center", padding: 40 }}>Loading...</div>}>
      <DeployContent />
    </Suspense>
  )
}

function DeployContent() {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [cloudAccounts, setCloudAccounts] = useState([])
  const [deploying, setDeploying] = useState(false)

  const fetchAccounts = useCallback(() => {
    if (status === "authenticated") {
      fetch("/api/cloud-accounts")
        .then((res) => res.json())
        .then((data) => setCloudAccounts(data))
        .catch(() => {})
    }
  }, [status])

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  // Refresh accounts after OAuth callback
  useEffect(() => {
    if (searchParams.get("connected")) {
      fetchAccounts()
    }
  }, [searchParams, fetchAccounts])

  if (status === "loading") {
    return (
      <>
        <title>Deploy — SelfVPN</title>
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

  const errorMsg = searchParams.get("error")
  const connectedMsg = searchParams.get("connected")

  return (
    <>
      <title>Deploy — SelfVPN</title>
      <meta name="description" content="Deploy your private WireGuard VPN server." />
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

          {errorMsg && (
            <div style={{
              padding: "10px 14px",
              background: "#2e1a1a",
              color: "#ff6060",
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16,
            }}>
              {errorMsg === "oauth_denied" && "OAuth was denied. Please try again."}
              {errorMsg === "token_exchange_failed" && "Failed to connect account. Please try again."}
              {errorMsg === "unsupported_provider" && "Unsupported cloud provider."}
              {errorMsg !== "oauth_denied" && errorMsg !== "token_exchange_failed" && errorMsg !== "unsupported_provider" && errorMsg}
            </div>
          )}

          {connectedMsg && (
            <div style={{
              padding: "10px 14px",
              background: "#1a2e1a",
              color: "#40d070",
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16,
            }}>
              Successfully connected your {connectedMsg} account.
            </div>
          )}

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