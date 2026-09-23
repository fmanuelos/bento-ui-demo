import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { ChevronDownIcon } from './icons'
import { FieldFrame, type FieldSize, type FieldStatus } from './internal/Field'
import { getFieldDescriptionIds } from './internal/fieldA11y'
import { fieldControlBase, fieldStatusClasses } from './internal/fieldStyles'
import {
  findFirstEnabledIndex,
  findLastEnabledIndex,
  findNextEnabledIndex,
  findTypeaheadIndex,
} from './internal/listboxNavigation'
import { ListboxPopup } from './internal/ListboxPopup'
import type { SelectOption } from './Select'

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value)
  else if (ref) ref.current = value
}

export type CustomSelectProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'value' | 'defaultValue' | 'onChange' | 'name'
> & {
  label: string
  options: readonly SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  hint?: string
  helperText?: string
  error?: string
  status?: FieldStatus
  size?: FieldSize
  leadingIcon?: ReactNode
  loading?: boolean
  emptyMessage?: string
  name?: string
  required?: boolean
}

export const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(function CustomSelect(
  {
    id,
    label,
    options,
    value,
    defaultValue = '',
    onValueChange,
    placeholder = 'Select an option',
    hint,
    helperText,
    error,
    status = error ? 'invalid' : 'default',
    size = 'medium',
    leadingIcon,
    loading = false,
    emptyMessage = 'No options available.',
    name,
    required,
    disabled,
    form,
    className = '',
    onClick,
    onKeyDown,
    ...props
  },
  forwardedRef,
) {
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const popupId = `${triggerId}-popup`
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const typeaheadRef = useRef('')
  const typeaheadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const currentValue = value ?? internalValue
  const selectedOption = options.find((option) => option.value === currentValue)
  const describedBy = getFieldDescriptionIds(triggerId, {
    hint,
    description: helperText,
    error,
  })

  useEffect(() => {
    if (value !== undefined) return
    const formElement = triggerRef.current?.form
    if (!formElement) return
    const handleReset = () => {
      setInternalValue(defaultValue)
      setOpen(false)
    }
    formElement.addEventListener('reset', handleReset)
    return () => formElement.removeEventListener('reset', handleReset)
  }, [defaultValue, value])

  useEffect(
    () => () => {
      if (typeaheadTimerRef.current) clearTimeout(typeaheadTimerRef.current)
    },
    [],
  )

  const selectedIndex = options.findIndex(
    (option) => option.value === currentValue && !option.disabled,
  )
  const resolvedActiveIndex =
    options[activeIndex] && !options[activeIndex]?.disabled
      ? activeIndex
      : selectedIndex >= 0
        ? selectedIndex
        : findFirstEnabledIndex(options)

  const openListbox = (initialIndex?: number) => {
    if (disabled) return
    setActiveIndex(
      initialIndex ?? (selectedIndex >= 0 ? selectedIndex : findFirstEnabledIndex(options)),
    )
    setOpen(true)
  }

  const commit = (option: SelectOption) => {
    if (option.disabled) return
    if (value === undefined) setInternalValue(option.value)
    onValueChange?.(option.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) openListbox(findFirstEnabledIndex(options))
      else setActiveIndex(findNextEnabledIndex(options, resolvedActiveIndex, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) openListbox(findLastEnabledIndex(options))
      else setActiveIndex(findNextEnabledIndex(options, resolvedActiveIndex, -1))
    } else if (event.key === 'Home') {
      event.preventDefault()
      if (!open) openListbox(findFirstEnabledIndex(options))
      else setActiveIndex(findFirstEnabledIndex(options))
    } else if (event.key === 'End') {
      event.preventDefault()
      if (!open) openListbox(findLastEnabledIndex(options))
      else setActiveIndex(findLastEnabledIndex(options))
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!open) openListbox()
      else {
        const option = options[resolvedActiveIndex]
        if (option) commit(option)
      }
    } else if (event.key === 'Escape' && open) {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Tab') {
      setOpen(false)
    } else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
      typeaheadRef.current += event.key
      if (typeaheadTimerRef.current) clearTimeout(typeaheadTimerRef.current)
      typeaheadTimerRef.current = setTimeout(() => {
        typeaheadRef.current = ''
      }, 500)
      const matchIndex = findTypeaheadIndex(options, typeaheadRef.current, resolvedActiveIndex)
      if (matchIndex >= 0) {
        event.preventDefault()
        if (open) setActiveIndex(matchIndex)
        else commit(options[matchIndex]!)
      }
    }
  }

  return (
    <FieldFrame
      id={triggerId}
      label={label}
      hint={hint}
      description={helperText}
      error={error}
      status={status}
      required={required}
      busy={loading}
    >
      <div ref={rootRef} className="relative">
        <button
          {...props}
          ref={(element) => {
            triggerRef.current = element
            assignRef(forwardedRef, element)
          }}
          id={triggerId}
          type="button"
          role="combobox"
          disabled={disabled}
          form={form}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={popupId}
          aria-activedescendant={
            open && options[resolvedActiveIndex]
              ? `${popupId}-option-${resolvedActiveIndex}`
              : undefined
          }
          aria-autocomplete="none"
          aria-required={required || undefined}
          aria-describedby={describedBy}
          aria-errormessage={error ? `${triggerId}-message` : undefined}
          aria-invalid={Boolean(error) || status === 'invalid'}
          onClick={(event) => {
            onClick?.(event)
            if (event.defaultPrevented) return
            if (open) setOpen(false)
            else openListbox()
          }}
          onKeyDown={handleTriggerKeyDown}
          className={[
            fieldControlBase,
            'flex items-center gap-scale-2 text-left',
            size === 'small' ? 'h-control-height-small' : 'h-control-height-medium',
            selectedOption ? '' : 'text-text-placeholder',
            fieldStatusClasses[error ? 'invalid' : status],
            className,
          ].join(' ')}
        >
          {leadingIcon ? (
            <span className="shrink-0 text-text-secondary" aria-hidden="true">
              {leadingIcon}
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate">{selectedOption?.label ?? placeholder}</span>
          <ChevronDownIcon size="sm" className="shrink-0 text-text-secondary" />
        </button>
        {name ? <input type="hidden" name={name} value={currentValue} form={form} /> : null}
        <ListboxPopup
          id={popupId}
          label={label}
          options={options}
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
})
