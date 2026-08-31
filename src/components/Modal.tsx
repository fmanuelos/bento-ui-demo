import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Button } from './Button'

export type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-primary/65 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="w-full max-w-[480px] rounded-lg border border-line bg-surface p-6 text-primary shadow-2xl dark:border-dark-line dark:bg-dark-surface dark:text-white"
      >
        <header className="flex items-start justify-between gap-6">
          <div>
            <h2 id={titleId} className="font-display text-3xl tracking-display">{title}</h2>
            {description && (
              <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-muted dark:text-dark-muted">
                {description}
              </p>
            )}
          </div>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            aria-label="Close modal"
            onClick={onClose}
            className="-mr-2 -mt-2"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </Button>
        </header>
        <div className="mt-6">{children}</div>
        {footer && <footer className="mt-7 flex justify-end gap-3">{footer}</footer>}
      </section>
    </div>
  )
}
