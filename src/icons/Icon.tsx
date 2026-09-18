import { type CSSProperties, type ReactNode } from 'react'

export type IconSize = 'small' | 'medium' | 'large'

type DataAttributes = {
  [attribute: `data-${string}`]: string | number | boolean | undefined
}

export type IconProps = DataAttributes & {
  size?: IconSize
  label?: string
  className?: string
  style?: CSSProperties
}

type IconPrimitiveProps = IconProps & {
  children: ReactNode
  filled?: boolean
}

const sizeClasses: Record<IconSize, string> = {
  small: 'size-scale-4',
  medium: 'size-scale-5',
  large: 'size-scale-6',
}

export function Icon({
  size = 'medium',
  label,
  filled = false,
  className = '',
  children,
  ...props
}: IconPrimitiveProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : 1.8}
      strokeLinecap={filled ? undefined : 'round'}
      strokeLinejoin={filled ? undefined : 'round'}
      focusable="false"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block shrink-0 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </svg>
  )
}
