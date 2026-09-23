import { useState, type HTMLAttributes } from 'react'
import { UserIcon } from './icons'

export type AvatarSize = 'small' | 'medium' | 'large'
export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  name: string
  src?: string
  alt?: string
  size?: AvatarSize
  decorative?: boolean
}

const avatarSizes: Record<AvatarSize, string> = {
  small: 'size-control-height-tiny text-label-sm',
  medium: 'size-control-height-small text-label-md',
  large: 'size-control-height-large text-label-lg',
}

function initialsFor(name: string) {
  const segments = name.trim().split(/\s+/u).filter(Boolean)
  if (!segments.length) return ''
  return [segments[0], segments.length > 1 ? segments.at(-1) : undefined]
    .filter((segment): segment is string => Boolean(segment))
    .map((segment) => Array.from(segment)[0])
    .join('')
    .toLocaleUpperCase()
}

export function Avatar({
  name,
  src,
  alt,
  size = 'medium',
  decorative = false,
  className = '',
  ...props
}: AvatarProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false)
  const initials = initialsFor(name)
  const imageVisible = Boolean(src && !imageUnavailable)
  const accessible = decorative || imageVisible ? {} : { role: 'img', 'aria-label': name }

  return (
    <span
      {...accessible}
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-shape-full border border-border-secondary bg-brand-background-subtle font-semibold text-brand-foreground ${avatarSizes[size]} ${className}`}
      {...props}
    >
      {imageVisible ? (
        <img
          src={src as string}
          alt={decorative ? '' : (alt ?? name)}
          onError={() => setImageUnavailable(true)}
          className="size-full object-cover"
        />
      ) : initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <UserIcon className="size-1/2" />
      )}
    </span>
  )
}
