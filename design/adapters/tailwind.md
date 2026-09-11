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

## Theme mapping

The alpha DESIGN.md schema does not define nested theme modes. Bento UI Admin
therefore stores the default light colors under unqualified semantic names and
the dark colors under flat `dark-*` semantic names. The exporter emits both sets
as CSS custom properties.

The web entrypoint activates dark mode by remapping ordinary runtime variables to
their exported dark counterparts under `data-theme="dark"`, for example
`--color-surface-primary: var(--color-dark-surface-primary)`. The selector
contains no raw color values. Component code continues to consume the ordinary
semantic variable and does not branch on token names.
