import { Link } from './Link'

export type ContentsNavigationProps = {
  label?: string
  items: readonly { id: string; label: string; targetId: string }[]
}

/** Targets are consumer-owned headings with stable IDs and tabIndex={-1}. */
export function ContentsNavigation({ label = 'On this page', items }: ContentsNavigationProps) {
  if (!items.length) return null
  return (
    <nav
      aria-label={label}
      className="space-y-scale-3 rounded-shape-md border border-border-secondary p-scale-4"
    >
      <p className="m-0 font-semibold">{label}</p>
      <ol className="m-0 list-decimal space-y-scale-2 ps-scale-6">
        {items.map((item) => (
          <li key={item.id} className="break-words">
            <Link href={`#${encodeURIComponent(item.targetId)}`}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
