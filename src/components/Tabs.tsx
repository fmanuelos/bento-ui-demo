import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export type TabItem = { id: string; label: ReactNode; content: ReactNode; disabled?: boolean }
export type TabsProps = {
  label: string
  items: readonly TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  activation?: 'automatic' | 'manual'
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Tabs({
  label,
  items,
  value,
  defaultValue,
  onValueChange,
  activation = 'automatic',
  orientation = 'horizontal',
  className = '',
}: TabsProps) {
  const generatedId = useId()
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? ''
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled)
  const selectedId = value ?? internalValue
  const selected =
    items.find((item) => item.id === selectedId && !item.disabled) ??
    items.find((item) => !item.disabled)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const choose = (id: string) => {
    if (value === undefined) setInternalValue(id)
    onValueChange?.(id)
  }

  const moveFocus = (currentIndex: number, direction: 1 | -1) => {
    let next = currentIndex
    for (let count = 0; count < items.length; count += 1) {
      next = (next + direction + items.length) % items.length
      const item = items[next]
      if (item && !item.disabled) {
        tabRefs.current[item.id]?.focus()
        if (activation === 'automatic') choose(item.id)
        return
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number, id: string) => {
    const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
    if (event.key === previousKey) {
      event.preventDefault()
      moveFocus(index, -1)
    } else if (event.key === nextKey) {
      event.preventDefault()
      moveFocus(index, 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      const first = items.find((item) => !item.disabled)
      if (first) {
        tabRefs.current[first.id]?.focus()
        if (activation === 'automatic') choose(first.id)
      }
    } else if (event.key === 'End') {
      event.preventDefault()
      const last = items.findLast((item) => !item.disabled)
      if (last) {
        tabRefs.current[last.id]?.focus()
        if (activation === 'automatic') choose(last.id)
      }
    } else if (activation === 'manual' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      choose(id)
    }
  }

  if (!selected) return null

  return (
    <div
      className={`${orientation === 'vertical' ? 'grid grid-cols-[auto_1fr] gap-space-6' : ''} ${className}`}
    >
      <div
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        className={`${orientation === 'horizontal' ? 'flex overflow-x-auto border-b border-border-secondary' : 'grid content-start'} gap-space-1`}
      >
        {items.map((item, index) => {
          const isSelected = item.id === selected.id
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[item.id] = element
              }}
              id={`${generatedId}-tab-${item.id}`}
              type="button"
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              aria-selected={isSelected}
              aria-controls={`${generatedId}-panel-${item.id}`}
              disabled={item.disabled}
              onClick={() => choose(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index, item.id)}
              className={[
                'relative min-h-control-height-small shrink-0 rounded-shape-sm px-space-3 text-label-md font-semibold transition outline-none',
                'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid',
                'disabled:cursor-not-allowed disabled:text-text-disabled',
                isSelected
                  ? 'bg-background-accent text-text-accent after:absolute after:inset-x-space-3 after:bottom-0 after:h-0.5 after:bg-current'
                  : 'text-text-secondary hover:bg-action-ghost-background-hover hover:text-text-primary',
              ].join(' ')}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div
        id={`${generatedId}-panel-${selected.id}`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${generatedId}-tab-${selected.id}`}
        className="pt-space-4 outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid"
      >
        {selected.content}
      </div>
    </div>
  )
}
