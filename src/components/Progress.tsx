import { type HTMLAttributes } from 'react'

export type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  label: string
  value?: number
  min?: number
  max?: number
  valueLabel?: string
  showValue?: boolean
}

export function Progress({
  label,
  value,
  min = 0,
  max = 100,
  valueLabel,
  showValue = true,
  className = '',
  ...props
}: ProgressProps) {
  const boundedValue = value === undefined ? undefined : Math.min(max, Math.max(min, value))
  const percentage =
    boundedValue === undefined || max <= min
      ? undefined
      : ((boundedValue - min) / (max - min)) * 100
  const visibleValue =
    valueLabel ?? (percentage === undefined ? undefined : `${Math.round(percentage)}%`)

  return (
    <div className={`grid gap-space-2 ${className}`} {...props}>
      <div className="flex items-baseline justify-between gap-space-4">
        <span className="text-label-md font-semibold text-text-primary">{label}</span>
        {showValue && visibleValue && (
          <span className="text-body-xs text-text-secondary">{visibleValue}</span>
        )}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={percentage === undefined ? undefined : min}
        aria-valuemax={percentage === undefined ? undefined : max}
        aria-valuenow={boundedValue}
        aria-valuetext={valueLabel}
        className="h-space-2 overflow-hidden rounded-shape-full bg-feedback-info-background"
      >
        <span
          className={`block h-full rounded-shape-full bg-feedback-info-foreground motion-reduce:transition-none ${percentage === undefined ? 'w-1/3 animate-pulse motion-reduce:animate-none' : 'transition-[width] duration-200'}`}
          style={percentage === undefined ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string
  size?: 'small' | 'medium' | 'large'
}

const spinnerSizes = {
  small: 'size-4',
  medium: 'size-5',
  large: 'size-space-6',
} as const

export function Spinner({ label, size = 'medium', className = '', ...props }: SpinnerProps) {
  return (
    <span
      role={label ? 'status' : undefined}
      aria-label={label}
      className={`inline-grid shrink-0 place-items-center ${className}`}
      {...props}
    >
      <span
        className={`${spinnerSizes[size]} animate-spin rounded-shape-full border-2 border-current border-r-transparent motion-reduce:animate-none`}
        aria-hidden="true"
      />
    </span>
  )
}
