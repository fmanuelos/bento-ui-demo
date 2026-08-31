# Morrow — DESIGN.md + Tailwind demo

Morrow is a responsive React/Vite bento dashboard driven by `DESIGN.md` and styled with Tailwind CSS v4.

## Design-token workflow

```sh
pnpm design:lint
pnpm design:build
```

`pnpm design:build` generates:

- `src/theme.css` — Tailwind v4 `@theme` values
- `tokens.json` — DTCG/W3C design tokens

Do not edit generated files. Update `DESIGN.md`, validate it, and regenerate both outputs. See `design/README.md` for the complete workflow and `design/components/` for component specifications.

## Development

```sh
pnpm dev
pnpm lint
pnpm build
```

Tailwind uses its official Vite plugin. The application CSS entrypoint is `src/index.css`, which imports Tailwind and the generated theme and defines the class-driven dark mode.
