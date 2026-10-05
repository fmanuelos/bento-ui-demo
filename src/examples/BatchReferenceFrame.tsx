import { useEffect, useState, type ReactNode } from 'react'
import { Link, Select, SiteNavigation, SkipLink } from '../components'
import { ReferenceAppearanceControls } from './ReferenceAppearanceControls'

export function BatchReferenceFrame({
  title,
  note,
  controls,
  children,
  publicSite = false,
}: {
  title: string
  note: string
  controls?: ReactNode
  children: ReactNode
  publicSite?: boolean
}) {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')
  useEffect(() => {
    document.title = `${title} — Bento UI reference`
  }, [title])
  return (
    <div
      dir={direction}
      className="min-h-screen bg-background-primary text-text-primary [&_button]:h-auto [&_button]:min-h-control-height-medium [&_button]:max-w-full [&_button]:py-scale-2 [&_button]:whitespace-normal"
    >
      <SkipLink targetId="reference-main">Skip to main content</SkipLink>
      <aside
        aria-label="Reference preview controls"
        className="space-y-scale-3 border-b border-border-secondary bg-surface-secondary p-scale-4"
      >
        <p className="m-0 text-body-sm">Reference preview · {note}</p>
        <div className="flex flex-wrap items-end gap-scale-4">
          <ReferenceAppearanceControls />
          <Select
            label="Reading direction"
            value={direction}
            onChange={(event) => setDirection(event.target.value as 'ltr' | 'rtl')}
            options={[
              { value: 'ltr', label: 'Left to right' },
              { value: 'rtl', label: 'Right to left' },
            ]}
          />
          {controls}
        </div>
      </aside>
      {publicSite && (
        <SiteNavigation
          brand="Bento examples"
          brandHref="/docs/templates"
          items={[{ label: 'Template catalog', href: '/docs/templates' }]}
        />
      )}
      <main
        id="reference-main"
        tabIndex={-1}
        className="mx-auto max-w-container-readable space-y-scale-8 px-page-padding-mobile py-scale-8 sm:px-page-padding-tablet"
      >
        {children}
      </main>
      {publicSite && (
        <footer className="border-t border-border-secondary p-scale-5">
          <Link href="/docs/templates">Return to template catalog</Link>
          <p>Fictional reference content.</p>
        </footer>
      )}
    </div>
  )
}
