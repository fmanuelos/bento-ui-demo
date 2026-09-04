# Forms and validation

## Intent

Forms help people enter, review, correct, and submit information without losing
work or discovering requirements too late.

## Contract

- Every control has a persistent visible label and an accessible name containing
  that label.
- Required or optional status, format, units, and constraints are communicated
  before entry when known.
- Related controls use a named group and preserve a meaningful reading order.
- Validation occurs at a predictable time and does not clear a value.
- An error identifies its control, describes the problem in text, and suggests a
  correction when known.
- A submission error provides a summary or equivalent route to every invalid
  control. Focus moves only when doing so helps recovery.
- Users can review and correct consequential submissions before commitment.
- Previously supplied information is not requested again without an essential
  reason.
- Authentication permits password managers, paste, and other assistance.

## States

Distinguish untouched, edited, validating, valid, warning, invalid, submitting,
succeeded, and failed states. Do not communicate validity from color alone. Do not
show success merely because a field has received focus or contains text.

## Responsive and accessibility behavior

Labels, help, errors, and actions wrap without clipping. Logical relationships and
focus order remain intact when the form changes columns or groups. Status updates
use the asynchronous-feedback pattern and do not repeatedly interrupt entry.

The web adapter maps these outcomes to native controls, label relationships,
descriptions, error state, input purpose, and status-message semantics.
