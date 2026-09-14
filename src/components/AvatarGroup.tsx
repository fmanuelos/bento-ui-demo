import { type HTMLAttributes } from 'react'
import { Avatar, type AvatarProps, type AvatarSize } from './Avatar'
import { Button } from './Button'
import { Popover } from './Popover'

export type AvatarGroupPerson = Pick<AvatarProps, 'name' | 'src' | 'alt'> & { id: string }
export type AvatarGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  people: readonly AvatarGroupPerson[]
  label: string
  size?: Exclude<AvatarSize, 'large'>
  maxVisible?: number
  expandable?: boolean
}

export function AvatarGroup({
  people,
  label,
  size = 'small',
  maxVisible = 3,
  expandable = false,
  className = '',
  ...props
}: AvatarGroupProps) {
  if (!people.length) return null
  const visibleCount = Math.max(1, Math.min(maxVisible, people.length))
  const visible = people.slice(0, visibleCount)
  const hiddenCount = people.length - visible.length
  const avatarSize = size === 'small' ? 'size-control-height-tiny' : 'size-control-height-small'
  const summary = `${label}: ${people.map((person) => person.name).join(', ')}`

  const overflow = (
    <Button
      variant="secondary"
      size={size === 'small' ? 'tiny' : 'small'}
      iconOnly
      aria-label={`Show ${hiddenCount} more ${hiddenCount === 1 ? 'person' : 'people'}`}
      className={`rounded-shape-full ${avatarSize}`}
    >
      +{hiddenCount}
    </Button>
  )

  return (
    <div
      className={`inline-flex items-center ${className}`}
      role="group"
      aria-label={summary}
      {...props}
    >
      <ul className="m-0 flex list-none p-0" aria-hidden="true">
        {visible.map((person, index) => (
          <li key={person.id} className={index === 0 ? '' : '-ml-space-2'}>
            <Avatar {...person} size={size} decorative className="ring-2 ring-surface-primary" />
          </li>
        ))}
      </ul>
      {hiddenCount > 0 &&
        (expandable ? (
          <Popover trigger={overflow} title={label} initialFocus="first" placement="bottom-end">
            <ul className="m-0 grid list-none gap-space-3 p-0">
              {people.map((person) => (
                <li key={person.id} className="flex items-center gap-space-3 text-body-sm">
                  <Avatar {...person} size="small" decorative />
                  <span>{person.name}</span>
                </li>
              ))}
            </ul>
          </Popover>
        ) : (
          <span
            className={`-ml-space-2 grid place-items-center rounded-shape-full border border-border-secondary bg-background-tertiary font-semibold text-text-secondary ring-2 ring-surface-primary ${avatarSize}`}
            aria-hidden="true"
          >
            +{hiddenCount}
          </span>
        ))}
    </div>
  )
}
