import {
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react'
import { ChevronDownIcon } from '../icons'
import { FieldFrame } from './internal/Field'
import { getFieldDescriptionIds } from './internal/fieldA11y'
import { fieldControlBase, fieldStatusClasses } from './internal/fieldStyles'
import {
  findFirstEnabledIndex,
  findLastEnabledIndex,
  findNextEnabledIndex,
} from './internal/listboxNavigation'
import { ListboxPopup } from './internal/ListboxPopup'
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
  const [query, setQuery] = useState(
    options.find((option) => option.value === (value ?? defaultValue))?.label ??
      value ??
      defaultValue,
  )
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentValue = value ?? internalValue
  const selectedOption = options.find((option) => option.value === currentValue)
  const selectedDisplayValue = selectedOption?.label ?? (allowCustomValue ? currentValue : '')
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
  const selectedFilteredIndex = filtered.findIndex(
    (option) => option.value === currentValue && !option.disabled,
  )
  const resolvedActiveIndex =
    filtered[activeIndex] && !filtered[activeIndex]?.disabled
      ? activeIndex
      : selectedFilteredIndex >= 0
        ? selectedFilteredIndex
        : findFirstEnabledIndex(filtered)

  const openSuggestions = (initialIndex?: number) => {
    if (disabled) return
    if (!open) setQuery(selectedDisplayValue)
    setActiveIndex(
      initialIndex ??
        (selectedFilteredIndex >= 0 ? selectedFilteredIndex : findFirstEnabledIndex(filtered)),
    )
    setOpen(true)
  }

  const commit = (option: ListboxOption) => {
    if (option.disabled) return
    if (value === undefined) setInternalValue(option.value)
    setQuery(option.label)
    setOpen(false)
    onValueChange?.(option.value)
    inputRef.current?.focus()
  }

  const commitCustomValue = () => {
    if (value === undefined) setInternalValue(query)
    onValueChange?.(query)
    setOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) openSuggestions(findFirstEnabledIndex(filtered))
      else setActiveIndex(findNextEnabledIndex(filtered, resolvedActiveIndex, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) openSuggestions(findLastEnabledIndex(filtered))
      else setActiveIndex(findNextEnabledIndex(filtered, resolvedActiveIndex, -1))
    } else if (event.key === 'Home' && open) {
      event.preventDefault()
      setActiveIndex(findFirstEnabledIndex(filtered))
    } else if (event.key === 'End' && open) {
      event.preventDefault()
      setActiveIndex(findLastEnabledIndex(filtered))
    } else if (event.key === 'Enter' && open) {
      event.preventDefault()
      const option = filtered[resolvedActiveIndex]
      if (option) commit(option)
      else if (allowCustomValue) commitCustomValue()
    } else if (event.key === 'Escape' && open) {
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
      busy={loading}
    >
      <div ref={rootRef} className="relative">
        <input
          {...props}
          ref={inputRef}
          id={inputId}
          role="combobox"
          value={open ? query : selectedDisplayValue}
          required={required}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={popupId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[resolvedActiveIndex]
              ? `${popupId}-option-${resolvedActiveIndex}`
              : undefined
          }
          aria-describedby={describedBy}
          aria-errormessage={error ? `${inputId}-message` : undefined}
          aria-invalid={Boolean(error)}
          onFocus={() => openSuggestions()}
          onBlur={(event) => {
            if (!rootRef.current?.contains(event.relatedTarget)) setOpen(false)
          }}
          onChange={(event) => {
            const nextQuery = event.currentTarget.value
            const nextFiltered = options.filter((option) =>
              option.label.toLocaleLowerCase().includes(nextQuery.toLocaleLowerCase()),
            )
            setQuery(nextQuery)
            setOpen(true)
            setActiveIndex(findFirstEnabledIndex(nextFiltered))
            if (allowCustomValue) {
              if (value === undefined) setInternalValue(nextQuery)
              onValueChange?.(nextQuery)
            }
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
            if (open) setOpen(false)
            else openSuggestions()
            inputRef.current?.focus()
          }}
          className="absolute inset-y-0 right-0 grid w-control-height-medium place-items-center rounded-shape-md text-text-secondary"
        >
          <ChevronDownIcon size="sm" />
        </button>
        <ListboxPopup
          id={popupId}
          label={`${label} suggestions`}
          options={filtered}
          open={open && !disabled}
          anchorRef={rootRef}
          activeIndex={resolvedActiveIndex}
          selectedValue={currentValue}
          loading={loading}
          emptyMessage={emptyMessage}
          onActiveIndexChange={setActiveIndex}
          onSelect={commit}
          onDismiss={() => setOpen(false)}
        />
      </div>
    </FieldFrame>
  )
}
