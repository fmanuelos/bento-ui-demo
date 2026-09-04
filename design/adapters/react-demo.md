# React demo adapter

The current application is one implementation of Bento UI Admin. React component
names, props, composition techniques, and source paths are non-normative.

Current reusable implementation evidence is tracked in the
[`component index`](../components/README.md). A component is conforming only when
it satisfies its complete token, state, behavior, responsive, and accessibility
contract; the presence of a `.tsx` file is not sufficient.

## Adapter rules

- Props may use framework-appropriate names but map unambiguously to canonical
  variants and states.
- Framework state does not replace programmatically exposed UI state.
- Composition and event handling preserve native semantics where possible.
- Styling consumes semantic or component tokens rather than duplicating literal
  values.
- Adapter limitations are documented here or in the component index rather than
  changing the normative contract.
