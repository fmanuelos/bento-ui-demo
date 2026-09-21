import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Button, SkipLink, linkStyles } from '../../components'
import { CloseIcon, MenuIcon, MoonIcon, SparkleIcon, SunIcon } from '../../icons'
import { docsNavigation } from '../navigation'

export function DocsLayout() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('bento-ui-admin-theme') === 'dark',
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const dialogRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('bento-ui-admin-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const item = docsNavigation
      .flatMap((section) => section.items)
      .find((entry) => entry.path === pathname)
    document.title = `${item?.title ?? 'Documentation'} — Bento UI`
    window.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>('a')?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        queueMicrotask(() => menuButtonRef.current?.focus())
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ?? [],
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

  const closeMobile = () => setMobileOpen(false)
  const navigation = (
    <nav aria-label="Documentation navigation" className="grid gap-scale-6 p-scale-4">
      {docsNavigation.map((section) => (
        <section
          key={section.title}
          aria-labelledby={`docs-nav-${section.title.toLocaleLowerCase()}`}
        >
          <h2
            id={`docs-nav-${section.title.toLocaleLowerCase()}`}
            className="mt-0 mb-scale-2 px-scale-3 font-label-overline text-label-overline leading-label-overline font-semibold tracking-label-overline text-navigation-sidebar-foreground uppercase"
          >
            {section.title}
          </h2>
          <div className="grid gap-scale-1">
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={
                  item.path === '/docs' ||
                  item.path === '/docs/foundations' ||
                  item.path === '/docs/components' ||
                  item.path === '/docs/blocks'
                }
                onClick={closeMobile}
                className={({ isActive }) =>
                  linkStyles({
                    variant: 'navigation',
                    className: `rounded-shape-md border-l-4 px-scale-3 py-scale-2 text-body-sm font-semibold ${isActive ? 'border-navigation-sidebar-foreground-strong bg-navigation-sidebar-item-selected text-navigation-sidebar-item-selected-foreground' : 'border-transparent text-navigation-sidebar-foreground hover:bg-navigation-sidebar-item-hover hover:text-navigation-sidebar-foreground-strong'}`,
                  })
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </section>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background-secondary text-text-primary">
      <SkipLink targetId="docs-content" inert={mobileOpen ? true : undefined}>
        Skip to content
      </SkipLink>
      <header
        inert={mobileOpen ? true : undefined}
        className="fixed inset-x-0 top-0 z-30 flex h-topbar-height items-center gap-scale-3 border-b border-navigation-topbar-border bg-navigation-topbar-background px-page-padding-mobile sm:px-page-padding-tablet lg:px-page-padding-desktop"
      >
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="medium"
          iconOnly
          className="lg:hidden"
          aria-label="Open documentation navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </Button>
        <NavLink
          to="/docs"
          className={linkStyles({
            variant: 'navigation',
            className:
              'flex min-w-0 items-center gap-scale-2 rounded-shape-sm font-bold text-text-primary',
          })}
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-shape-full bg-action-primary-background-default text-action-primary-foreground">
            <SparkleIcon size="sm" />
          </span>
          <span className="truncate">Bento UI</span>
          <span className="hidden text-body-sm font-normal text-text-tertiary sm:inline">Docs</span>
        </NavLink>
        <a
          href="/"
          className={linkStyles({
            variant: 'navigation',
            className:
              'ml-auto hidden rounded-shape-md px-scale-3 py-scale-2 text-label-md font-semibold text-text-secondary hover:bg-action-ghost-background-hover sm:block',
          })}
        >
          View demo
        </a>
        <Button
          variant="ghost"
          size="medium"
          iconOnly
          aria-label={darkMode ? 'Use light mode' : 'Use dark mode'}
          onClick={() => setDarkMode((value) => !value)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </header>
      <aside
        inert={mobileOpen ? true : undefined}
        className="fixed top-topbar-height bottom-0 left-0 hidden w-sidebar-expanded overflow-y-auto bg-navigation-sidebar-background lg:block"
      >
        {navigation}
      </aside>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background-overlay lg:hidden"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMobile()
          }}
        >
          <aside
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Documentation navigation"
            className="h-full w-[min(88vw,var(--spacing-sidebar-expanded))] overflow-y-auto bg-navigation-sidebar-background text-navigation-sidebar-foreground"
          >
            <div className="sticky top-0 z-10 flex h-topbar-height items-center justify-between border-b border-border-inverse bg-navigation-sidebar-background px-scale-4 font-bold text-navigation-sidebar-foreground-strong">
              <span>Documentation</span>
              <Button
                variant="ghost"
                size="medium"
                iconOnly
                className="text-navigation-sidebar-foreground"
                aria-label="Close documentation navigation"
                onClick={() => {
                  closeMobile()
                  menuButtonRef.current?.focus()
                }}
              >
                <CloseIcon />
              </Button>
            </div>
            {navigation}
          </aside>
        </div>
      )}
      <main
        id="docs-content"
        tabIndex={-1}
        inert={mobileOpen ? true : undefined}
        className="min-h-screen min-w-0 px-page-padding-mobile pt-[calc(var(--spacing-topbar-height)+var(--spacing-scale-8))] pb-section-mobile outline-none sm:px-page-padding-tablet sm:pb-section-tablet lg:ml-sidebar-expanded lg:px-page-padding-desktop lg:pb-section-desktop"
      >
        <div className="mx-auto grid w-full max-w-container-page min-w-0 gap-scale-12">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
