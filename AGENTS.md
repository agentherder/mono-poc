# Agent Command Reference

Agents should run every task **from the repository root** with  
`pnpm <script‑name>`.  
All scripts are declared in the root `package.json`, require no
interactive input, and exit with a POSIX status code ( `0` success,  
`1` failure, `130` SIGINT).

> **One‑time prerequisite**
>
> ```bash
> pnpm install
> ```

---

## Fast iteration

- `pnpm check:quick` – **Type check + Lint only.**  
  Cheapest validation loop while editing code.

- `pnpm typecheck` – Full `tsc --noEmit` across every project.

- `pnpm lint` – ESLint (flat config) with Prettier rules.

---

## Full validation pipeline

- `pnpm build` – Compile every app and library (no TUI, no watch).

- `pnpm test` – Unit tests (Vitest + JSDOM).

- `pnpm e2e` – Playwright end‑to‑end suites.

- `pnpm check:full` – **Canonical pre‑merge gate.**  
  Runs, in order:  
  `format:write → typecheck → lint → build → test → e2e`.

- `pnpm reset` – Purge Nx’s task cache when results seem stale.

---

## Formatting utilities

- `pnpm format:write` – Prettier **write** mode (auto‑fix).

- `pnpm format:check` – Prettier **check** mode (read‑only).

---

## Local watch mode _(interactive)_

- `pnpm dev` – Starts all applicable `nx dev` servers with the Nx TUI.  
  **Skip in non‑interactive containers.**
