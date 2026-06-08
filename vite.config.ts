import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { redirects } from "./src/redirects";

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
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
