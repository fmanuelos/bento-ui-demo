import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Button } from './Button'

export type NavigationItem = { href: string; label: string; icon?: ReactNode }
export type NavigationShellProps = {
  brand: ReactNode
  items: readonly NavigationItem[]
  currentHref: string
  children: ReactNode
  utilities?: ReactNode
  navigationLabel?: string
  mainContentId?: string
  skipToMainLabel?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}

export function NavigationShell({
  brand,
  items,
  currentHref,
  children,
  utilities,
  navigationLabel = 'Primary navigation',
  mainContentId = 'main-content',
  skipToMainLabel = 'Skip to main content',
  collapsed: controlledCollapsed,
  onCollapsedChange,
  className = '',
}: NavigationShellProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const collapsed = controlledCollapsed ?? internalCollapsed

  const setCollapsed = (value: boolean) => {
    if (controlledCollapsed === undefined) setInternalCollapsed(value)
    onCollapsedChange?.(value)
  }

  useEffect(() => {
    if (!mobileOpen) return
    firstLinkRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        queueMicrotask(() => mobileTriggerRef.current?.focus())
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        mobileDialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ??
          [],
      )
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const navigation = (mobile: boolean) => (
    <nav aria-label={navigationLabel} className="grid gap-space-1 p-space-3">
      {items.map((item, index) => {
        const current = currentHref === item.href
        return (
          <a
            key={item.href}
            ref={mobile && index === 0 ? firstLinkRef : undefined}
            href={item.href}
            aria-current={current ? 'page' : undefined}
            title={!mobile && collapsed ? item.label : undefined}
            onClick={() => mobile && setMobileOpen(false)}
            className={[
              'flex min-h-control-height-small items-center gap-space-3 rounded-shape-md px-space-3 text-label-md font-semibold outline-none',
              'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
              current
                ? 'border-l-4 border-navigation-sidebar-foreground-strong bg-navigation-sidebar-item-selected text-navigation-sidebar-item-selected-foreground'
                : 'text-navigation-sidebar-foreground hover:bg-navigation-sidebar-item-hover hover:text-navigation-sidebar-foreground-strong',
            ].join(' ')}
          >
            {item.icon && (
              <span className="grid size-5 shrink-0 place-items-center" aria-hidden="true">
                {item.icon}
              </span>
            )}
            {(mobile || !collapsed) && <span>{item.label}</span>}
          </a>
        )
      })}
    </nav>
  )

  return (
    <div
      style={
        {
          '--shell-sidebar-width': collapsed
            ? 'var(--spacing-sidebar-collapsed)'
            : 'var(--spacing-sidebar-expanded)',
        } as CSSProperties
      }
      className={`min-h-screen bg-background-secondary ${className}`}
    >
      <a
        href={`#${mainContentId}`}
        inert={mobileOpen ? true : undefined}
        className="fixed start-space-3 top-space-3 z-50 -translate-y-24 rounded-shape-md bg-action-primary-background-default px-space-3 py-space-2 text-label-md font-semibold text-action-primary-foreground no-underline transition-transform outline-none focus:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        {skipToMainLabel}
      </a>
      <header
        inert={mobileOpen ? true : undefined}
        className="sticky top-0 z-20 flex h-topbar-height items-center gap-space-3 border-b border-navigation-topbar-border bg-navigation-topbar-background px-dashboard-padding-mobile text-text-primary sm:px-dashboard-padding-tablet lg:pr-dashboard-padding-desktop lg:pl-[calc(var(--spacing-dashboard-padding-desktop)+var(--shell-sidebar-width))]"
      >
        <Button
          ref={mobileTriggerRef}
          variant="ghost"
          size="medium"
          iconOnly
          className="lg:hidden"
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </Button>
        <div className="min-w-0 flex-1 lg:hidden">{brand}</div>
        <div className="ml-auto">{utilities}</div>
      </header>
      <aside
        inert={mobileOpen ? true : undefined}
        className="fixed inset-y-0 left-0 z-30 hidden w-(--shell-sidebar-width) flex-col bg-navigation-sidebar-background text-navigation-sidebar-foreground transition-[width] lg:flex"
      >
        <div className="flex h-topbar-height items-center justify-between gap-space-2 border-b border-border-inverse px-space-3 text-navigation-sidebar-foreground-strong">
          <div className="min-w-0 overflow-hidden">{brand}</div>
          <Button
            variant="ghost"
            size="medium"
            iconOnly
            className="shrink-0 text-navigation-sidebar-foreground"
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            <svg
              className={`size-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="m10 3-5 5 5 5" />
            </svg>
          </Button>
        </div>
        {navigation(false)}
      </aside>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background-overlay lg:hidden"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setMobileOpen(false)
              mobileTriggerRef.current?.focus()
            }
          }}
        >
          <aside
            ref={mobileDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={navigationLabel}
            className="h-full w-[min(86vw,var(--spacing-sidebar-expanded))] bg-navigation-sidebar-background text-navigation-sidebar-foreground"
          >
            <div className="flex h-topbar-height items-center justify-between border-b border-border-inverse px-space-3 text-navigation-sidebar-foreground-strong">
              <div>{brand}</div>
              <Button
                variant="ghost"
                size="medium"
                iconOnly
                className="text-navigation-sidebar-foreground"
                aria-label="Close navigation"
                onClick={() => {
                  setMobileOpen(false)
                  mobileTriggerRef.current?.focus()
                }}
              >
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="m5 5 10 10m0-10L5 15" />
                </svg>
              </Button>
            </div>
            {navigation(true)}
          </aside>
        </div>
      )}
      <main
        id={mainContentId}
        tabIndex={-1}
        inert={mobileOpen ? true : undefined}
        className="px-dashboard-padding-mobile py-space-6 outline-none sm:px-dashboard-padding-tablet lg:ml-(--shell-sidebar-width) lg:px-dashboard-padding-desktop"
      >
        {children}
      </main>
    </div>
  )
}
