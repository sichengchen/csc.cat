import { execSync } from "node:child_process";

const DASHBOARD_ALIASES = ["surl.scchan", "paste.scchan"];

export function registerDashboardAliases(port = process.env.PORT) {
  if (!port) {
    console.warn("PORT not set; skipping dashboard portless aliases");
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
}
