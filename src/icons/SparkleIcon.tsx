import { Icon, type IconProps } from './Icon'

export function SparkleIcon(props: IconProps) {
  return (
    <Icon filled {...props}>
      <path d="M12 2c.7 5.9 4.1 9.3 10 10-5.9.7-9.3 4.1-10 10-.7-5.9-4.1-9.3-10-10 5.9-.7 9.3-4.1 10-10Z" />
    </Icon>
  )
}
