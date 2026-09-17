import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Button, type ButtonProps } from './Button'

export type DisclosureProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: ReactNode
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  busy?: boolean
  buttonProps?: Omit<ButtonProps, 'children' | 'aria-expanded' | 'aria-controls' | 'onClick'>
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

export function Disclosure({
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  busy = false,
  buttonProps,
  headingLevel,
  className = '',
  ...props
}: DisclosureProps) {
  const generatedId = useId()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const expanded = open ?? internalOpen
  const setExpanded = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }
  const trigger = (
    <Button
      variant="ghost"
      size="large"
      {...buttonProps}
      disabled={disabled || busy}
      aria-expanded={expanded}
      aria-controls={`${generatedId}-panel`}
      aria-busy={busy || undefined}
      onClick={() => setExpanded(!expanded)}
      className={`w-full justify-between text-left ${buttonProps?.className ?? ''}`}
      icon={
        <svg
          className={`transition-transform motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      }
    >
      {title}
    </Button>
  )
  const Heading = headingLevel ? (`h${headingLevel}` as const) : undefined

  return (
    <div className={className} {...props}>
      {Heading ? <Heading className="m-0">{trigger}</Heading> : trigger}
      <div id={`${generatedId}-panel`} hidden={!expanded} aria-busy={busy || undefined}>
        {expanded && <div className="px-scale-3 pt-scale-2 pb-scale-4">{children}</div>}
      </div>
    </div>
  )
}
