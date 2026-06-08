import type { DashboardKind } from "@/DashboardApp";

const PASTE_HOSTS = new Set(["paste.scchan.com", "paste.scchan.localhost"]);
const SURL_HOSTS = new Set(["surl.scchan.com", "surl.scchan.localhost"]);

export function getDashboardKind(hostname: string, port: string): DashboardKind | null {
  if (PASTE_HOSTS.has(hostname)) {
    return "paste";
  }

  if (SURL_HOSTS.has(hostname)) {
    return "surl";
  }

  // Direct wrangler dev without portless
  if ((hostname === "localhost" || hostname === "127.0.0.1") && port === "8787") {
    return "surl";
  }

  return null;
}

export function isDashboardHost(hostname: string, port: string): boolean {
  return getDashboardKind(hostname, port) !== null;
}
