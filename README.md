# Bento UI — DESIGN.md + Tailwind demo

Bento UI is a semantic design system with a responsive React/Vite reference
implementation driven by `DESIGN.md` and styled with Tailwind CSS v4.

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
pnpm format
pnpm check
```

Run `pnpm format` to format the project and sort Tailwind classes. Run `pnpm check`
before submitting changes; it verifies formatting, the design system, lint rules,
TypeScript, and the production build.

Tailwind uses its official Vite plugin. The application CSS entrypoint is `src/index.css`, which imports Tailwind and the generated theme and defines the class-driven dark mode.

Inter weights 400–700 are self-hosted through the pinned `@fontsource/inter`
package. The web adapter maps the authored light and dark semantic themes without
changing component meaning or behavior.
