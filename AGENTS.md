# Agent Command Reference

Agents should run commands **from the repository root** with `pnpm <script‑name>`.

These are the **canonical commands** exposed in the monorepo root
`package.json`. Each `pnpm <script>` triggers an `nx` command that targets
all code across the monorepo.

## Useful combined checks for fast iteration

- `pnpm check` Fast iteration typecheck + lint
- `pnpm prepare` Final format + check + unit test before pushing
- `pnpm pretest` Same as prepare but no tests for TDD

## Useful commands

- `pnpm build` Produce production bundles / ensure compile
- `pnpm test` Run all unit tests
- `pnpm typecheck` Strict TypeScript checking across the workspace
- `pnpm lint` ESLint check
- `pnpm lint:fix` Auto‑fix ESLint
- `pnpm format:check` Verify formatting without changing files
- `pnpm format:write` Auto‑format with Prettier
- `pnpm reset` Clear the Nx task cache if results look incorrect

## AVOID in cloud containers

End-to-end tests are heavy and often fail in cloud containers.

- `pnpm e2e` Run Playwright end‑to‑end suites
- `pnpm pr` Full install + check + e2e for PRs

## AVOID interactive

- `pnpm dev` Interactive local development of all apps
