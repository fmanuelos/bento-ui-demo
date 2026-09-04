import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react'
import { Button } from './Button'

export type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  returnFocusRef?: RefObject<HTMLElement | null>
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  returnFocusRef,
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = returnFocusRef?.current
      ?? document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hidden && element.getClientRects().length > 0)

      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open, onClose, returnFocusRef])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background-overlay p-lg backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="w-full max-w-content-narrow rounded-xl border border-border-secondary bg-surface-raised p-xl text-text-primary"
      >
        <header className="flex items-start justify-between gap-6">
          <div>
            <h2 id={titleId} className="text-heading-h2 font-bold tracking-heading-h2">{title}</h2>
            {description && (
              <p id={descriptionId} className="mt-sm text-body-sm leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>
          <Button
            ref={closeButtonRef}
            variant="tertiary"
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
