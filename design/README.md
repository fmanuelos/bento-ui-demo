# Design repository workflow

This file documents the current repository integration. It is non-normative:
packages, commands, generated formats, and runtime structure may change without
changing the meaning of the Bento UI Admin design contract.

[`DESIGN.md`](../DESIGN.md) is the only hand-edited source of exact token values.
Its Markdown body, the [`component contracts`](components/), and the
[`experience patterns`](patterns/) define intended use. The
[`adapter documentation`](adapters/) translates that contract for specific
platforms and tools.

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

`src/index.css` imports Tailwind first and the generated theme second. It contains
application-wide base styles and the class-driven dark-mode adapter mapping.
Exact light and dark values belong in `DESIGN.md`; the adapter only maps each
unqualified runtime variable to its exported `dark-*` semantic counterpart under
`data-theme="dark"`.

## Component documentation

The files in `design/components/` describe component intent, anatomy, states,
behavior, and accessibility without depending on a UI framework.

Use the [`component index`](components/README.md) to track contract maturity. A
component token in `DESIGN.md` does not prove that an implementation exists or
conforms.

Application implementation inventories belong in application or source-code
documentation rather than the design-system contract.

## Export limitations

With the pinned CLI, Tailwind and DTCG exports omit component entries. Unitless
typography line heights remain quoted in YAML because CLI 0.4.0 otherwise drops
numeric YAML values during export. Re-check this workaround and the component
limitation whenever the CLI version changes.

The alpha DESIGN.md schema has no theme-mode group. Dark colors therefore use
flat `dark-*` semantic names that both current exporters preserve. Do not nest
light and dark maps under `colors`: the current Tailwind exporter turns nested
paths into invalid dotted CSS identifiers.

## Known lint baseline

With `@google/design.md` 0.4.0, the current document has zero lint errors and 138
warnings. Six are contrast warnings:

| Finding                                              | Interpretation                                                                    | Review rule                                                                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary, secondary, and destructive disabled buttons | The linter applies its standard text contrast check to disabled components.       | Confirm that disabled controls remain identifiable without relying on low contrast alone; do not change tokens only to silence the warning. |
| Transparent outline and ghost buttons                | The linter cannot resolve the permitted surface through a transparent background. | Verify each foreground and outline border on every supported surface listed in `DESIGN.md`.                                                 |
| Transparent tab                                      | The linter cannot resolve the permitted surface through a transparent background. | Verify default and state foregrounds on every supported surface.                                                                            |

The remaining warnings identify light or dark color tokens that are not
referenced by a supported component property. Many are intentionally consumed by
prose-defined borders, focus indicators, charts, page backgrounds, theme adapter
mappings, or other concepts that the current component schema cannot encode.
Review them whenever the schema or exporter changes; do not add misleading
component mappings to suppress them.

Treat this as a comparison baseline, not an allowed-error budget. A change must
not add `broken-ref`, `unknown-key`, `token-like-ignored`, `section-order`, or
unknown component-property findings.

## Documentation validation

For a documentation-only change that does not alter token values, run
`pnpm design:lint` and verify local links. Do not regenerate outputs merely because
prose or component contracts changed.

If frontmatter token values change, follow the generated-file workflow above and
review the generated diffs in a separate implementation-aware change.
