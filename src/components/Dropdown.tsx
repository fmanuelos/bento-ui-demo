import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Button, type ButtonProps } from './Button'

export type DropdownItem = {
  id: string
  label: string
  icon?: ReactNode
  destructive?: boolean
  disabled?: boolean
  onSelect: () => void
}

export type DropdownProps = {
  label: string
  items: readonly DropdownItem[]
  buttonProps?: Omit<ButtonProps, 'children' | 'onClick' | 'aria-expanded' | 'aria-haspopup'>
  align?: 'start' | 'end'
  className?: string
}

export function Dropdown({ label, items, buttonProps, align = 'start', className = '' }: DropdownProps) {
  const generatedId = useId()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    if (!open) return
    itemRefs.current.find((item) => !item?.disabled)?.focus()
    const handlePointer = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', handlePointer)
    return () => document.removeEventListener('pointerdown', handlePointer)
  }, [open])

  const close = (restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus())
  }

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <Button {...buttonProps} ref={triggerRef} aria-haspopup="menu" aria-expanded={open} aria-controls={generatedId} onClick={() => setOpen((value) => !value)} icon={<svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>}>{label}</Button>
      {open && (
        <div id={generatedId} role="menu" aria-label={label} onKeyDown={(event) => {
          const available = itemRefs.current.filter((item): item is HTMLButtonElement => Boolean(item && !item.disabled))
          const index = available.indexOf(document.activeElement as HTMLButtonElement)
          if (event.key === 'Escape') { event.preventDefault(); close() }
          else if (event.key === 'ArrowDown') { event.preventDefault(); available[(index + 1) % available.length]?.focus() }
          else if (event.key === 'ArrowUp') { event.preventDefault(); available[(index - 1 + available.length) % available.length]?.focus() }
          else if (event.key === 'Home') { event.preventDefault(); available[0]?.focus() }
          else if (event.key === 'End') { event.preventDefault(); available.at(-1)?.focus() }
          else if (event.key === 'Tab') close(false)
        }} className={`absolute z-30 mt-xs min-w-48 rounded-md border border-border-secondary bg-surface-raised p-sm text-text-primary ${align === 'end' ? 'right-0' : 'left-0'}`}>
          {items.map((item, index) => (
            <button key={item.id} ref={(element) => { itemRefs.current[index] = element }} type="button" role="menuitem" disabled={item.disabled} onClick={() => { item.onSelect(); close() }} className={`flex min-h-control-height-md w-full items-center gap-md rounded-md px-md py-sm text-left text-body-sm outline-none hover:bg-action-tertiary-background-hover focus-visible:bg-action-tertiary-background-hover focus-visible:outline-3 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:text-text-disabled ${item.destructive ? 'text-text-danger' : ''}`}>{item.icon && <span aria-hidden="true">{item.icon}</span>}{item.label}</button>
          ))}
        </div>
      )}
    </div>
  )
}
