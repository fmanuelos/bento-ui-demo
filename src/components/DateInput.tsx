import { forwardRef, useState } from 'react'
import { Input, type InputProps } from './Input'
import { validateDate } from './date-input-model'

export type DateInputProps = Omit<
  InputProps,
  'type' | 'value' | 'defaultValue' | 'onChange' | 'onInput' | 'min' | 'max'
> & {
  value: string
  min?: string
  max?: string
  onValueChange: (value: string, badInput: boolean) => void
}
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { value, min, max, onValueChange, required, error, helperText, onBlur, ...props },
  ref,
) {
  const [touched, setTouched] = useState(false)
  const [entry, setEntry] = useState({ value, badInput: false })
  const badInput = entry.value === value && entry.badInput
  const validation = validateDate(value, { required, min, max, badInput })
  const reportEntry = (input: HTMLInputElement) => {
    const bad = input.validity.badInput
    setEntry({ value: input.value, badInput: bad })
    onValueChange(input.value, bad)
  }
  return (
    <Input
      {...props}
      ref={ref}
      type="date"
      value={value}
      min={min}
      max={max}
      required={required}
      error={error || (touched ? validation : undefined)}
      helperText={
        helperText ??
        `Use the date format shown by your browser.${min ? ` Earliest: ${min}.` : ''}${max ? ` Latest: ${max}.` : ''}`
      }
      onInput={(event) => {
        // Native partial dates can keep value="", so React onChange may not fire.
        if (
          event.currentTarget.value === value &&
          event.currentTarget.validity.badInput !== badInput
        )
          reportEntry(event.currentTarget)
      }}
      onChange={(event) => reportEntry(event.currentTarget)}
      onBlur={(event) => {
        setTouched(true)
        if (event.currentTarget.validity.badInput !== badInput) reportEntry(event.currentTarget)
        onBlur?.(event)
      }}
    />
  )
})
