import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { registerDashboardAliases } from "./register-dashboard-aliases.mjs";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const port = process.env.PORT;

if (!port) {
  console.error("cf-dev-portless: PORT is not set. Run via portless.");
  process.exit(1);
}

const build = spawn("pnpm", ["exec", "vp", "run", "build"], {
  cwd: repoRoot,
  env: process.env,
  stdio: "inherit",
});

build.on("exit", (code) => {
  if (code !== 0) {
    process.exit(code ?? 1);
  }

  registerDashboardAliases(port);

  const wrangler = spawn("pnpm", ["exec", "wrangler", "dev", "--ip", "127.0.0.1", "--port", port], {
    cwd: repoRoot,
    env: process.env,
    stdio: "inherit",
  });

  wrangler.on("exit", (wranglerCode, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(wranglerCode ?? 0);
  });
});
