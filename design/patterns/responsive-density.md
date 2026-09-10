# Responsive density

## Intent

Responsive density adapts composition to available space, content, localization,
zoom, and input capability without shrinking essential text or targets.

## Contract

- Use mobile, tablet, desktop, and wide as system range names; framework
  breakpoint names belong in adapters.
- Transform a component when its content no longer fits or its task becomes hard
  to complete, not solely at a range boundary.
- Preserve meaningful reading and focus order across visual rearrangement.
- Allow labels, values, instructions, and validation messages to wrap.
- Support longer translations and right-to-left direction without losing content
  or reversing meaning.
- Use compact controls only when the target size and available input methods
  remain appropriate.
- Hover is enhancement only; all information and actions remain available through
  focus, activation, or persistent presentation.
- Avoid simultaneous horizontal and vertical page scrolling, except within a
  contained region whose meaning requires two-dimensional layout.

## Range defaults

- Mobile: below 40rem / 640px.
- Tablet: 40rem through below 64rem / 640–1023px.
- Desktop: 64rem through below 80rem / 1024–1279px.
- Wide: 80rem / 1280px and above.

Adapters may map these defaults to platform-specific capabilities while
preserving the transformation rules. These are layout ranges rather than device
detection. Use global ranges for page padding, navigation shells, and major page
composition. Use component or container fit for cards, forms, toolbars, tables,
data grids, and feature grids.

Wide behavior must solve a documented layout problem, such as preserving a
secondary dashboard panel or exposing additional essential data columns. Do not
use the wide range only to add another card column.
