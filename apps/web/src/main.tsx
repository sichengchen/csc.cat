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

function MissingClerkConfig() {
  return (
    <main className="grid min-h-svh place-items-center bg-background px-4 text-foreground">
      <div className="max-w-md space-y-2 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Dashboard unavailable</h1>
        <p className="text-sm text-muted-foreground">
          Missing VITE_CLERK_PUBLISHABLE_KEY for this dashboard host.
        </p>
      </div>
    </main>
  );
}

createRoot(document.querySelector<HTMLDivElement>("#app")!).render(
  <StrictMode>
    {dashboardKind ? (
      publishableKey ? (
        <ClerkProvider publishableKey={publishableKey}>
          <DashboardApp kind={dashboardKind} />
        </ClerkProvider>
      ) : (
        <MissingClerkConfig />
      )
    ) : (
      <HomeApp />
    )}
  </StrictMode>,
);
