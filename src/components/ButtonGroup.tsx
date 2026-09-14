import { type HTMLAttributes } from 'react'

export type ButtonGroupOrientation = 'horizontal' | 'vertical' | 'responsive'
export type ButtonGroupGap = 'default' | 'spacious'
export type ButtonGroupVariant = 'separated' | 'connected'

type ButtonGroupCommonProps = HTMLAttributes<HTMLDivElement> & {
  fullWidth?: boolean
}

export type ButtonGroupProps = ButtonGroupCommonProps &
  (
    | {
        variant?: 'separated'
        orientation?: ButtonGroupOrientation
        gap?: ButtonGroupGap
      }
    | {
        variant: 'connected'
        orientation?: Exclude<ButtonGroupOrientation, 'responsive'>
        gap?: never
      }
  )

const orientationClasses: Record<ButtonGroupOrientation, string> = {
  horizontal: 'inline-flex max-w-full flex-nowrap items-center',
  vertical: 'inline-flex max-w-full flex-col items-stretch',
  responsive: 'flex max-w-full flex-wrap items-center',
}

const gapClasses: Record<ButtonGroupGap, string> = {
  default: 'gap-space-2',
  spacious: 'gap-space-3',
}

const connectedClasses: Record<Exclude<ButtonGroupOrientation, 'responsive'>, string> = {
  horizontal: [
    '[&>*]:rounded-none',
    '[&>*:first-child]:rounded-s-shape-md',
    '[&>*:last-child]:rounded-e-shape-md',
    '[&>*+*]:-ms-px',
  ].join(' '),
  vertical: [
    '[&>*]:rounded-none',
    '[&>*:first-child]:rounded-t-shape-md',
    '[&>*:last-child]:rounded-b-shape-md',
    '[&>*+*]:-mt-px',
  ].join(' '),
}

export function ButtonGroup({
  variant = 'separated',
  orientation = 'horizontal',
  gap = 'default',
  fullWidth = false,
  className = '',
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  ...props
}: ButtonGroupProps) {
  const accessibleName = ariaLabel || ariaLabelledBy
  const resolvedOrientation =
    variant === 'connected' && orientation === 'responsive' ? 'horizontal' : orientation
  const widthClasses = fullWidth
    ? resolvedOrientation === 'vertical'
      ? 'w-full [&>*]:w-full'
      : 'w-full [&>*]:grow'
    : 'w-fit'
  const presentationClasses =
    variant === 'connected'
      ? [
          'gap-space-0',
          connectedClasses[resolvedOrientation === 'vertical' ? 'vertical' : 'horizontal'],
          '[&>*:hover]:relative [&>*:hover]:z-10',
          '[&>*:focus-visible]:relative [&>*:focus-visible]:z-20',
        ].join(' ')
      : gapClasses[gap]

  return (
    <div
      role={role ?? (accessibleName ? 'group' : undefined)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={[
        orientationClasses[resolvedOrientation],
        presentationClasses,
        widthClasses,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
