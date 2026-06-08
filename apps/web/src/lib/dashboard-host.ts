import type { DashboardKind } from "@/DashboardApp";

const DASHBOARD_HOSTS: Record<string, DashboardKind> = {
  "paste.scchan.com": "paste",
  "paste.scchan.localhost": "paste",
  "surl.scchan.com": "surl",
  "surl.scchan.localhost": "surl",
};

function isDirectWorkerDev(hostname: string, port: string): boolean {
  return (hostname === "localhost" || hostname === "127.0.0.1") && port === "8787";
}

export function getDashboardKind(hostname: string, port: string): DashboardKind | null {
  const dashboardKind = DASHBOARD_HOSTS[hostname];
  if (dashboardKind) {
    return dashboardKind;
  }

  if (isDirectWorkerDev(hostname, port)) {
    return "surl";
  }

  return null;
}
