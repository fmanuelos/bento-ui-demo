import { useId, useRef } from 'react'
import { Button } from './Button'
import { Progress } from './Progress'
import { FieldFrame } from './internal/Field'
import type { FileConstraints, UploadItem } from './file-upload-model'

export type FileUploadProps = {
  id?: string
  label: string
  constraints: FileConstraints
  items: readonly UploadItem[]
  onSelect: (files: File[]) => void
  onUpload: (id: string) => void
  onCancel: (id: string) => void
  onRemove: (id: string) => void
  required?: boolean
  disabled?: boolean
  error?: string
  announceError?: boolean
  description?: string
}
export function FileUpload({
  id,
  label,
  constraints,
  items,
  onSelect,
  onUpload,
  onCancel,
  onRemove,
  required,
  disabled,
  error,
  announceError = true,
  description,
}: FileUploadProps) {
  const generated = useId()
  const inputId = id ?? generated
  const input = useRef<HTMLInputElement>(null)
  const feedback = items
    .map((item) => `${item.name}: ${item.status}${item.message ? `. ${item.message}` : ''}`)
    .join(' ')
  return (
    <FieldFrame
      id={inputId}
      label={label}
      required={required}
      description={`${constraints.accept.map((type) => type.extension).join(', ')}. Maximum ${constraints.maxFiles} file(s), ${constraints.maxBytes.toLocaleString()} bytes per file. ${description ?? ''}`}
      error={error}
      announceError={announceError}
    >
      <input
        ref={input}
        id={inputId}
        type="file"
        multiple={constraints.maxFiles > 1}
        accept={constraints.accept.flatMap((type) => [type.extension, type.mime]).join(',')}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={`${inputId}-description${error ? ` ${inputId}-message` : ''}`}
        className="max-w-full min-w-0 rounded-shape-md border border-border-primary bg-surface-primary p-scale-3 text-body-sm text-text-primary"
        onChange={(event) => {
          onSelect(Array.from(event.target.files ?? []))
          event.target.value = ''
        }}
      />
      <ul className="m-0 list-none space-y-scale-3 p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="space-y-scale-2 rounded-shape-md border border-border-secondary p-scale-3 text-body-sm font-normal break-words"
          >
            <p className="m-0 font-semibold">
              <bdi>{item.name}</bdi>
            </p>
            <p className="m-0">
              {item.size.toLocaleString()} bytes · {item.status}
            </p>
            {item.message && <p className="m-0">{item.message}</p>}
            {item.status === 'uploading' && (
              <Progress label={`Uploading ${item.name}`} value={item.progress} />
            )}
            <div className="flex flex-wrap gap-scale-3">
              {['selected', 'failed', 'cancelled'].includes(item.status) && (
                <Button
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    input.current?.focus()
                    onUpload(item.id)
                  }}
                  aria-label={`${item.status === 'selected' ? 'Upload' : 'Retry'} ${item.name}`}
                >
                  {item.status === 'selected' ? 'Upload' : 'Retry'}
                </Button>
              )}
              {item.status === 'uploading' && (
                <Button
                  type="button"
                  disabled={disabled}
                  variant="outline"
                  onClick={() => {
                    input.current?.focus()
                    onCancel(item.id)
                  }}
                  aria-label={`Cancel upload of ${item.name}`}
                >
                  Cancel upload
                </Button>
              )}
              <Button
                type="button"
                disabled={disabled}
                variant="outline"
                onClick={() => {
                  input.current?.focus()
                  onRemove(item.id)
                }}
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <p role="status" className="sr-only">
        {feedback || 'No files selected.'}
      </p>
    </FieldFrame>
  )
}
