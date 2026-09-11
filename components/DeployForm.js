"use client"

import { useState } from "react"

const PROVIDERS = {
  digitalocean: {
    label: "DigitalOcean",
    authType: "oauth",
    regions: ["nyc1", "nyc3", "sfo3", "ams3", "sgp1", "lon1", "fra1", "blr1", "syd1"],
  },
  aws: {
    label: "AWS",
    authType: "oauth",
    regions: ["us-east-1", "us-east-2", "us-west-1", "us-west-2", "eu-west-1", "eu-west-2", "eu-central-1", "ap-southeast-1", "ap-northeast-1"],
  },
  gcp: {
    label: "Google Cloud",
    authType: "oauth",
    regions: ["us-central1", "us-east1", "us-west1", "europe-west1", "europe-west4", "asia-east1", "asia-southeast1"],
  },
  azure: {
    label: "Azure",
    authType: "oauth",
    regions: ["eastus", "eastus2", "westus", "westus2", "westeurope", "northeurope", "southeastasia", "japaneast"],
  },
  linode: {
    label: "Linode",
    authType: "oauth",
    regions: ["us-east", "us-central", "us-west", "eu-west", "ap-south", "ap-northeast"],
  },
  vultr: {
    label: "Vultr",
    authType: "oauth",
    regions: ["ewr", "ord", "dfw", "lax", "ams", "fra", "lhr", "sgp", "tok"],
  },
  hetzner: {
    label: "Hetzner",
    authType: "apikey",
    regions: ["nbg1", "fsn1", "hel1", "ash", "hil"],
  },
  scaleway: {
    label: "Scaleway",
    authType: "apikey",
    regions: ["fr-par-1", "fr-par-2", "nl-ams-1", "pl-waw-1"],
  },
}

const FEATURES = [
  { id: "dns_adblocking", label: "DNS ad-blocking", description: "Block ads and trackers at the DNS level" },
  { id: "ssh_tunneling", label: "SSH tunneling", description: "Allow restricted SSH tunnel accounts" },
]

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "#1a1a2e",
  color: "#ffffff",
  border: "1px solid #2a2a3a",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
}

const labelStyle = {
  display: "block",
  color: "#8888aa",
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
}

export default function DeployForm({ cloudAccounts, onDeploy }) {
  const [provider, setProvider] = useState("")
  const [region, setRegion] = useState("")
  const [features, setFeatures] = useState({})
  const [apiKey, setApiKey] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const providerConfig = PROVIDERS[provider]
  const matchedAccount = cloudAccounts?.find((a) => a.provider === provider)

  function handleProviderChange(e) {
    setProvider(e.target.value)
    setRegion("")
    setApiKey("")
    setError("")
  }

  function handleConnectOAuth() {
    window.location.href = `/api/oauth/${provider}`
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!provider) return setError("Select a cloud provider")
    if (!region) return setError("Select a region")

    if (providerConfig.authType === "oauth" && !matchedAccount) {
      return setError("Connect your cloud account first")
    }
    if (providerConfig.authType === "apikey" && !apiKey.trim()) {
      return setError("Enter your API key")
    }

    setSubmitting(true)
    onDeploy({
      provider,
      region,
      features,
      cloudAccountId: matchedAccount?.id || null,
      apiKey: providerConfig.authType === "apikey" ? apiKey : null,
    }).finally(() => setSubmitting(false))
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {error && (
        <div style={{
          padding: "10px 14px",
          background: "#2e1a1a",
          color: "#ff6060",
          borderRadius: 8,
          fontSize: 13,
        }}>
          {error}
        </div>
      )}

      {/* Provider */}
      <div>
        <label style={labelStyle}>Cloud Provider</label>
        <select value={provider} onChange={handleProviderChange} style={{ ...inputStyle, cursor: "pointer" }}>
          <option value="">Select a provider</option>
          {Object.entries(PROVIDERS).map(([key, p]) => (
            <option key={key} value={key}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Region */}
      {providerConfig && (
        <div>
          <label style={labelStyle}>Region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="">Select a region</option>
            {providerConfig.regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      )}

      {/* Cloud Account Connection */}
      {providerConfig && providerConfig.authType === "oauth" && (
        <div>
          <label style={labelStyle}>Cloud Account</label>
          {matchedAccount ? (
            <div style={{
              padding: "10px 14px",
              background: "#1a2e1a",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{ color: "#40d070", fontSize: 13 }}>
                Connected{matchedAccount.name ? ` — ${matchedAccount.name}` : ""}
              </span>
              <button
                type="button"
                onClick={() => {}}
                style={{
                  background: "transparent",
                  color: "#8888aa",
                  border: "none",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleConnectOAuth}
              style={{
                ...inputStyle,
                cursor: "pointer",
                textAlign: "center",
                color: "#ffffff",
                background: "#1e1e2e",
              }}
            >
              Connect {providerConfig.label} Account
            </button>
          )}
        </div>
      )}

      {/* API Key */}
      {providerConfig && providerConfig.authType === "apikey" && (
        <div>
          <label style={labelStyle}>API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={`Enter your ${providerConfig.label} API key`}
            style={inputStyle}
          />
          <p style={{ color: "#555577", fontSize: 12, marginTop: 4 }}>
            Encrypted at rest. Used only during deployment.
          </p>
        </div>
      )}

      {/* Features */}
      {provider && (
        <div>
          <label style={labelStyle}>Features</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEATURES.map((f) => (
              <label
                key={f.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "10px 14px",
                  background: "#1a1a2e",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!features[f.id]}
                  onChange={(e) => setFeatures((prev) => ({ ...prev, [f.id]: e.target.checked }))}
                  style={{ marginTop: 2 }}
                />
                <div>
                  <div style={{ color: "#ffffff", fontSize: 14, fontWeight: 500 }}>{f.label}</div>
                  <div style={{ color: "#555577", fontSize: 12 }}>{f.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || !provider}
        style={{
          padding: "12px 24px",
          background: !provider ? "#2a2a3a" : "linear-gradient(135deg, #6699FF 0%, #FF3366 100%)",
          color: "#ffffff",
          border: "none",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          cursor: !provider ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Deploying..." : "Deploy VPN Server"}
      </button>
    </form>
  )
}
