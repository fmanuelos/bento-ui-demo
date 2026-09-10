# Disclosure

## Status

Contract complete.

## Intent

A disclosure shows or hides ordinary content while keeping the controlling
action and revealed content in the same reading context. Use it for optional
details, compact supporting information, or responsive navigation. It is not a
menu, select, tab set, tooltip, dialog, or sequential step.

An inline disclosure does not require the Overlay foundation. A layered
disclosure follows the shared [`overlay contract`](overlay.md) for placement and
dismissal while retaining disclosure semantics.

## Anatomy and variants

1. Trigger with a stable visible label
2. Expanded or collapsed indicator
3. Controlled content region
4. Optional boundary or heading relationship

- **Inline disclosure:** Revealed content follows the trigger in reading order
  and participates in ordinary layout.
- **Layered disclosure:** Ordinary content appears in an anchored surface when it
  remains simple and non-modal.
- **Navigation disclosure:** Reveals destination links that do not fit inline.
  Destination order and current-location meaning remain unchanged.

An accordion is a coordinated group of disclosures and requires a separate
contract only when group behavior, heading structure, or single-open rules are
needed.

## Sizes and semantic token mapping

The trigger follows the Button or navigation-item mapping appropriate to its
purpose. Expanded content uses its surrounding surface roles; a layered variant
uses the dropdown surface mapping through Overlay. The indicator inherits the
trigger foreground and uses shape or direction in addition to any color change.

Disclosure does not require a separate frontmatter entry because its trigger and
content compose existing component mappings.

## States

Support collapsed, expanded, hover when available, focus, busy when content is
loading, error, and disabled only when an unavailable explanation remains
discoverable. Focus remains visible in collapsed and expanded states.

Loading content does not repeatedly toggle the expanded state. An error leaves
the disclosure open when its message or recovery action is inside. Dynamically
removing expanded content preserves focus on the trigger or moves it to the
nearest logical continuation if the trigger also disappears.

## Behavior

Activation toggles expanded state once. Focus remains on the trigger; revealed
content does not receive initial focus merely because it appeared. Users reach
interactive descendants through ordinary focus order after the trigger.

Escape is not required to close an inline disclosure. Escape closes a layered
variant according to Overlay and returns focus to its trigger. Outside activation
does not collapse inline content and dismisses layered content only when doing so
cannot discard data.

The trigger label remains stable when possible; an adjacent indicator and exposed
expanded state communicate the change. If the label changes, both labels describe
the action, such as “Show details” and “Hide details,” rather than the current
state alone.

## Responsive behavior

Content wraps and reflows in its ordinary reading order. Opening a disclosure
must not create simultaneous horizontal and vertical page scrolling. A layered
variant may transform into inline content, a drawer, or a modal navigation region
when available space or touch targets no longer fit.

Responsive navigation preserves destination names, order, current location, and
primary actions. It does not hide destinations without an equivalent disclosure
control. Directional indicators mirror in right-to-left layouts only when their
meaning depends on direction.

## Accessibility

Expose the trigger name, expanded state, controlled relationship, availability,
and busy state when relevant. Revealed content follows a meaningful reading and
focus order. The indicator is decorative when the expanded state already conveys
its meaning programmatically.

Activation works without pointer input. State does not rely on rotation, motion,
or color alone. High-contrast modes preserve the trigger and focus boundary.
Reduced motion removes nonessential expansion animation while making the content
available immediately.

### Web adapter

Use a native `button` for a custom disclosure trigger and expose `aria-expanded`
with `aria-controls` when the controlled region has a stable identifier. Native
details and summary elements may be used when their semantics, focus, naming, and
styling satisfy the contract.

Do not assign menu, listbox, tab, or dialog roles to ordinary disclosure content.
Keep inline content after its trigger in DOM order. A layered implementation may
use a portal only if the programmatic relationship and expected focus order
remain understandable.

## Example

“Show project details” expands a region immediately after the trigger and leaves
focus on the button. A compact public-site header uses a navigation disclosure to
reveal the same primary destinations that appear inline when space permits.
