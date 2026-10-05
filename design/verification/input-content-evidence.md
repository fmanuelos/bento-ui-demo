# Input and content component implementation record

This record covers File Upload, Date Input, and Code Block in the October 5, 2026
working tree. All three contracts remain Draft. The component inventory now has
42 contracts, including four Drafts. No new primitive design tokens or external
dependencies are introduced.

## References and boundaries

The service-application reference requires a preferred start date and at least one
completed supporting-document upload. The upload controller enforces local type,
size, count, empty-file, and duplicate-metadata constraints, handles cancellation,
retry and removal, and ignores stale callbacks. Production content validation,
remote deletion and transport remain consumer-owned. Local simulators read no file
contents, send no requests, and use indeterminate progress rather than invented
transfer percentages. The gallery demonstrates the same component independently.

Application drafts use schema version 2 and retain the date. Version 1 drafts
migrate safely. Files, filenames, and upload receipts are never persisted; restored
service drafts return to details and require reselection and upload. An application
receipt still does not indicate approval.

The project setup reference adds an optional target launch date for planning.
Provisioning still begins immediately. Date entry uses native browser controls,
Gregorian canonical date strings, calendar validation, and fixed sample bounds;
there is no custom calendar, time entry, recurrence engine, or confirmed booking.

Code Block is promoted from documentation to the shared library. Existing imports
use a compatibility export. The technical Public Content context demonstrates JSON
configuration, a long HTTP snippet, and denied clipboard feedback. Snippets are
rendered as text and never executed. Copying uses the Clipboard API or an injected
adapter; unavailable/denied writes preserve manual selection. No syntax-highlighting
dependency is added.

## Validation

`pnpm check` passes: formatting, design/migration/catalog/component/icon/focus
checks, ESLint, TypeScript, all 53 model/catalog tests (including 11 new tests),
and the production build. The existing 129 design warnings and large-bundle
warning remain. New tests cover upload constraints and late callbacks, date
calendar/boundary rules, draft migration and file reselection, and date/attachment
commitment gates.

Browser observations in the Codex in-app browser:

- The service application blocked missing required dates and attachments. A sample
  text file was retained alongside a rejected HTML file, with a rejection reason.
  Removing the rejection, simulating failure, retrying, cancelling, and retrying
  again led to an uploaded state and an application receipt. No file left the browser.
- The native picker selected October 5, 2026; review displayed the same calendar
  date. Saving and resuming retained that date, restored no files, returned to
  details, and explained that reselection/upload was required.
- Project setup displayed its optional planning date in review. A partial native
  date initially exposed a missing React change notification when the canonical
  value remained empty. Date Input now observes native input/blur validity too:
  the partial date blocks review, and clearing it permits the optional field.
- Technical-guide copy failure displayed manual-copy guidance; successful copying
  matched the code text exactly and announced success while retaining button focus.
- In the narrow view (427 CSS pixels), long HTTP code scrolled inside its own
  region with no horizontal page overflow. Dark theme, RTL, and 200% text retained
  that behavior, and code remained left-to-right.

These are targeted browser observations, not a complete assistive-technology audit.

## Remaining validation

Production upload providers, server content inspection, remote detachment/deletion,
retention, real translated content, multiple OS/browser native date pickers,
screen readers, forced colors, mobile keyboards, and cross-browser clipboard
permissions require further validation. Native partial-date behavior depends on
the browser; no custom parser is claimed. These references do not establish full
product or accessibility conformance.
