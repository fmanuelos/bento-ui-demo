import { CheckIcon } from '../../icons'

type CheckboxIndicatorProps = {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  peerControlled?: boolean
  className?: string
}

export function CheckboxIndicator({
  checked = false,
  indeterminate = false,
  disabled = false,
  peerControlled = false,
  className = '',
}: CheckboxIndicatorProps) {
  const stateClasses = peerControlled
    ? [
        '[&>[data-checkmark]]:hidden',
        'peer-checked:border-action-primary-background-default peer-checked:bg-action-primary-background-default',
        'peer-indeterminate:border-action-primary-background-default peer-indeterminate:bg-action-primary-background-default',
        'peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring peer-focus-visible:outline-solid',
        'peer-disabled:cursor-not-allowed peer-disabled:border-border-disabled peer-disabled:bg-background-disabled',
        'peer-checked:[&>[data-checkmark]]:block',
        'peer-indeterminate:[&>[data-checkmark]]:hidden peer-indeterminate:[&>[data-mixed]]:block',
      ]
    : [
        disabled
          ? 'border-border-disabled bg-background-disabled'
          : checked || indeterminate
            ? 'border-action-primary-background-default bg-action-primary-background-default'
            : '',
      ]

  return (
    <span
      className={[
        'grid size-5 shrink-0 place-items-center rounded-shape-sm border-2 border-border-strong bg-surface-primary text-action-primary-foreground',
        ...stateClasses,
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      {(peerControlled || indeterminate) && (
        <span
          data-mixed
          className={['h-0.5 w-2.5 bg-current', indeterminate ? '' : 'hidden'].join(' ')}
        />
      )}
      {(peerControlled || (checked && !indeterminate)) && <CheckIcon data-checkmark size="sm" />}
    </span>
  )
}
