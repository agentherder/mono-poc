# AgentHerder Monorepo Proof-of-Concept

`agentherder/mono-poc` is an **early PoC** monorepo.

1. `apps/web` – React + TypeScript SPA: [TanStack Start SPA mode](https://tanstack.com/start/latest/docs/framework/react/spa-mode)
2. `apps/extension` – React + TypeScript browser extension: [WXT](https://wxt.dev/guide/essentials/project-structure.html)
3. `libs/shared` – Shared code imports: No build step

It is intended to prove the SPA and extension can share:

1. Basic React components and TS utilities
2. Reactive DB state updates with server go-between
3. Offline local-first reactive state with [`SharedWorker`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) go-between

---

## Repository Structure

This is an [Nx](https://nx.dev) monorepo managed with [`pnpm`](https://pnpm.io/).
The structure is organized into applications (`apps`) and shared code (`libs`).

```
/
├── apps/
│   ├── web/                # React Tanstack Start SPA for the main dashboard
│   ├── web-e2e/            # Playwright E2E tests for the web app
│   ├── extension/          # WXT (Vite) React browser extension for data capture
│   └── extension-e2e/      # Playwright E2E tests for the extension
│
├── libs/
│   └── shared/             # Shared React components, hooks, and Triplit DB config
│
├── nx.json                 # Nx workspace configuration
├── package.json            # Root dependencies and scripts
├── pnpm-workspace.yaml     # pnpm workspace definition
└── tsconfig.base.json       # Base TypeScript configuration with path aliases
```

---

## Script Cheat Sheet

These shortcut scripts are exposed in the monorepo main `package.json`.
Each shortcut triggers an `nx` command that targets all `apps/` and `libs/` across the monorepo.

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Interactive local development of all apps       |
| `pnpm build`        | Produce production bundles / ensure compile     |
| `pnpm test`         | Run all unit tests                              |
| `pnpm e2e`          | Run Playwright end‑to‑end suites                |
| `pnpm typecheck`    | Strict TypeScript checking across the workspace |
| `pnpm lint`         | ESLint check                                    |
| `pnpm lint:fix`     | Auto‑fix ESLint                                 |
| `pnpm format:check` | Verify formatting without changing files        |
| `pnpm format:write` | Auto‑format with Prettier                       |
| `pnpm check`        | Fast iteration typecheck + lint                 |
| `pnpm validate`     | Final format + check + unit test before pushing |
| `pnpm tddred`       | Same as validate but no tests for TDD red phase |
| `pnpm check:pr`     | Full install + check + e2e for PRs              |
| `pnpm db`           | Run Triplit CLI commands                        |

### Note for AI agents

- USEFUL:
  - Fast iteration: `pnpm check`
  - Final validation: `pnpm validate`
  - Reset cache when tasks are unexpectedly skipping: `pnpm nx reset`
  - If you are **specifically asked** to do a TDD red phase: `pnpm tddred`
- AVOID:
  - Interactive watcher: `pnpm dev`
- AVOID in cloud containers:
  - Heavy E2E tests: `pnpm e2e`, `pnpm check:pr`

### Nx Commands

`pnpm nx run` can be used for specific projects, tasks, and configs.
For example:

- `pnpm nx run web:build` Build the web app
- `pnpm nx run web:build:production` Build the web app for production
- `pnpm nx run web-e2e:e2e` Run E2E tests for the web app
- `pnpm nx run shared:test` Run unit tests for the shared code

`pnpm nx` can run any Nx command.

- `pnpm nx reset` Reset Nx cache and daemon
- `pnpm nx sync` Sync tsconfig references across the workspace
- `pnpm nx list` List all Nx plugins, executors, and generators
- `pnpm nx repair` Repair the Nx workspace
- `pnpm nx help` Display help for all commands
- `pnpm nx <command> --help` Display help for a specific command

### Triplit Commands

The Triplit schema is not stored where the Triplit CLI looks by default.

`pnpm db <command>` is a shortcut for
`pnpm exec triplit --schemaPath=libs/shared/src/triplit/schema.ts <command>`.

- `pnpm db dev` Start local Triplit server
- `pnpm db schema push` Push schema to Triplit server
- `pnpm db help` Help for more Triplit CLI commands

---

## Tech Stack

### Shared

- [pnpm](https://pnpm.io/motivation) - Package manager
- [Nx](https://nx.dev/getting-started/intro) - Monorepo manager
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/docs/) - Type checking
- [Triplit](https://www.triplit.dev/docs) - Database
- [TailwindCSS](https://tailwindcss.com/docs/installation/using-postcss) - UI styling
- [Vitest](https://vitest.dev/guide/) - Unit tests
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - UI unit tests
- [Playwright](https://playwright.dev/docs/intro) - End-to-end tests

### Web app

- [TanStack Start][https://reactrouter.com/home](https://tanstack.com/start/latest/docs/framework/react/overview) - Web app framework
- [Vercel](https://vercel.com/docs) - Web app hosting

### Browser extension

- [WXT](https://wxt.dev/guide/installation.html) - Browser extension framework

---

## Continuous Integration

CI in `.github/workflows/ci.yml` is scaffolded but untested.
