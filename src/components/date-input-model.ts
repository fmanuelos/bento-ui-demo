export function validCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  if (year < 1 || month < 1 || month > 12 || day < 1) return false
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  return day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
}
export function validateDate(
  value: string,
  options: { required?: boolean; min?: string; max?: string; badInput?: boolean } = {},
): string | undefined {
  const { required, min, max, badInput } = options
  if (
    (min && !validCalendarDate(min)) ||
    (max && !validCalendarDate(max)) ||
    (min && max && min > max)
  )
    return 'Date constraints are unavailable. Contact the form owner.'
  if (badInput) return 'Enter a complete valid date.'
  if (!value) return required ? 'Choose a date.' : undefined
  if (!validCalendarDate(value)) return 'Enter a valid calendar date.'
  if (min && value < min) return `Choose ${min} or later.`
  if (max && value > max) return `Choose ${max} or earlier.`
}
export function formatCalendarDate(value: string, locale = 'en-US'): string {
  if (!validCalendarDate(value)) return value || 'Not provided'
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'UTC',
    calendar: 'gregory',
  }).format(date)
}
