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

The repository pins `@google/design.md` 0.4.0. `design:lint` runs that local CLI
and reports its findings directly.

After changing `DESIGN.md`, run `design:lint`, then `design:build`. Inspect both
generated files and commit the source and generated files together. Review all
reported warnings in their rendered context. `pnpm check` adds application lint
and production build checks.

## CSS entrypoint

`src/index.css` imports Tailwind first and the generated theme second. It may contain application-wide base styles and the class-driven dark-mode variant, but token values belong in `DESIGN.md`.

## Component documentation

The files in `design/components/` describe component intent, anatomy, states, and accessibility. The matching React implementations live in `src/components/`.

Use the [`component index`](components/README.md) to track which contracts are
implemented. A component token in `DESIGN.md` is not implementation evidence.

## Export limitations

With the pinned CLI, Tailwind and DTCG exports omit component entries. Unitless
typography line heights remain quoted in YAML because CLI 0.4.0 otherwise drops
numeric YAML values during export. Re-check this workaround and the component
limitation whenever the CLI version changes.
