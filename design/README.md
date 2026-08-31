# Design workflow

`DESIGN.md` is the only hand-edited source of design tokens. It combines exact YAML values with the reasoning that explains how those values should be used.

## Generated files

- `src/theme.css` is the Tailwind v4 `@theme` export.
- `tokens.json` is the DTCG/W3C design-token export.

Both files are generated artifacts. Never edit them directly.

## Commands

```sh
pnpm design:lint
pnpm design:build
```

Run `pnpm design:lint` after changing `DESIGN.md`. If it passes, run `pnpm design:build` and commit the source and both generated files together.

## CSS entrypoint

`src/index.css` imports Tailwind first and the generated theme second. It may contain application-wide base styles and the class-driven dark-mode variant, but token values belong in `DESIGN.md`.

## Component documentation

The files in `design/components/` describe component intent, anatomy, states, and accessibility. The matching React implementations live in `src/components/`.
