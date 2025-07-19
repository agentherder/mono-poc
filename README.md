# AgentHerder Monorepo Proof-of-Concept

`agentherder/mono-poc` is an **early PoC** monorepo.

1. `apps/web` – React + TypeScript SPA - [React Router v7 framework mode](https://reactrouter.com/start/framework/routing)
2. `apps/extension` – React + TypeScript browser extension - [WXT](https://wxt.dev/guide/essentials/project-structure.html)
3. `libs/shared` – Shared code imports - No build step

It is intended to prove the SPA and extension can share:

1. Basic React components and TS utilities
2. Reactive DB state updates with server go-between
3. Offline local-first reactive state with [`SharedWorker`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) go-between

Nx orchestrates every dev, build, test and CI task so that _one CLI_ works everywhere.

---

## Quick Start

```bash
# 1  Clone & install
git clone https://github.com/your‑org/agentherder.git
cd agentherder
pnpm install

# 2  Launch both apps in watch mode (web on :5173, extension re‑loads on change)
pnpm dev
```

> Under the hood that script calls
> `nx run-many --target=dev --projects=web,extension`.

---

## Repository Structure

This is an [Nx](https://nx.dev) monorepo managed with `pnpm`. The structure is organized into applications (`apps`) and shared code (`libs`).

```
/
├── apps/
│   ├── web/                # React (Vite + RRv7) SPA for the main dashboard
│   ├── web-e2e/            # Playwright E2E tests for the web app
│   ├── extension/          # WXT (Vite) React browser extension for data capture
│   └── extension-e2e/      # Playwright E2E tests for the extension
│
├── libs/
│   └── shared/             # Shared React components, hooks, and utilities
│
├── nx.json                 # Nx workspace configuration
├── package.json            # Root dependencies and scripts
├── pnpm-workspace.yaml     # pnpm workspace definition
└── tsconfig.base.json      # Base TypeScript configuration with path aliases
```

---

## Root Script Cheat Sheet

These are the **canonical commands** exposed in the monorepo root
`package.json`. Each `pnpm <script>` triggers an `nx` command that targets
all code across the monorepo.

| Shortcut            | Typical use case                                  |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Interactive local development of all apps         |
| `pnpm build`        | Produce production bundles / ensure compile       |
| `pnpm test`         | Run all unit tests                                |
| `pnpm e2e`          | Run Playwright end‑to‑end suites                  |
| `pnpm typecheck`    | Strict TypeScript checking across the workspace   |
| `pnpm lint`         | ESLint check                                      |
| `pnpm lint:fix`     | Auto‑fix ESLint                                   |
| `pnpm format:check` | Verify formatting without changing files          |
| `pnpm format:write` | Auto‑format with Prettier                         |
| `pnpm check`        | Fast iteration typecheck + lint                   |
| `pnpm prepare`      | Final format + check + unit test before pushing   |
| `pnpm pretest`      | Same as prepare but no tests for TDD              |
| `pnpm pr`           | Full install + check + e2e for PRs                |
| `pnpm reset`        | Clear the Nx task cache if results look incorrect |

> **Note for AI agents:**
>
> - USEFUL:
>   - Fast iteration: `pnpm check`
>   - Final validation: `pnpm prepare`
>   - Checks or tests are unexpectedly skipped: `pnpm reset`
> - AVOID:
>   - Interactive watcher: `pnpm dev`
> - AVOID in cloud containers:
>   - Heavy E2E tests: `pnpm e2e`, `pnpm pr`

---

## App Specific Notes

### `apps/web`

- Uses **React Router v7 “framework mode”**—see [`react-router.config.ts`](apps/web/react-router.config.ts) and [`app/`](apps/web/app).
- Built & served by **Vite 6**; SSR capable via `@react-router/node` + `@react-router/serve`.
- TailwindCSS 3.x for styling, shadcn/ui for headless components.

### `apps/extension`

- Structured according to [WXT project‑structure](https://wxt.dev/guide/essentials/project-structure.html).
  Main entry points live in `src/entrypoints/…`.
- Dev & build scripts are proxied through Nx targets but can also be run directly:

```bash
# Inside apps/extension
pnpm dev          # Chrome
pnpm dev:firefox  # Firefox
pnpm build        # Production (MV3)
pnpm zip          # Create web‑store upload zip
```

---

## TypeScript Monorepo Philosophy

- **Project References** – Every package/app is `composite: true`; Nx keeps refs synced.
- **Path Aliases** – Declared once in `tsconfig.base.json`; both Vite and WXT inherit automatically.
- **Isolated Builds** – `nx build <lib>` emits declaration files and can be consumed by external repos.

For a deep dive see Nx docs:

- [Everything You Need to Know About TypeScript Project References](https://nx.dev/blog/typescript-project-references)
- [Maintain TypeScript Monorepos](https://nx.dev/features/maintain-ts-monorepos)

---

## Continuous Integration

CI is scaffolded but untested.

- **GitHub Actions** (`.github/workflows/ci.yml`)

  1. `pnpm install --frozen-lockfile`
  2. `nx run-many -t lint test build e2e`
  3. `nx fix-ci` to suggest flaky fixes

- Playwright browsers are installed automatically.
- Nx Cloud is pre‑wired—uncomment `nx start-ci-run …` to distribute tasks.

---

## Useful Commands For Humans *&* Bots

```bash
# Show every task Nx inferred or that we authored
nx show project web

# What will break if I edit shared/?
nx affected:graph --base=main
```

---

## Further Reading

- **Nx & TypeScript**
  - [A New Nx Experience for TS Monorepos](https://nx.dev/blog/new-nx-experience-for-typescript-monorepos)
  - [Managing TypeScript Packages in Monorepos](https://nx.dev/blog/managing-ts-packages-in-monorepos)
- **React Router v7**
  - [Routing](https://reactrouter.com/start/framework/routing)
  - [Route Modules](https://reactrouter.com/start/framework/route-module)
- **WXT**
  - [Entrypoints](https://wxt.dev/guide/essentials/entrypoints.html)
