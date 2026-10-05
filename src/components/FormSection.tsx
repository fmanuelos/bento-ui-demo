import { useId, type FieldsetHTMLAttributes, type ReactNode } from 'react'

export type FormSectionProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'title'> & {
  title: string
  description?: ReactNode
  guidance?: ReactNode
  actions?: ReactNode
  feedback?: ReactNode
  variant?: 'open' | 'contained'
}

/** One native group; never creates a form or owns submission. */
export function FormSection({
  title,
  description,
  guidance,
  actions,
  feedback,
  variant = 'open',
  children,
  id,
  className = '',
  'aria-describedby': describedBy,
  ...props
}: FormSectionProps) {
  const generatedId = useId()
  const sectionId = id ?? generatedId
  const descriptionId = `${sectionId}-description`
  return (
    <fieldset
      id={sectionId}
      aria-describedby={
        [description ? descriptionId : '', describedBy].filter(Boolean).join(' ') || undefined
      }
      className={`m-0 min-w-0 ${variant === 'contained' ? 'rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-4 sm:p-scale-6' : 'border-0 p-0'} ${className}`}
      {...props}
    >
      <legend className="max-w-full p-0 text-heading-sm font-semibold break-words text-text-primary">
        {title}
      </legend>
      <div className="mt-scale-3 grid min-w-0 gap-scale-4">
        {description && (
          <div id={descriptionId} className="text-body-sm leading-relaxed text-text-secondary">
            {description}
          </div>
        )}
        {guidance && <div>{guidance}</div>}
        {children}
        {actions && <div className="flex flex-wrap gap-scale-3">{actions}</div>}
        {feedback && <div>{feedback}</div>}
      </div>
    </fieldset>
  )
}
