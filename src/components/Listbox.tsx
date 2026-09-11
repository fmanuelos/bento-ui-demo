import { useId, useRef, useState, type KeyboardEvent } from 'react'

export type ListboxOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type ListboxProps = {
  id?: string
  label: string
  options: readonly ListboxOption[]
  multiple?: boolean
  value?: string | readonly string[]
  defaultValue?: string | readonly string[]
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  loading?: boolean
  error?: string
  emptyMessage?: string
  className?: string
}

export function Listbox({
  id,
  label,
  options,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  loading = false,
  error,
  emptyMessage = 'No options available.',
  className = '',
}: ListboxProps) {
  const generatedId = useId()
  const listboxId = id ?? generatedId
  const initial = Array.isArray(defaultValue)
    ? [...defaultValue]
    : defaultValue
      ? [defaultValue]
      : []
  const [internalValues, setInternalValues] = useState<string[]>(initial)
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => !option.disabled),
    ),
  )
  const typeaheadRef = useRef('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const controlledValues =
    value === undefined ? internalValues : Array.isArray(value) ? [...value] : [value]

  const move = (start: number, direction: 1 | -1) => {
    if (!options.length) return
    let next = start
    for (let count = 0; count < options.length; count += 1) {
      next = (next + direction + options.length) % options.length
      if (!options[next]?.disabled) {
        setActiveIndex(next)
        return
      }
    }
  }

  const select = (option: ListboxOption) => {
    if (option.disabled || disabled || loading) return
    const next = multiple
      ? controlledValues.includes(option.value)
        ? controlledValues.filter((entry) => entry !== option.value)
        : [...controlledValues, option.value]
      : [option.value]
    if (value === undefined) setInternalValues(next)
    onValueChange?.(multiple ? next : (next[0] ?? ''))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || loading) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(activeIndex, 1)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(activeIndex, -1)
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(
        Math.max(
          0,
          options.findIndex((option) => !option.disabled),
        ),
      )
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      const last = options.findLastIndex((option) => !option.disabled)
      setActiveIndex(Math.max(0, last))
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const option = options[activeIndex]
      if (option) select(option)
      return
    }
    if (event.key.length === 1 && /\S/.test(event.key)) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      typeaheadRef.current += event.key.toLocaleLowerCase()
      const match = options.findIndex(
        (option) =>
          !option.disabled && option.label.toLocaleLowerCase().startsWith(typeaheadRef.current),
      )
      if (match >= 0) setActiveIndex(match)
      timeoutRef.current = setTimeout(() => {
        typeaheadRef.current = ''
      }, 500)
    }
  }

  return (
    <div className={`grid gap-space-2 ${className}`}>
      <span id={`${listboxId}-label`} className="text-label-md font-semibold text-text-primary">
        {label}
      </span>
      <div
        id={listboxId}
        role="listbox"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={`${listboxId}-label`}
        aria-multiselectable={multiple || undefined}
        aria-activedescendant={
          options[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined
        }
        aria-busy={loading || undefined}
        aria-disabled={disabled || undefined}
        aria-describedby={error ? `${listboxId}-error` : undefined}
        onKeyDown={handleKeyDown}
        className={`max-h-64 overflow-y-auto rounded-shape-md border bg-surface-raised p-space-2 text-body-sm text-text-primary outline-none focus-visible:border-border-focus focus-visible:ring-3 focus-visible:ring-focus-ring/20 ${error ? 'border-border-danger' : 'border-border-secondary'}`}
      >
        {loading && (
          <p className="m-0 px-space-3 py-space-2 text-text-secondary">Loading options…</p>
        )}
        {!loading && options.length === 0 && (
          <p className="m-0 px-space-3 py-space-2 text-text-secondary">{emptyMessage}</p>
        )}
        {!loading &&
          options.map((option, index) => {
            const selected = controlledValues.includes(option.value)
            const active = activeIndex === index
            return (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={selected}
                aria-disabled={option.disabled || undefined}
                onMouseMove={() => !option.disabled && setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => select(option)}
                className={[
                  'flex min-h-control-height-small items-center gap-space-3 rounded-shape-md px-space-3 py-space-2',
                  option.disabled ? 'cursor-not-allowed text-text-disabled' : 'cursor-pointer',
                  selected ? 'bg-selection-background text-selection-foreground' : '',
                  !selected && active ? 'bg-action-ghost-background-hover' : '',
                ].join(' ')}
              >
                {multiple && (
                  <span
                    className={`grid size-4 place-items-center rounded-shape-xs border ${selected ? 'border-action-primary-background-default bg-action-primary-background-default text-action-primary-foreground' : 'border-border-strong'}`}
                    aria-hidden="true"
                  >
                    {selected && '✓'}
                  </span>
                )}
                <span className="grid gap-space-1">
                  <span className="font-semibold">{option.label}</span>
                  {option.description && (
                    <span className="text-body-xs text-text-secondary">{option.description}</span>
                  )}
                </span>
              </div>
            )
          })}
      </div>
      {error && (
        <p id={`${listboxId}-error`} className="m-0 text-body-xs text-text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
