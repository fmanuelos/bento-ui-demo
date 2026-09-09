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
    <section id={id} className="min-w-0 scroll-mt-24 border-t border-border-secondary pt-2xl">
      <h2 className="mt-0 mb-lg text-heading-md font-semibold text-text-primary">{title}</h2>
      {preview ? (
        <div className="rounded-lg border border-border-secondary bg-surface-primary p-lg sm:p-xl">
          {children}
        </div>
      ) : (
        <div className="min-w-0 text-body-md leading-relaxed text-text-secondary [&_a]:font-semibold [&_a]:text-text-link [&_code]:rounded-sm [&_code]:bg-background-tertiary [&_code]:px-xs [&_code]:py-xxs [&_li+li]:mt-sm [&_ol]:list-decimal [&_ol]:pl-xl [&_ul]:list-disc [&_ul]:pl-xl">
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
      <p className="mt-0 mb-sm font-label-overline text-label-overline leading-label-overline font-semibold tracking-label-overline text-text-accent uppercase">
        {eyebrow}
      </p>
      <h1 className="m-0 text-heading-xl font-bold tracking-heading-xl text-text-primary">
        {title}
      </h1>
      <p className="mt-lg mb-0 max-w-content-readable text-body-lg leading-relaxed text-text-secondary">
        {summary}
      </p>
    </header>
  )
}
