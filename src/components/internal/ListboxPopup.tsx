import { useEffect, useRef, type RefObject } from 'react'
import type { SelectOption } from '../Select'
import { OverlaySurface } from './Overlay'

type ListboxPopupProps = {
  id: string
  label: string
  options: readonly SelectOption[]
  open: boolean
  anchorRef: RefObject<HTMLElement | null>
  activeIndex: number
  selectedValue?: string
  loading?: boolean
  emptyMessage?: string
  onActiveIndexChange: (index: number) => void
  onSelect: (option: SelectOption, index: number) => void
  onDismiss: () => void
}

export function ListboxPopup({
  id,
  label,
  options,
  open,
  anchorRef,
  activeIndex,
  selectedValue,
  loading = false,
  emptyMessage = 'No options available.',
  onActiveIndexChange,
  onSelect,
  onDismiss,
}: ListboxPopupProps) {
  const activeOptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) activeOptionRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  return (
    <OverlaySurface
      id={id}
      role="listbox"
      aria-label={label}
      aria-busy={loading || undefined}
      open={open}
      anchorRef={anchorRef}
      onDismiss={onDismiss}
      placement="bottom-start"
      offset={4}
      matchAnchorWidth
      dismissOnEscape={false}
      restoreFocus={false}
      className="max-h-64 overflow-y-auto p-scale-2 text-body-sm"
    >
      {loading ? (
        <div className="px-scale-3 py-scale-2 text-text-secondary">Loading…</div>
      ) : options.length === 0 ? (
        <div className="px-scale-3 py-scale-2 text-text-secondary">{emptyMessage}</div>
      ) : (
        options.map((option, index) => {
          const active = index === activeIndex
          const selected = option.value === selectedValue

          return (
            <div
              key={option.value}
              ref={active ? activeOptionRef : undefined}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={selected}
              aria-disabled={option.disabled || undefined}
              className={[
                'rounded-shape-sm px-scale-3 py-scale-2',
                option.disabled
                  ? 'cursor-not-allowed text-text-disabled'
                  : 'cursor-pointer text-text-primary',
                active && !option.disabled ? 'bg-action-ghost-background-hover' : '',
                selected && !option.disabled ? 'font-semibold text-text-accent' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => {
                if (!option.disabled) onActiveIndexChange(index)
              }}
              onClick={() => {
                if (!option.disabled) onSelect(option, index)
              }}
            >
              {option.label}
            </div>
          )
        })
      )}
    </OverlaySurface>
  )
}
