import { type CanonicalFieldSize, type FieldSize } from './Field'

export function resolveFieldSize(size: FieldSize): CanonicalFieldSize {
  if (size === 'compact') return 'small'
  if (size === 'standard') return 'medium'
  return size
}
