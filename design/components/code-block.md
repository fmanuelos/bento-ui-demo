# Code Block

## Status

Draft. Repeated documentation snippets and technical-guide configuration/request
examples justify a shared component. The previous documentation-only component
now re-exports the shared implementation. See the
[implementation record](../verification/input-content-evidence.md).

## Intent

Let people read, identify, and copy a bounded source-code or configuration snippet
without executing it or confusing example content with a live operation.

## Anatomy

Visible snippet label, explicit language or Plain text designation, semantic source
region, optional line wrapping, Copy action named for the snippet, and copy feedback.
Use [Button](button.md), [Asynchronous feedback](../patterns/async-feedback.md),
and [Responsive density](../patterns/responsive-density.md).

## Variants and sizes

Default preserved lines with local horizontal scrolling; optional wrapping affects
display only. Language identification is a visible text label, not syntax
highlighting. No execution, editing, highlighting library, line numbers, diff viewer,
or terminal emulation is introduced. Inline code remains native article text.

## States

Support available content, copying, copied, and failed/unavailable copying.
Copy is temporarily unavailable during a request; failure leaves the code selectable
with manual-copy guidance and a retry action. Empty content remains a literal empty
snippet and never invents code. Content replacement invalidates pending feedback.

## Semantic token mapping

Use shared code typography, semantic surface and text, border, spacing, button,
and focus roles. Both themes use existing tokens. Do not add language-specific
colors or a highlighting palette for the initial implementation.

## Behavior and transitions

Render source literally, preserving whitespace and special characters. Copy exactly
the supplied source, excluding title, language, and any visual wrapping. Copying
never evaluates scripts or triggers a request described by a snippet. Consumers
must omit real secrets from public examples and accurately distinguish illustrative
commands from executable actions.

Clipboard writes are asynchronous. Prevent duplicate pending activation and show
success only after the write resolves. Handle unavailable APIs and denied writes;
leave manual selection available without deprecated clipboard fallbacks. Retain
failure guidance until retry or content change. Announce meaningful feedback without
moving focus. Clean up timers and ignore late results after unmount, replacement,
or clipboard-adapter changes. The runtime offers an injectable writer for platform
adapters and controlled failure examples.

## Responsive, overflow, and localization behavior

Constrain long lines to a locally scrollable code region, with no page-level
horizontal overflow. The region accepts keyboard focus for scrolling. Wrapping
may improve reading but cannot change copied content. Keep code direction LTR
within RTL pages while labels and controls follow the surrounding direction.
Do not translate source or identifiers automatically. Support long labels, 200%
text, spacing changes, themes, and forced colors.

## Accessibility

Name the snippet and its language visibly. Copy actions have distinct accessible
names when multiple snippets appear. Expose copying, success, and failure through
a polite status region. Keyboard users can reach the scrollable source and copy
action; manual source selection remains possible. Focus stays on Copy after a
result. Code meaning must not rely on syntax colors, motion, or visual line numbers.

### Web adapter

Use a named section and `pre`/`code` with escaped text content, never raw HTML
injection. Give the source region an accessible name and `tabindex="0"` for keyboard
scrolling. Use a native button and Clipboard API when available. The compatibility
export preserves existing documentation imports; technical guides use the shared
component directly.

## Examples and validation

Existing API documentation supplies imports and JSX examples. A Public Content
technical guide supplies labelled JSON configuration and HTTP request snippets,
including a long line and a denied-copy scenario. Test exact copied whitespace,
special characters, denied/unavailable clipboard, retry, repeated clicks, content
replacement, unmount, keyboard scrolling, RTL, 200% text, and both themes. Apply
[Technical guide reading](../verification/workflows.md#technical-guide-reading)
and the [baseline](../verification/baseline.md).
