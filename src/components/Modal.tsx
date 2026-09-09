import { useEffect, useId, useRef, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { Button } from './Button'

export type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  returnFocusRef?: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  busy?: boolean
  className?: string
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  returnFocusRef,
  initialFocusRef,
  closeOnBackdrop = true,
  closeOnEscape = true,
  busy = false,
  className = '',
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !open) return
    const returnFocusElement =
      returnFocusRef?.current ?? (document.activeElement as HTMLElement | null)
    previousFocusRef.current = returnFocusElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    queueMicrotask(() =>
      (
        initialFocusRef?.current ??
        dialog.querySelector<HTMLElement>('[autofocus]') ??
        closeButtonRef.current ??
        dialog
      ).focus(),
    )

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      returnFocusElement?.focus()
    }
  }, [initialFocusRef, open, returnFocusRef])

  if (!open) return null

  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdrop || busy) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    if (outside) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-busy={busy || undefined}
      onCancel={(event) => {
        event.preventDefault()
        if (closeOnEscape && !busy) onClose()
      }}
      onMouseDown={handleBackdrop}
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-content-narrow overflow-y-auto rounded-xl border border-border-secondary bg-surface-raised p-xl text-text-primary backdrop:bg-background-overlay backdrop:backdrop-blur-[2px] ${className}`}
    >
      <header className="flex items-start justify-between gap-xl">
        <div>
          <h2 id={titleId} className="m-0 text-heading-h2 font-bold tracking-heading-h2">
            {title}
          </h2>
          {description && (
            <p
              id={descriptionId}
              className="mt-sm mb-0 text-body-sm leading-relaxed text-text-secondary"
            >
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
          disabled={busy}
          className="-mt-sm -mr-sm"
        >
          <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m5 5 10 10M15 5 5 15" />
          </svg>
        </Button>
      </header>
      <div className="mt-xl">{children}</div>
      {footer && <footer className="mt-xl flex flex-wrap justify-end gap-md">{footer}</footer>}
    </dialog>
  )
}
