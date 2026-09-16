import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Spinner } from './Progress'
import { buttonStyles, type ButtonStyleSize, type ButtonStyleVariant } from './interactiveStyles'

export type ButtonVariant = ButtonStyleVariant
export type ButtonSize = ButtonStyleSize

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  loading?: boolean
  loadingLabel?: string
}

const iconSizeClasses: Record<ButtonSize, string> = {
  tiny: 'size-space-4',
  small: 'size-space-4',
  medium: 'size-space-5',
  large: 'size-space-5',
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
      className={buttonStyles({ variant, size, iconOnly: square, className })}
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
