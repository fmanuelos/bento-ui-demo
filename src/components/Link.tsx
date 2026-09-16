import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import {
  buttonStyles,
  linkStyles,
  type ButtonStyleSize,
  type ButtonStyleVariant,
  type LinkStyleVariant,
} from './interactiveStyles'

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  variant?: LinkStyleVariant
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = 'inline', icon, iconPosition = 'end', className = '', children, ...props },
  ref,
) {
  const renderedIcon = icon ? (
    <span
      className="grid size-space-4 shrink-0 place-items-center [&_svg]:size-full"
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null

  return (
    <a
      ref={ref}
      className={linkStyles({
        variant,
        className: `${icon ? 'inline-flex items-center gap-space-1' : ''} ${className}`,
      })}
      {...props}
    >
      {iconPosition === 'start' && renderedIcon}
      {children}
      {iconPosition === 'end' && renderedIcon}
    </a>
  )
})

export type LinkButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  variant?: Exclude<ButtonStyleVariant, 'link'>
  size?: ButtonStyleSize
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  {
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'end',
    className = '',
    children,
    ...props
  },
  ref,
) {
  const iconSize =
    size === 'tiny' || size === 'small'
      ? 'size-space-4'
      : size === 'extra-large'
        ? 'size-space-6'
        : 'size-space-5'
  const renderedIcon = icon ? (
    <span
      className={`grid shrink-0 place-items-center ${iconSize} [&_svg]:size-full`}
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null

  return (
    <a
      ref={ref}
      className={buttonStyles({ variant, size, className: `no-underline ${className}` })}
      {...props}
    >
      {iconPosition === 'start' && renderedIcon}
      {children}
      {iconPosition === 'end' && renderedIcon}
    </a>
  )
})
