import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'icon'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  loading?: boolean
  loadingLabel?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-action-primary-background-default bg-action-primary-background-default text-action-primary-foreground hover:border-action-primary-background-hover hover:bg-action-primary-background-hover active:border-action-primary-background-active active:bg-action-primary-background-active disabled:border-action-primary-background-disabled disabled:bg-action-primary-background-disabled disabled:text-action-primary-foreground-disabled',
  secondary:
    'border-action-secondary-border bg-action-secondary-background-default text-action-secondary-foreground hover:bg-action-secondary-background-hover active:bg-action-secondary-background-active disabled:border-action-secondary-border-disabled disabled:bg-action-secondary-background-disabled disabled:text-action-secondary-foreground-disabled',
  tertiary:
    'border-transparent bg-action-tertiary-background-default text-action-tertiary-foreground hover:bg-action-tertiary-background-hover active:bg-action-tertiary-background-active disabled:bg-action-tertiary-background-disabled disabled:text-action-tertiary-foreground-disabled',
  destructive:
    'border-action-destructive-background-default bg-action-destructive-background-default text-action-destructive-foreground hover:border-action-destructive-background-hover hover:bg-action-destructive-background-hover active:border-action-destructive-background-active active:bg-action-destructive-background-active disabled:border-action-destructive-background-disabled disabled:bg-action-destructive-background-disabled disabled:text-action-destructive-foreground-disabled',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-control-height-sm px-sm text-label-sm',
  md: 'h-control-height-lg px-md text-label-md',
  icon: 'size-control-height-lg shrink-0 p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
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
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        'inline-flex items-center justify-center gap-sm rounded-md border font-semibold transition duration-200',
        'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus-ring',
        'disabled:cursor-not-allowed',
        'active:translate-y-px',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}
      {!loading && iconPosition === 'start' && icon}
      {children}
      {loading && <span className="sr-only">{loadingLabel}</span>}
      {!loading && iconPosition === 'end' && icon}
    </button>
  )
})
