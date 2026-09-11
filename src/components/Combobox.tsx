import {
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react'
import { FieldFrame } from './internal/Field'
import { getFieldDescriptionIds } from './internal/fieldA11y'
import { fieldControlBase, fieldStatusClasses } from './internal/fieldStyles'
import { type ListboxOption } from './Listbox'

export type ComboboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'onChange'
> & {
  label: string
  options: readonly ListboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  allowCustomValue?: boolean
  helperText?: string
  error?: string
  loading?: boolean
  emptyMessage?: string
}

export function Combobox({
  id,
  label,
  options,
  value,
  defaultValue = '',
  onValueChange,
  allowCustomValue = false,
  helperText,
  error,
  loading = false,
  emptyMessage = 'No matches found.',
  required,
  disabled,
  className = '',
  ...props
}: ComboboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [query, setQuery] = useState(value ?? defaultValue)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentValue = value ?? internalValue
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [options, query],
  )
  const popupId = `${inputId}-popup`
  const describedBy = getFieldDescriptionIds(inputId, {
    description: helperText,
    error,
  })

  const commit = (option: ListboxOption) => {
    if (option.disabled) return
    if (value === undefined) setInternalValue(option.value)
    setQuery(option.label)
    setOpen(false)
    onValueChange?.(option.value)
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((index) => Math.min(index + 1, Math.max(0, filtered.length - 1)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(0, index - 1))
    } else if (event.key === 'Enter' && open) {
      event.preventDefault()
      const option = filtered[activeIndex]
      if (option) commit(option)
      else if (allowCustomValue) {
        if (value === undefined) setInternalValue(query)
        onValueChange?.(query)
        setOpen(false)
      }
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      const selected = options.find((option) => option.value === currentValue)
      setQuery(selected?.label ?? (allowCustomValue ? query : ''))
    }
  }

  return (
    <FieldFrame
      id={inputId}
      label={label}
      description={helperText}
      error={error}
      required={required}
    >
      <div className="relative">
        <input
          {...props}
          ref={inputRef}
          id={inputId}
          role="combobox"
          value={query}
          required={required}
          disabled={disabled}
          aria-expanded={open}
          aria-controls={popupId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[activeIndex] ? `${popupId}-option-${activeIndex}` : undefined
          }
          aria-describedby={describedBy}
          aria-errormessage={error ? `${inputId}-message` : undefined}
          aria-invalid={Boolean(error)}
          onFocus={() => setOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(false)
          }}
          onChange={(event) => {
            setQuery(event.currentTarget.value)
            setOpen(true)
            setActiveIndex(0)
            if (allowCustomValue) onValueChange?.(event.currentTarget.value)
          }}
          onKeyDown={handleKeyDown}
          className={`${fieldControlBase} h-control-height-medium pr-10 ${fieldStatusClasses[error ? 'invalid' : 'default']} ${className}`}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={open ? 'Close suggestions' : 'Show suggestions'}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setOpen((shown) => !shown)
            inputRef.current?.focus()
          }}
          className="absolute inset-y-0 right-0 grid w-control-height-medium place-items-center rounded-md text-text-secondary"
        >
          <svg
            className="size-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>
        {open && !disabled && (
          <div
            id={popupId}
            role="listbox"
            aria-label={`${label} suggestions`}
            aria-busy={loading || undefined}
            className="absolute z-30 mt-space-1 max-h-64 w-full overflow-y-auto rounded-md border border-border-secondary bg-surface-raised p-space-2 text-body-sm text-text-primary"
          >
            {loading && (
              <p className="m-0 px-space-3 py-space-2 text-text-secondary">Loading suggestions…</p>
            )}
            {!loading && filtered.length === 0 && (
              <p className="m-0 px-space-3 py-space-2 text-text-secondary">{emptyMessage}</p>
            )}
            {!loading &&
              filtered.map((option, index) => (
                <div
                  key={option.value}
                  id={`${popupId}-option-${index}`}
                  role="option"
                  aria-selected={currentValue === option.value}
                  aria-disabled={option.disabled || undefined}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseMove={() => !option.disabled && setActiveIndex(index)}
                  onClick={() => commit(option)}
                  className={`rounded-md px-space-3 py-space-2 ${option.disabled ? 'cursor-not-allowed text-text-disabled' : 'cursor-pointer'} ${activeIndex === index ? 'bg-action-ghost-background-hover' : ''} ${currentValue === option.value ? 'font-semibold text-text-accent' : ''}`}
                >
                  {option.label}
                </div>
              ))}
          </div>
        )}
      </div>
    </FieldFrame>
  )
}
