import { type AnchorHTMLAttributes, type MouseEvent } from 'react'

export type BackToTopProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
  targetId: string
  label?: string
}

export function BackToTop({
  targetId,
  label = 'Back to top',
  className = '',
  onClick,
  ...props
}: BackToTopProps) {
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
      className={`inline-flex min-h-control-height-medium items-center gap-space-2 rounded-shape-md px-space-2 text-label-md font-semibold text-action-link-default underline underline-offset-4 outline-none hover:text-action-link-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid active:text-action-link-active ${className}`}
      {...props}
    >
      <svg
        className="size-4 shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m4 7 4-4 4 4M8 3v10" />
      </svg>
      <span>{label}</span>
    </a>
  )
}
