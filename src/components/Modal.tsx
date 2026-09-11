import {
  useEffect,
  useId,
  useRef,
  type AriaRole,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'
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
  modal?: boolean
  role?: Extract<AriaRole, 'dialog' | 'alertdialog'>
  showCloseButton?: boolean
  closeLabel?: string
  presentation?: 'center' | 'drawer-start' | 'drawer-end' | 'sheet'
  className?: string
}

const presentationClasses = {
  center:
    'm-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-container-narrow rounded-shape-xl',
  'drawer-start':
    'fixed inset-y-0 left-0 m-0 h-dvh max-h-dvh w-[90vw] max-w-container-readable rounded-r-shape-xl',
  'drawer-end':
    'fixed inset-y-0 right-0 m-0 h-dvh max-h-dvh w-[90vw] max-w-container-readable rounded-l-shape-xl',
  sheet:
    'fixed inset-x-0 bottom-0 m-0 max-h-[85dvh] w-full max-w-none rounded-t-shape-xl pb-[max(var(--spacing-space-6),env(safe-area-inset-bottom))]',
} as const

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
  modal = true,
  role = 'dialog',
  showCloseButton = true,
  closeLabel = 'Close dialog',
  presentation = 'center',
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
    if (modal) document.body.style.overflow = 'hidden'
    if (!dialog.open) {
      if (modal) dialog.showModal()
      else dialog.show()
    }
    queueMicrotask(() =>
      (
        initialFocusRef?.current ??
        dialog.querySelector<HTMLElement>('[autofocus]') ??
        closeButtonRef.current ??
        dialog
      ).focus(),
    )

    return () => {
      if (modal) document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      returnFocusElement?.focus()
    }
  }, [initialFocusRef, modal, open, returnFocusRef])

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
      role={role}
      aria-modal={modal || undefined}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-busy={busy || undefined}
      onCancel={(event) => {
        event.preventDefault()
        if (closeOnEscape && !busy) onClose()
      }}
      onMouseDown={handleBackdrop}
      className={`overflow-y-auto border border-border-secondary bg-surface-raised p-space-6 text-text-primary backdrop:bg-background-overlay backdrop:backdrop-blur-[2px] ${presentationClasses[presentation]} ${className}`}
    >
      <header className="flex items-start justify-between gap-space-6">
        <div>
          <h2
            id={titleId}
            className="m-0 font-heading-md text-heading-md leading-heading-md font-semibold tracking-heading-md"
          >
            {title}
          </h2>
          {description && (
            <p
              id={descriptionId}
              className="mt-space-2 mb-0 text-body-sm leading-relaxed text-text-secondary"
            >
              {description}
            </p>
          )}
        </div>
        {showCloseButton && (
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="medium"
            iconOnly
            aria-label={closeLabel}
            onClick={onClose}
            disabled={busy}
            className="-mt-space-2 -mr-space-2"
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
        )}
      </header>
      <div className="mt-space-6">{children}</div>
      {footer && (
        <footer className="mt-space-6 flex flex-wrap justify-end gap-space-3">{footer}</footer>
      )}
    </dialog>
  )
}
