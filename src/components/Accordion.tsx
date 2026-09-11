import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { Disclosure } from './Disclosure'

export type AccordionItem = {
  id: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  items: readonly AccordionItem[]
  type?: 'single' | 'multiple'
  collapsible?: boolean
  value?: readonly string[]
  defaultValue?: readonly string[]
  onValueChange?: (value: string[]) => void
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

export function Accordion({
  items,
  type = 'multiple',
  collapsible = true,
  value,
  defaultValue = [],
  onValueChange,
  headingLevel = 3,
  className = '',
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>([...defaultValue])
  const firstAvailable = items.find((item) => !item.disabled)?.id
  const requested = value ? [...value] : internalValue
  const requiredOpen = type === 'single' && !collapsible
  const expanded =
    requiredOpen && requested.length === 0 && firstAvailable ? [firstAvailable] : requested

  const change = (id: string, open: boolean) => {
    let next: string[]
    if (open) next = type === 'single' ? [id] : [...new Set([...expanded, id])]
    else {
      if (!collapsible && expanded.length === 1 && expanded[0] === id) return
      next = expanded.filter((item) => item !== id)
    }
    if (value === undefined) setInternalValue(next)
    onValueChange?.(next)
  }

  return (
    <div
      className={`divide-y divide-border-secondary rounded-lg border border-border-secondary ${className}`}
      {...props}
    >
      {items.map((item) => (
        <Disclosure
          key={item.id}
          title={item.title}
          open={expanded.includes(item.id)}
          onOpenChange={(open) => change(item.id, open)}
          disabled={item.disabled}
          buttonProps={{
            'aria-disabled': (requiredOpen && expanded.includes(item.id)) || undefined,
          }}
          headingLevel={headingLevel}
          className="first:rounded-t-lg last:rounded-b-lg"
        >
          {item.content}
        </Disclosure>
      ))}
    </div>
  )
}
