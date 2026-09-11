import { type FieldStatus } from './Field'

export const fieldControlBase = [
  'w-full rounded-shape-md border bg-surface-primary px-space-3 text-body-sm font-normal text-text-primary outline-none transition duration-200',
  'placeholder:text-text-placeholder read-only:bg-surface-sunken',
  'disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-background-disabled disabled:text-text-disabled',
  'focus-visible:border-border-focus focus-visible:ring-3 focus-visible:ring-focus-ring/20',
].join(' ')

export const fieldStatusClasses: Record<FieldStatus, string> = {
  default: 'border-border-primary',
  success: 'border-border-success',
  warning: 'border-border-warning',
  invalid: 'border-border-danger',
}
