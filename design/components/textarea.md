# Textarea

## Status

Contract complete. Current implementation evidence is tracked in the
[`component index`](README.md).

## Intent

A textarea collects multi-line text. Use a single-line text field when line
breaks are not meaningful and a rich-text editor when formatting is required.

## Anatomy and variants

Textarea inherits the text-field label, description, status, helper, and
validation anatomy. Fixed-height and content-growing variants are supported.
Both use `surface-primary`, `text-primary`, the input typography, `rounded.md`,
and the default, focus, disabled, and validation boundary roles.

## States and behavior

Support empty, populated, hover, focus, read-only, invalid, warning, success,
busy, and disabled as defined by the text-field contract. Preserve line breaks
and user input during validation or resize. A content-growing variant has a
documented maximum before internal scrolling begins. A character limit shows the
remaining or used count before the limit is reached and never silently truncates.

## Responsive behavior

Fill the available form width without exceeding its readable content limit.
Labels, long text, counts, and errors wrap. Resizing does not obscure adjacent
controls or move focus.

## Accessibility

Expose the visible label, current value, multi-line nature, descriptions,
requirements, limit, and validation state. A count update is announced only when
it becomes relevant, not after every character by default.

### Web adapter

Use a native `textarea` where possible and the same label, description, required,
read-only, invalid, and autocomplete mappings as the text-field contract. Do not
disable browser resizing unless the component provides an equivalent usable size.

## Example

Use a textarea for a project description whose meaningful paragraph breaks must
be preserved.
