import { execSync } from "node:child_process";
import type { Plugin } from "vite-plus";

const DASHBOARD_ALIASES = ["surl.scchan", "paste.scchan"];

export function portlessDashboardAliasesPlugin(): Plugin {
  return {
    name: "portless-dashboard-aliases",
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        const address = server.httpServer?.address();
        const port =
          typeof address === "object" && address !== null && "port" in address
            ? address.port
            : process.env.PORT;

        if (!port) {
          return;
        }

        for (const name of DASHBOARD_ALIASES) {
          try {
            execSync(`portless alias ${name} ${port} --force`, { stdio: "pipe" });
            console.log(`portless: https://${name}.localhost -> 127.0.0.1:${port}`);
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.warn(`portless: failed to alias ${name} -> ${port}: ${message}`);
          }
        }
      });
    },
  };
}
