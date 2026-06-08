import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DashboardApp } from "./DashboardApp";
import { HomeApp } from "./HomeApp";
import "./style.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function isDashboardHost(hostname: string, port: string): boolean {
  if (hostname === "surl.scchan.com") {
    return true;
  }

  // wrangler dev serves the production build (import.meta.env.DEV is false)
  if ((hostname === "localhost" || hostname === "127.0.0.1") && port === "8787") {
    return true;
  }

  return false;
}

const { hostname, port } = window.location;
const dashboardHost = isDashboardHost(hostname, port);

createRoot(document.querySelector<HTMLDivElement>("#app")!).render(
  <StrictMode>
    {dashboardHost ? (
      publishableKey ? (
        <ClerkProvider publishableKey={publishableKey}>
          <DashboardApp />
        </ClerkProvider>
      ) : (
        <DashboardApp />
      )
    ) : (
      <HomeApp />
    )}
  </StrictMode>,
);
