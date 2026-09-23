import { Icon, type IconProps } from './Icon'

export function WarningTriangleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 3 20h18L12 3Z" />
      <path d="M12 9v5m0 3v.1" />
    </Icon>
  )
}
