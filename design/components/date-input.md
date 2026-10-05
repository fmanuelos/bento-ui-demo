# Date Input

## Status

Draft. Preferred service-start and project target-launch dates establish repeated
date-only entry. The web adapter uses native date input; no custom calendar is
required by these uses. See the [implementation record](../verification/input-content-evidence.md).

## Intent

Collect one calendar date with clear requirement, format, and bounds, preserving
the distinction between a date, an instant, a confirmed booking, and a schedule.

## Anatomy

Visible label, native date-entry control, optional requirement and inclusive bounds,
persistent format/purpose guidance, and associated validation feedback. Follow
[Form field](form-field.md), [Input](input.md), and
[Forms and validation](../patterns/forms-and-validation.md).

## Variants and sizes

Use Input's small and medium sizes, medium by default. This contract supports
one Gregorian date in years 0001–9999, represented as `YYYY-MM-DD`. Date ranges,
time of day, non-Gregorian entry, recurring schedules, and custom calendars are
outside the initial adapter. The browser's native picker is permitted.

## States

Support optional empty, required empty, incomplete, valid, impossible date,
out-of-bounds, read-only, and disabled states. Invalid configuration of bounds is
an unavailable constraint, not a valid date. Read-only remains distinct from
disabled. An incomplete native entry must not be accepted as an optional blank
when the platform reports bad input.

## Semantic token mapping

Reuse Input's typography, control height, surface, primary/invalid boundary, disabled
roles, and global focus treatment. Use shared helper and error text. The operating
system owns its picker appearance; do not imply complete theme control over it.

## Behavior and validation

The controlled value is a canonical date string or empty string. Validate exact
format, calendar month length, leap-year rules, and inclusive minimum and maximum.
Do not accept ambiguous slash formats in stored data, roll impossible dates into
another month, or silently clamp to bounds. Required and invalid errors describe
what to correct. Validate on blur and at review/submission; avoid disruptive errors
while typing. Revalidate populated values when bounds change.

Native entry displays the browser's locale format; use persistent guidance rather
than promising a fixed visible format. Propagate the native bad-input flag to the
owning form, whose commit validation remains authoritative. Preserve partial text
to the extent supported by the browser; never add a custom parser that guesses an
ambiguous date. Native partial-entry behavior requires browser validation.

Treat calendar dates independently of timezones. Compare validated canonical
strings for bounds. Localize review text using date-only parts and an explicit
formatting timezone; never let an implicit UTC/local conversion change the day.
The reference uses fixed illustrative bounds from October 1, 2026 to December 31,
2027; these are not a rolling business-eligibility rule.

The application requires a preferred start date without confirming an appointment.
Project setup has an optional target launch date for planning; provisioning still
starts immediately. Dates survive ordinary corrections and versioned application
draft restoration. Legacy drafts migrate to an empty date and renewed validation.

## Responsive and localization behavior

Support RTL labels, long guidance, 200% text, user spacing, and localized review
dates. Native entry formatting follows browser/OS settings; page `lang` alone
does not guarantee an entry format. Preserve the complete control and label at
narrow widths. Evaluate real locale and browser behavior before adding a custom
calendar; a custom calendar requires its own interaction and accessibility review.

## Accessibility

Expose the field name, requirement, value, errors, and instructions using the shared
field relationships. Retain native keyboard and picker behavior without custom
shortcuts. Submission errors link to this control; suppress redundant per-field
announcements when focusing an error summary. Support touch, visible focus,
screen readers, contrast, and reduced motion.

### Web adapter

Use `input type="date"` with native `min`, `max`, `required`, `readOnly`, and
`disabled` semantics. Forward focus refs and form-field description/error IDs.
Use validity's `badInput` where exposed, along with independent calendar validation
for persisted or programmatic values. No custom dialog/grid picker is implemented.

## Examples and validation

Exercise the service application and project setup with empty, partial, impossible,
leap-day, exact-boundary, changed-boundary, and restored values. Confirm no day
shift under different local timezones and that selecting a planning date does not
schedule provisioning. Apply
[Attachment and date entry](../verification/workflows.md#attachment-and-date-entry)
and the [baseline](../verification/baseline.md).
