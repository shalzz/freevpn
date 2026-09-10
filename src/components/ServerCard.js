"use client"

const STATUS_STYLES = {
  pending: { bg: "#2a2a3a", color: "#f0c040", label: "Pending" },
  deploying: { bg: "#2a2a3a", color: "#60a0ff", label: "Deploying" },
  running: { bg: "#1a2e1a", color: "#40d070", label: "Running" },
  destroyed: { bg: "#2a2a2a", color: "#888888", label: "Destroyed" },
  failed: { bg: "#2e1a1a", color: "#ff6060", label: "Failed" },
}

const PROVIDER_LABELS = {
  aws: "AWS",
  gcp: "Google Cloud",
  digitalocean: "DigitalOcean",
  azure: "Azure",
  linode: "Linode",
  vultr: "Vultr",
  hetzner: "Hetzner",
  scaleway: "Scaleway",
}

export default function ServerCard({ server, onDestroy }) {
  const status = STATUS_STYLES[server.status] || STATUS_STYLES.pending
  const provider = PROVIDER_LABELS[server.provider] || server.provider

  return (
    <div style={{
      background: "#12121a",
      borderRadius: 12,
      border: "1px solid #1e1e2e",
      padding: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 200 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "#1a1a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
          color: "#8888aa"
        }}>
          {provider.charAt(0)}
        </div>
        <div>
          <div style={{ color: "#ffffff", fontSize: 15, fontWeight: 600 }}>
            {provider} — {server.region}
          </div>
          {server.ipAddress && (
            <div style={{ color: "#8888aa", fontSize: 13, fontFamily: "monospace", marginTop: 2 }}>
              {server.ipAddress}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          padding: "4px 10px",
          borderRadius: 6,
          background: status.bg,
          color: status.color,
          fontSize: 12,
          fontWeight: 600,
        }}>
          {status.label}
        </span>

        {server.status !== "destroyed" && (
          <button
            onClick={() => onDestroy?.(server.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              background: "transparent",
              color: "#ff6060",
              border: "1px solid #ff606033",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Destroy
          </button>
        )}
      </div>
    </div>
  )
}
