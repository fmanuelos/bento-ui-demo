import { type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { linkStyles } from './interactiveStyles'

export type SkipLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  targetId: string
}

export function SkipLink({
  targetId,
  children = 'Skip to main content',
  className = '',
  onClick,
  ...props
}: SkipLinkProps) {
  const href = `#${encodeURIComponent(targetId)}`

  const moveFocusToTarget = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    const target = document.getElementById(targetId)
    if (!target) return

    if (!target.hasAttribute('tabindex')) target.tabIndex = -1
    requestAnimationFrame(() => target.focus({ preventScroll: true }))
  }

  return (
    <a
      href={href}
      onClick={moveFocusToTarget}
      className={linkStyles({
        variant: 'navigation',
        className: `fixed start-space-3 top-space-3 z-50 -translate-y-24 rounded-shape-md bg-action-primary-background-default px-space-3 py-space-2 text-label-md font-semibold text-action-primary-foreground transition-transform focus:translate-y-0 motion-reduce:transition-none ${className}`,
      })}
      {...props}
    >
      {children}
    </a>
  )
}
