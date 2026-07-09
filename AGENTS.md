<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Monorepo layout: `apps/web` (SPA), `packages/api` (Hono Worker), `packages/shared` (types). Build with `vp run -r build`.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Cursor Cloud specific instructions

**csc.cat** is a static React links page (Vite+ / pnpm). No database, API, or `.env` files are required for local development.

### Services

Agents must use `devpin` for the normal dev server so sessions reuse one managed Portless server instead of starting duplicates.

| Service                        | Command                         | URL                                                                                                                            |
| ------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Full stack (portless, default) | `pnpm exec devpin run --wait`   | https://csc-cat.localhost (home), https://surl.scchan.localhost, https://paste.scchan.localhost, https://api.csc-cat.localhost |
| Full stack (direct ports)      | `pnpm dev:direct`               | Vite http://localhost:5173, Worker http://localhost:8787                                                                       |
| Worker + assets (portless)     | `pnpm cf:dev:portless`          | https://csc-cat.localhost (+ dashboard aliases)                                                                                |
| Worker + assets (direct)       | `pnpm cf:dev`                   | http://localhost:8787                                                                                                          |
| Production preview             | `pnpm build && pnpm preview`    | Vite preview port                                                                                                              |

The root `pnpm dev` script delegates to `devpin run --wait`; agents should call `pnpm exec devpin ...` directly when starting, checking, or reusing the dev server.
Devpin starts the existing Portless workflow through `scripts/devpin-portless.mjs`; do not run that wrapper directly.

Useful devpin commands:

- `pnpm exec devpin guide` — show this repo's devpin workflow
- `pnpm exec devpin status` — check whether the managed server is already running
- `pnpm exec devpin run --wait` — start or reuse the managed Portless server
- `pnpm exec devpin url` — print the managed server URL
- `pnpm exec devpin logs --tail 100` — inspect recent server logs
- `pnpm exec devpin stop` — stop the managed server

Run `portless trust` once after install if the browser warns about the local CA. Use direct-port commands only when explicitly testing the non-Portless path.

### Validation

- `pnpm exec vp lint` — lint only
- `pnpm exec tsc --noEmit` — type check
- `pnpm run build` — production build
- `pnpm exec vp check` — format + lint + type check (may report pre-existing formatting drift in UI component files)
- `pnpm exec vp test` — exits with code 1 when no `*.test.*` / `*.spec.*` files exist (expected for this repo)

Use `pnpm exec vp` (or `pnpm dev` / `pnpm run build`) rather than a global `vp` binary; the CLI is provided by the local `vite-plus` devDependency.

### Deploy

`pnpm deploy` requires Cloudflare credentials (`wrangler login` or `CLOUDFLARE_API_TOKEN`). Not needed for local UI work.
