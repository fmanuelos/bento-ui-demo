import { type AnchorHTMLAttributes, type MouseEvent } from 'react'

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
      className={`fixed start-space-3 top-space-3 z-50 -translate-y-24 rounded-shape-md bg-action-primary-background-default px-space-3 py-space-2 text-label-md font-semibold text-action-primary-foreground no-underline transition-transform outline-none focus:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring motion-reduce:transition-none ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
