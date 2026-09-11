import { useRef, useState, type ReactNode, type RefObject } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Modal } from './Modal'

export type AlertDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
  destructive?: boolean
  busy?: boolean
  error?: ReactNode
  children?: ReactNode
  confirmationPhrase?: string
  returnFocusRef?: RefObject<HTMLElement | null>
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  destructive = true,
  busy = false,
  error,
  children,
  confirmationPhrase,
  returnFocusRef,
}: AlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [confirmation, setConfirmation] = useState('')
  const confirmed = !confirmationPhrase || confirmation === confirmationPhrase

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      role="alertdialog"
      initialFocusRef={cancelRef}
      returnFocusRef={returnFocusRef}
      closeOnBackdrop={false}
      closeOnEscape={!busy}
      showCloseButton={false}
      busy={busy}
      footer={
        <>
          <Button ref={cancelRef} variant="outline" onClick={onClose} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? 'destructive' : 'primary'}
            onClick={onConfirm}
            loading={busy}
            disabled={!confirmed}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="grid gap-space-4">
        {children}
        {confirmationPhrase && (
          <Input
            label={`Type “${confirmationPhrase}” to confirm`}
            value={confirmation}
            onChange={(event) => setConfirmation(event.currentTarget.value)}
            autoComplete="off"
            disabled={busy}
          />
        )}
        {error && (
          <div
            role="alert"
            className="rounded-shape-md border border-feedback-danger-border bg-feedback-danger-background p-space-3 text-body-sm text-feedback-danger-foreground"
          >
            {error}
          </div>
        )}
      </div>
    </Modal>
  )
}
