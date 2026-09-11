import { type ReactNode, type RefObject } from 'react'
import { Modal } from './Modal'

export type DrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  placement?: 'start' | 'end' | 'bottom'
  modal?: boolean
  busy?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  returnFocusRef?: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
  className?: string
}

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  placement = 'end',
  modal = true,
  busy = false,
  closeOnBackdrop = true,
  closeOnEscape = true,
  returnFocusRef,
  initialFocusRef,
  className,
}: DrawerProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      footer={footer}
      modal={modal}
      busy={busy}
      closeOnBackdrop={closeOnBackdrop}
      closeOnEscape={closeOnEscape}
      returnFocusRef={returnFocusRef}
      initialFocusRef={initialFocusRef}
      presentation={
        placement === 'bottom' ? 'sheet' : placement === 'start' ? 'drawer-start' : 'drawer-end'
      }
      closeLabel="Close panel"
      className={className}
    >
      {children}
    </Modal>
  )
}
