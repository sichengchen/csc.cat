import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DashboardApp } from "./DashboardApp";
import { HomeApp } from "./HomeApp";
import { getDashboardKind } from "@/lib/dashboard-host";
import "./style.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const { hostname, port } = window.location;
const dashboardKind = getDashboardKind(hostname, port);

createRoot(document.querySelector<HTMLDivElement>("#app")!).render(
  <StrictMode>
    {dashboardKind ? (
      publishableKey ? (
        <ClerkProvider publishableKey={publishableKey}>
          <DashboardApp kind={dashboardKind} />
        </ClerkProvider>
      ) : (
        <DashboardApp kind={dashboardKind} />
      )
    ) : (
      <HomeApp />
    )}
  </StrictMode>,
);
