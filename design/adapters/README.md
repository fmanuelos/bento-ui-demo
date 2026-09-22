# Platform and tool adapters

Adapters translate the normative [`DESIGN.md`](../../DESIGN.md),
[`component contracts`](../components/), and [`experience patterns`](../patterns/)
into a target platform or tool. They are non-normative and may not redefine a
token, state, component, or behavior to fit an implementation limitation.

| Adapter                 | Scope                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| [Web](web.md)           | HTML semantics, ARIA mappings, CSS/SVG mechanisms, user preferences, and browser behavior |
| [Tailwind](tailwind.md) | Token export, system-range mapping, and recommended lint policy                           |

An adapter documents:

1. The system concept it implements.
2. The target mechanism or mapping.
3. Unsupported or partial behavior.
4. Required validation tests.

An implementation that cannot satisfy a contract must report the limitation; it
must not silently weaken the contract or change semantic token meaning.

## Support declarations

An adapter defines how to preserve Bento UI outcomes on a platform; it does not
by itself certify every version, device, or assistive-technology combination for
every consuming product. Before claiming support, a consuming product records the
exact support and test matrix for the adapter it uses.

The matrix includes applicable browser or operating-system versions, input
methods, assistive technologies, themes, locale and writing-system coverage, and
known limitations. Successful compilation or token export is not a support
claim. Record adapter and product limitations, user impact, compensating
behavior, owner, and review date as described in the
[change policy](../README.md#changing-the-design-system).
