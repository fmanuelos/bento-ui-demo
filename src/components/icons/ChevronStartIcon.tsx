import { Icon, type IconProps } from './Icon'

export function ChevronStartIcon({ className = '', ...props }: IconProps) {
  return (
    <Icon className={`rtl:-scale-x-100 ${className}`} {...props}>
      <path d="m15 6-6 6 6 6" />
    </Icon>
  )
}
