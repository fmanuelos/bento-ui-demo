export type ButtonStyleVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'

export type ButtonStyleSize = 'tiny' | 'small' | 'medium' | 'large' | 'extra-large'

export type LinkStyleVariant = 'inline' | 'standalone' | 'navigation' | 'unstyled'

export const focusRingClasses =
  'outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid'

const buttonVariantClasses: Record<ButtonStyleVariant, string> = {
  primary: [
    'border-action-primary-border bg-action-primary-background-default text-action-primary-foreground',
    'hover:border-action-primary-background-hover hover:bg-action-primary-background-hover',
    'active:border-action-primary-background-active active:bg-action-primary-background-active',
    'disabled:border-action-primary-border-disabled disabled:bg-action-primary-background-disabled disabled:text-action-primary-foreground-disabled',
  ].join(' '),
  secondary: [
    'border-action-secondary-border bg-action-secondary-background-default text-action-secondary-foreground',
    'hover:bg-action-secondary-background-hover',
    'active:bg-action-secondary-background-active',
    'disabled:border-action-secondary-border-disabled disabled:bg-action-secondary-background-disabled disabled:text-action-secondary-foreground-disabled',
  ].join(' '),
  outline: [
    'border-action-outline-border bg-action-outline-background-default text-action-outline-foreground',
    'hover:bg-action-outline-background-hover',
    'active:bg-action-outline-background-active',
    'disabled:border-action-outline-border-disabled disabled:bg-action-outline-background-disabled disabled:text-action-outline-foreground-disabled',
  ].join(' '),
  ghost: [
    'border-transparent bg-action-ghost-background-default text-action-ghost-foreground',
    'hover:bg-action-ghost-background-hover',
    'active:bg-action-ghost-background-active',
    'disabled:bg-action-ghost-background-disabled disabled:text-action-ghost-foreground-disabled',
  ].join(' '),
  destructive: [
    'border-action-destructive-background-default bg-action-destructive-background-default text-action-destructive-foreground',
    'hover:border-action-destructive-background-hover hover:bg-action-destructive-background-hover',
    'active:border-action-destructive-background-active active:bg-action-destructive-background-active',
    'disabled:border-action-destructive-background-disabled disabled:bg-action-destructive-background-disabled disabled:text-action-destructive-foreground-disabled',
  ].join(' '),
  link: [
    'border-transparent bg-transparent text-action-link-default underline underline-offset-4',
    'hover:text-action-link-hover',
    'active:text-action-link-active',
    'disabled:text-action-link-disabled',
  ].join(' '),
}

const buttonSizeClasses: Record<ButtonStyleSize, string> = {
  tiny: 'h-control-height-tiny gap-scale-1 px-scale-2 font-label-sm text-label-sm leading-label-sm',
  small:
    'h-control-height-small gap-scale-2 px-scale-3 font-label-md text-label-md leading-label-md',
  medium:
    'h-control-height-medium gap-scale-2 px-scale-3 font-label-md text-label-md leading-label-md',
  large:
    'h-control-height-large gap-scale-2 px-scale-4 font-label-lg text-label-lg leading-label-lg',
  'extra-large':
    'h-control-height-extra-large gap-scale-3 px-scale-6 font-label-lg text-label-lg leading-label-lg',
}

export const buttonSquareSizeClasses: Record<ButtonStyleSize, string> = {
  tiny: 'size-control-height-tiny',
  small: 'size-control-height-small',
  medium: 'size-control-height-medium',
  large: 'size-control-height-large',
  'extra-large': 'size-control-height-extra-large',
}

const linkVariantClasses: Record<LinkStyleVariant, string> = {
  inline:
    'text-action-link-default underline underline-offset-4 visited:text-action-link-visited hover:text-action-link-hover active:text-action-link-active',
  standalone:
    'inline-flex min-h-touch-target-min items-center gap-scale-1 rounded-shape-sm text-action-link-default underline underline-offset-4 visited:text-action-link-visited hover:text-action-link-hover active:text-action-link-active',
  navigation: 'no-underline',
  unstyled: '',
}

export function buttonStyles({
  variant = 'primary',
  size = 'medium',
  iconOnly = false,
  className = '',
}: {
  variant?: ButtonStyleVariant
  size?: ButtonStyleSize
  iconOnly?: boolean
  className?: string
} = {}) {
  return [
    'inline-flex items-center justify-center rounded-shape-md border font-semibold transition duration-200',
    focusRingClasses,
    'disabled:cursor-not-allowed',
    'active:translate-y-px',
    buttonVariantClasses[variant],
    iconOnly ? `${buttonSquareSizeClasses[size]} shrink-0 p-0` : buttonSizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export function linkStyles({
  variant = 'inline',
  className = '',
}: {
  variant?: LinkStyleVariant
  className?: string
} = {}) {
  return [focusRingClasses, linkVariantClasses[variant], className].filter(Boolean).join(' ')
}
