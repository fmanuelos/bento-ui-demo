# Tailwind and token-export adapter

This repository currently exports DESIGN.md tokens to Tailwind CSS v4 and DTCG
through the pinned Google DESIGN.md command-line tool. The workflow and generated
file policy live in [`design/README.md`](../README.md).

## Responsive range mapping

| System range | System boundary                         | Current Tailwind mapping |
| ------------ | --------------------------------------- | ------------------------ |
| Mobile       | Below 40rem / 640px                     | Below `sm`               |
| Tablet       | 40rem through below 64rem / 640–1023px  | `sm` through below `lg`  |
| Desktop      | 64rem through below 80rem / 1024–1279px | `lg` through below `xl`  |
| Wide         | 80rem / 1280px and above                | `xl` and above           |

Tailwind names are adapter aliases only. Product and component contracts use the
system range names and content-driven transformation rules.

## Export behavior

- `src/theme.css` is the generated Tailwind v4 theme.
- `tokens.json` is the generated DTCG representation.
- The current exporter omits component entries.
- Quoted unitless typography line heights are a compatibility workaround for the
  pinned parser.
- Generated omissions do not remove requirements from DESIGN.md, component
  contracts, or patterns.

Do not hand-edit generated files or rename semantic roles to fit a utility name.
Re-evaluate every mapping and workaround when the exporter version changes.

Rounded scale names use the `shape-*` prefix because the exporter maps the
schema's `rounded` group into Tailwind's `--radius-*` namespace. For example,
`rounded.shape-md` becomes `--radius-shape-md` and the `rounded-shape-md`
utility. This preserves Tailwind's built-in `--radius-md` token instead of
overriding it.

## Recommended lint rules

Apply these rules to authored application and component source. Exclude
generated files, including `src/theme.css` and `tokens.json`, and explicitly
identified third-party assets. A suppression requires a short reason and should
be narrower than a file-wide disable.

### `no-arbitrary-values`

Use theme tokens and scale values instead of arbitrary utilities such as
`p-[13px]` or `rounded-[10px]`. Report every arbitrary value. When an exact
theme token or scale step resolves to the same value, suggest that class as the
replacement. If no exact equivalent exists, require a named token or custom
utility rather than suggesting a merely nearby value.

### `no-inline-styles`

Use classes for styling. Pass genuinely dynamic runtime values through CSS
custom properties when a class needs them. Report ordinary inline properties,
static or hardcoded values assigned to custom properties, unreadable style
objects, and authored `<style>` elements. Allow a small, readable inline object
whose keys are custom properties and whose values come from runtime data; the
stylesheet remains responsible for consuming those properties.

### `no-raw-colors`

Use semantic colors declared by the theme. Report Tailwind palette utilities,
undeclared color tokens, and literal colors in authored CSS, JSX style values,
and SVG presentation attributes. When values can be resolved, the rule may
suggest nearby theme colors for review, but must not automatically treat visual
similarity as semantic equivalence.

### `no-restyle`

Use component variants for appearance and `className` only for changes allowed
by the component's policy. At design-system component call sites, allow margin
and width utilities. Report padding, color, and shape utilities because they
override the component contract. Apply this rule through an explicit component
registry so it does not mistake native elements or unrelated components for
design-system components.

### `no-unknown-classes`

Report class names that produce no CSS. Resolve classes against the installed
Tailwind CSS v4 compiler, the generated theme, custom utilities, variants, and
plugins. Require class candidates to remain statically discoverable; use
complete class strings in variant maps instead of constructing utility names at
runtime.

## Theme mapping

The alpha DESIGN.md schema does not define nested theme modes. Bento UI
therefore stores the default light colors under unqualified semantic names and
the dark colors under flat `dark-*` semantic names. The exporter emits both sets
as CSS custom properties.

The web entrypoint activates dark mode by remapping ordinary runtime variables to
their exported dark counterparts under `data-theme="dark"`, for example
`--color-surface-primary: var(--color-dark-surface-primary)`. The selector
contains no raw color values. Component code continues to consume the ordinary
semantic variable and does not branch on token names.
