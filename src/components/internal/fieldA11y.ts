import { type FieldFrameProps } from './Field'

export function getFieldDescriptionIds(
  id: string,
  {
    hint,
    description,
    helperText,
    error,
  }: Pick<FieldFrameProps, 'hint' | 'description' | 'helperText' | 'error'>,
) {
  return (
    [
      hint ? `${id}-hint` : '',
      description ? `${id}-description` : '',
      helperText ? `${id}-helper` : '',
      error ? `${id}-message` : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined
  )
}
