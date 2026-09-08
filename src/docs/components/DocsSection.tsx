import { type ReactNode } from 'react'

export function DocsSection({
  id,
  title,
  children,
  unstyled,
}: {
  id: string
  title: string
  children?: ReactNode
  unstyled?: ReactNode
}) {
  return (
    <section id={id} className="min-w-0 scroll-mt-24 border-t border-border-secondary pt-2xl">
      <h2 className="mb-lg mt-0 text-heading-h3 font-semibold text-text-primary">{title}</h2>
      {children ? (
        <div className="min-w-0 text-body-md leading-relaxed text-text-secondary [&_a]:font-semibold [&_a]:text-text-link [&_code]:rounded-sm [&_code]:bg-background-tertiary [&_code]:px-xs [&_code]:py-xxs [&_li+li]:mt-sm [&_ul]:list-disc [&_ul]:pl-xl [&_ol]:list-decimal [&_ol]:pl-xl">
          {children}
        </div>
      ) : null}
      {unstyled}
    </section>
  )
}

export function PageIntro({ eyebrow, title, summary }: { eyebrow: string; title: string; summary: string }) {
  return <header className="min-w-0"><p className="mb-sm mt-0 text-label-sm font-semibold uppercase tracking-[.08em] text-text-accent">{eyebrow}</p><h1 className="m-0 text-heading-h1 font-bold tracking-heading-h1 text-text-primary">{title}</h1><p className="mb-0 mt-lg max-w-content-readable text-body-lg leading-relaxed text-text-secondary">{summary}</p></header>
}
