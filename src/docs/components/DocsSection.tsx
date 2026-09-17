import { type ReactNode } from 'react'

export function DocsSection({
  id,
  title,
  children,
  preview = false,
}: {
  id: string
  title: string
  children?: ReactNode
  preview?: boolean
}) {
  return (
    <section
      id={id}
      className="min-w-0 scroll-mt-section-desktop border-t border-border-secondary pt-scale-8"
    >
      <h2 className="mt-0 mb-scale-4 text-heading-md font-semibold text-text-primary">{title}</h2>
      {preview ? (
        <div className="rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-4 sm:p-scale-6">
          {children}
        </div>
      ) : (
        <div className="min-w-0 text-body-md leading-relaxed text-text-secondary [&_a]:font-semibold [&_a]:text-text-link [&_code]:rounded-shape-sm [&_code]:bg-background-tertiary [&_code]:px-scale-1 [&_code]:py-scale-1 [&_li+li]:mt-scale-2 [&_ol]:list-decimal [&_ol]:pl-scale-6 [&_ul]:list-disc [&_ul]:pl-scale-6">
          {children}
        </div>
      )}
    </section>
  )
}

export function PageIntro({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string
  title: string
  summary: string
}) {
  return (
    <header className="min-w-0">
      <p className="mt-0 mb-scale-2 font-label-overline text-label-overline leading-label-overline font-semibold tracking-label-overline text-text-accent uppercase">
        {eyebrow}
      </p>
      <h1 className="m-0 text-heading-xl font-bold tracking-heading-xl text-text-primary">
        {title}
      </h1>
      <p className="mt-scale-4 mb-0 max-w-container-readable text-body-lg leading-relaxed text-text-secondary">
        {summary}
      </p>
    </header>
  )
}
