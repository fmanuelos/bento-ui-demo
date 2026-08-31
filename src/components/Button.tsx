import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'icon'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-primary bg-primary text-white hover:border-sage-deep hover:bg-sage-deep dark:border-sun dark:bg-sun dark:text-primary dark:hover:border-white dark:hover:bg-white',
  secondary:
    'border-line bg-surface text-primary hover:border-primary dark:border-dark-line dark:bg-dark-surface dark:text-white dark:hover:border-sage',
  ghost:
    'border-transparent bg-transparent text-primary hover:bg-primary/6 dark:text-white dark:hover:bg-white/8',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 py-2 text-xs',
  md: 'min-h-11 px-5 py-3 text-sm',
  icon: 'size-11 shrink-0 p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon,
    className = '',
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={[
        'inline-flex items-center justify-center gap-3 rounded-full border font-bold transition duration-200',
        'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-coral',
        'disabled:pointer-events-none disabled:opacity-45',
        'active:translate-y-px',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
      {icon}
    </button>
  )
})
