export const OAUTH_PROVIDERS = {
  digitalocean: {
    label: "DigitalOcean",
    authorizeUrl: "https://cloud.digitalocean.com/v1/oauth/authorize",
    tokenUrl: "https://cloud.digitalocean.com/v1/oauth/token",
    scope: "read write",
    clientId: process.env.DIGITALOCEAN_CLIENT_ID,
    clientSecret: process.env.DIGITALOCEAN_CLIENT_SECRET,
  },
  linode: {
    label: "Linode",
    authorizeUrl: "https://login.linode.com/oauth/authorize",
    tokenUrl: "https://login.linode.com/oauth/token",
    scope: "linodes:read_write",
    clientId: process.env.LINODE_CLIENT_ID,
    clientSecret: process.env.LINODE_CLIENT_SECRET,
  },
}

export function getOAuthConfig(provider) {
  return OAUTH_PROVIDERS[provider] || null
}
