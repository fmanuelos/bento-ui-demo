import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Spinner } from './Progress'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large' | 'extra-large'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  loading?: boolean
  loadingLabel?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-action-primary-border bg-action-primary-background-default text-action-primary-foreground hover:border-action-primary-background-hover hover:bg-action-primary-background-hover active:border-action-primary-background-active active:bg-action-primary-background-active disabled:border-action-primary-border-disabled disabled:bg-action-primary-background-disabled disabled:text-action-primary-foreground-disabled',
  secondary:
    'border-action-secondary-border bg-action-secondary-background-default text-action-secondary-foreground hover:bg-action-secondary-background-hover active:bg-action-secondary-background-active disabled:border-action-secondary-border-disabled disabled:bg-action-secondary-background-disabled disabled:text-action-secondary-foreground-disabled',
  outline:
    'border-action-outline-border bg-action-outline-background-default text-action-outline-foreground hover:bg-action-outline-background-hover active:bg-action-outline-background-active disabled:border-action-outline-border-disabled disabled:bg-action-outline-background-disabled disabled:text-action-outline-foreground-disabled',
  ghost:
    'border-transparent bg-action-ghost-background-default text-action-ghost-foreground hover:bg-action-ghost-background-hover active:bg-action-ghost-background-active disabled:bg-action-ghost-background-disabled disabled:text-action-ghost-foreground-disabled',
  destructive:
    'border-action-destructive-background-default bg-action-destructive-background-default text-action-destructive-foreground hover:border-action-destructive-background-hover hover:bg-action-destructive-background-hover active:border-action-destructive-background-active active:bg-action-destructive-background-active disabled:border-action-destructive-background-disabled disabled:bg-action-destructive-background-disabled disabled:text-action-destructive-foreground-disabled',
}

const sizeClasses: Record<ButtonSize, string> = {
  tiny: 'h-control-height-tiny gap-space-1 px-space-2 font-label-sm text-label-sm leading-label-sm',
  small:
    'h-control-height-small gap-space-2 px-space-3 font-label-md text-label-md leading-label-md',
  medium:
    'h-control-height-medium gap-space-2 px-space-3 font-label-md text-label-md leading-label-md',
  large:
    'h-control-height-large gap-space-2 px-space-4 font-label-lg text-label-lg leading-label-lg',
  'extra-large':
    'h-control-height-extra-large gap-space-3 px-space-6 font-label-lg text-label-lg leading-label-lg',
}

const squareSizeClasses: Record<ButtonSize, string> = {
  tiny: 'size-control-height-tiny',
  small: 'size-control-height-small',
  medium: 'size-control-height-medium',
  large: 'size-control-height-large',
  'extra-large': 'size-control-height-extra-large',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  tiny: 'size-4',
  small: 'size-4',
  medium: 'size-5',
  large: 'size-5',
  'extra-large': 'size-space-6',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'medium',
    iconOnly = false,
    icon,
    iconPosition = 'end',
    loading = false,
    loadingLabel = 'Working',
    className = '',
    children,
    type = 'button',
    disabled,
    ...props
  },
  ref,
) {
  const square = iconOnly
  const iconClassName = iconSizeClasses[size]
  const renderIcon = (content: ReactNode) => (
    <span
      className={`grid shrink-0 place-items-center ${iconClassName} [&_svg]:size-full`}
      aria-hidden="true"
    >
      {content}
    </span>
  )

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        'inline-flex items-center justify-center rounded-md border font-semibold transition duration-200',
        'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus-ring',
        'disabled:cursor-not-allowed',
        'active:translate-y-px',
        variantClasses[variant],
        square ? `${squareSizeClasses[size]} shrink-0 p-0` : sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <Spinner
          size={
            size === 'tiny' || size === 'small' ? 'small' : size === 'medium' ? 'medium' : 'large'
          }
        />
      )}
      {!loading && !square && iconPosition === 'start' && icon && renderIcon(icon)}
      {!loading && square && renderIcon(icon ?? children)}
      {!square && children}
      {loading && <span className="sr-only">{loadingLabel}</span>}
      {!loading && !square && iconPosition === 'end' && icon && renderIcon(icon)}
    </button>
  )
})
