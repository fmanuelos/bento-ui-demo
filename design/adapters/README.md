# Platform and tool adapters

Adapters translate the normative [`DESIGN.md`](../../DESIGN.md),
[`component contracts`](../components/), and [`experience patterns`](../patterns/)
into a target platform or tool. They are non-normative and may not redefine a
token, state, component, or behavior to fit an implementation limitation.

| Adapter | Scope |
| --- | --- |
| [Web](web.md) | HTML semantics, ARIA mappings, CSS/SVG mechanisms, user preferences, and browser behavior |
| [Tailwind](tailwind.md) | Current token export and system-range mapping |

An adapter documents:

1. The system concept it implements.
2. The target mechanism or mapping.
3. Unsupported or partial behavior.
4. Required conformance tests.

An implementation that cannot satisfy a contract must report the limitation; it
must not silently weaken the contract or change semantic token meaning.
