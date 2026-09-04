# Tailwind and token-export adapter

This repository currently exports DESIGN.md tokens to Tailwind CSS v4 and DTCG
through the pinned Google DESIGN.md command-line tool. The workflow and generated
file policy live in [`design/README.md`](../README.md).

## Responsive range mapping

| System range | System boundary | Current Tailwind mapping |
| --- | --- | --- |
| Compact | Below 40rem / 640px | Below `sm` |
| Intermediate | 40rem through below 64rem / 640–1023px | `sm` through below `lg` |
| Expanded | 64rem / 1024px and above | `lg` and above |

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
