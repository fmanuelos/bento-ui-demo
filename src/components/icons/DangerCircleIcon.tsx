import { Icon, type IconProps } from './Icon'

export function DangerCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6m0-6-6 6" />
    </Icon>
  )
}
