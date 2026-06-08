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

| Service                        | Command                      | URL                                                                                                                            |
| ------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Full stack (portless, default) | `pnpm dev`                   | https://csc-cat.localhost (home), https://surl.scchan.localhost, https://paste.scchan.localhost, https://api.csc-cat.localhost |
| Full stack (direct ports)      | `pnpm dev:direct`            | Vite http://localhost:5173, Worker http://localhost:8787                                                                       |
| Worker + assets (portless)     | `pnpm cf:dev:portless`       | https://csc-cat.localhost (+ dashboard aliases)                                                                                |
| Worker + assets (direct)       | `pnpm cf:dev`                | http://localhost:8787                                                                                                          |
| Production preview             | `pnpm build && pnpm preview` | Vite preview port                                                                                                              |

Run `portless trust` once after install if the browser warns about the local CA. Use `PORTLESS=0 pnpm dev:direct` to bypass portless entirely.

Run the dev server in a tmux session so it stays up across agent turns.

### Validation

- `pnpm exec vp lint` — lint only
- `pnpm exec tsc --noEmit` — type check
- `pnpm run build` — production build
- `pnpm exec vp check` — format + lint + type check (may report pre-existing formatting drift in UI component files)
- `pnpm exec vp test` — exits with code 1 when no `*.test.*` / `*.spec.*` files exist (expected for this repo)

Use `pnpm exec vp` (or `pnpm dev` / `pnpm run build`) rather than a global `vp` binary; the CLI is provided by the local `vite-plus` devDependency.

### Deploy

`pnpm deploy` requires Cloudflare credentials (`wrangler login` or `CLOUDFLARE_API_TOKEN`). Not needed for local UI work.
