import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import redirects from "../../packages/shared/src/redirects.json";
import { portlessDashboardAliasesPlugin } from "./vite-portless-plugin";

function redirectsPlugin(): Plugin {
  return {
    name: "generate-redirects",
    closeBundle() {
      const content =
        Object.entries(redirects)
          .map(([id, destination]) => `/${id} ${destination} 302`)
          .join("\n") + "\n";

      writeFileSync(join("dist", "_redirects"), content);
    },
  };
}

const portlessPort = process.env.PORT ? Number(process.env.PORT) : undefined;

const apiProxyTarget =
  process.env.PORTLESS_API_TARGET ??
  (process.env.PORTLESS === "0" ? "http://localhost:8787" : "https://api.csc-cat.localhost");

function apiProxy() {
  return {
    target: apiProxyTarget,
    changeOrigin: true,
    secure: false,
    ws: true,
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), redirectsPlugin(), portlessDashboardAliasesPlugin()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  server: {
    host: "127.0.0.1",
    port: portlessPort ?? 5173,
    strictPort: Boolean(portlessPort),
    allowedHosts: ["csc-cat.localhost", "surl.scchan.localhost", "paste.scchan.localhost"],
    // Only proxy API and short-link redirects. Paste pages (`/p/:slug`) are client
    // routes; `?raw=1` is handled in PasteViewPage. Do not proxy `/p/` — it breaks
    // the dev SPA and sends page loads to the Worker's static dist.
    proxy: {
      "/api/": apiProxy(),
      "/s/": apiProxy(),
    },
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
