import {
  forwardRef,
  useEffect,
  useId,
  useState,
  type InputEventHandler,
  type InputHTMLAttributes,
} from 'react'
import { FieldFrame } from './internal/Field'
import { getFieldDescriptionIds } from './internal/fieldA11y'

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label: string
  description?: string
  error?: string
  showValue?: boolean
  formatValue?: (value: number) => string
}

function toNumber(value: string | number | readonly string[] | undefined, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    id,
    label,
    description,
    error,
    showValue = true,
    formatValue = String,
    min = 0,
    max = 100,
    value,
    defaultValue,
    onInput,
    className = '',
    required,
    'aria-valuetext': ariaValueText,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const minimum = toNumber(min, 0)
  const maximum = toNumber(max, 100)
  const [currentValue, setCurrentValue] = useState(() =>
    toNumber(value ?? defaultValue, minimum + (maximum - minimum) / 2),
  )
  const visibleValue = formatValue(currentValue)
  const describedBy = getFieldDescriptionIds(inputId, { description, error })

  useEffect(() => {
    if (value !== undefined) setCurrentValue(toNumber(value, minimum))
  }, [minimum, value])

  const handleInput: InputEventHandler<HTMLInputElement> = (event) => {
    setCurrentValue(event.currentTarget.valueAsNumber)
    onInput?.(event)
  }

  return (
    <FieldFrame
      id={inputId}
      label={label}
      hint={showValue ? visibleValue : undefined}
      description={description}
      error={error}
      required={required}
    >
      <input
        {...props}
        ref={ref}
        id={inputId}
        type="range"
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        required={required}
        onInput={handleInput}
        aria-describedby={describedBy}
        aria-errormessage={error ? `${inputId}-message` : undefined}
        aria-invalid={Boolean(error)}
        aria-valuetext={ariaValueText ?? (formatValue === String ? undefined : visibleValue)}
        className={[
          'h-touch-target-min w-full cursor-pointer accent-action-primary-background-default',
          'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid',
          'disabled:cursor-not-allowed disabled:accent-background-disabled',
          className,
        ].join(' ')}
      />
    </FieldFrame>
  )
})
