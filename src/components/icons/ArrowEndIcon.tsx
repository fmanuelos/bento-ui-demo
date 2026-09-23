import { Icon, type IconProps } from './Icon'

export function ArrowEndIcon({ className = '', ...props }: IconProps) {
  return (
    <Icon className={`rtl:-scale-x-100 ${className}`} {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </Icon>
  )
}
