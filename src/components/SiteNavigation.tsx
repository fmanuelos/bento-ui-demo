import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from './Button'

export type SiteNavigationItem = {
  href: string
  label: string
}

export type SiteNavigationProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  brand: ReactNode
  brandHref?: string
  items: readonly SiteNavigationItem[]
  currentHref?: string
  primaryAction?: ReactNode
  utilities?: ReactNode
  navigationLabel?: string
}

export function SiteNavigation({
  brand,
  brandHref = '/',
  items,
  currentHref,
  primaryAction,
  utilities,
  navigationLabel = 'Primary navigation',
  className = '',
  ...props
}: SiteNavigationProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const links = items.map((item) => (
    <a
      key={item.href}
      href={item.href}
      aria-current={item.href === currentHref ? 'page' : undefined}
      onClick={() => setOpen(false)}
      className={[
        'rounded-shape-md px-space-3 py-space-2 text-label-md font-semibold no-underline outline-none',
        'hover:bg-action-ghost-background-hover',
        'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        item.href === currentHref
          ? 'bg-background-accent text-text-accent underline decoration-2 underline-offset-4'
          : 'text-text-secondary',
      ].join(' ')}
    >
      {item.label}
    </a>
  ))

  return (
    <header
      className={`border-b border-navigation-topbar-border bg-navigation-topbar-background ${className}`}
      {...props}
    >
      <div className="mx-auto flex min-h-topbar-height max-w-container-page items-center gap-space-3 px-page-padding-mobile sm:px-page-padding-tablet lg:px-page-padding-desktop">
        <a href={brandHref} className="shrink-0 font-bold text-text-primary no-underline">
          {brand}
        </a>
        <nav
          aria-label={navigationLabel}
          className="ml-space-4 hidden items-center gap-space-1 lg:flex"
        >
          {links}
        </nav>
        <div className="ml-auto flex items-center gap-space-2">
          <div className="hidden items-center gap-space-2 sm:flex">{utilities}</div>
          {primaryAction}
          <Button
            variant="ghost"
            size="medium"
            iconOnly
            className="lg:hidden"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((value) => !value)}
          >
            <svg
              className="size-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              {open ? <path d="m5 5 10 10m0-10L5 15" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
            </svg>
          </Button>
        </div>
      </div>
      <nav
        id={id}
        aria-label={`${navigationLabel} menu`}
        hidden={!open}
        className="border-t border-navigation-topbar-border px-page-padding-mobile py-space-3 lg:hidden"
      >
        <div className="grid gap-space-1">{links}</div>
        {utilities && (
          <div className="mt-space-3 border-t border-border-secondary pt-space-3 sm:hidden">
            {utilities}
          </div>
        )}
      </nav>
    </header>
  )
}
