import { Icon, type IconProps } from './Icon'

export function ChevronEndIcon({ className = '', ...props }: IconProps) {
  return (
    <Icon className={`rtl:-scale-x-100 ${className}`} {...props}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  )
}
