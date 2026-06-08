import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { redirects } from "@csc/shared/redirects";

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

export default defineConfig({
  plugins: [react(), tailwindcss(), redirectsPlugin()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8787",
      "/s": "http://localhost:8787",
    },
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
