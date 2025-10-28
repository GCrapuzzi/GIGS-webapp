/**
 * Frontend configuration helpers for Auth0 and external APIs.
 */

const normalizeBaseUrl = (url) =>
  typeof url === "string" ? url.trim().replace(/\/+$/, "") : "";

const authConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
};

const config = {
  googleAPIkey: process.env.REACT_APP_GOOGLE_API_KEY,
  apiBaseUrl: normalizeBaseUrl(process.env.REACT_APP_API_BASE_URL),
  assetBaseUrl: normalizeBaseUrl(
    process.env.REACT_APP_ASSET_BASE_URL || process.env.REACT_APP_API_BASE_URL
  ),
};

export function getConfig() {
  const { domain, clientId, audience } = authConfig;

  if (!domain || !clientId) {
    throw new Error(
      "Missing Auth0 configuration. Ensure REACT_APP_AUTH0_DOMAIN and REACT_APP_AUTH0_CLIENT_ID are set."
    );
  }

  return {
    domain,
    clientId,
    ...(audience ? { audience } : {}),
  };
}

export function buildApiUrl(path = "") {
  if (!config.apiBaseUrl) {
    throw new Error(
      "Missing API base URL configuration. Set REACT_APP_API_BASE_URL."
    );
  }

  if (!path) {
    return config.apiBaseUrl;
  }

  return `${config.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildAssetUrl(path = "") {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!config.assetBaseUrl) {
    return path;
  }

  return `${config.assetBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export default config;
