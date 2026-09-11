import { useEffect, useId, useRef, useState, type ReactElement } from 'react'
import { OverlaySurface, type OverlayPlacement } from './internal/Overlay'

export type TooltipProps = {
  content: string
  children: ReactElement
  placement?: OverlayPlacement
  delay?: number
}

export function Tooltip({ content, children, placement = 'top-start', delay = 400 }: TooltipProps) {
  const id = useId()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
  }
  const showWithDelay = () => {
    clearTimer()
    timerRef.current = setTimeout(() => setOpen(true), delay)
  }
  const hide = () => {
    clearTimer()
    setOpen(false)
  }

  useEffect(() => clearTimer, [])

  useEffect(() => {
    if (!open) return
    const target = anchorRef.current?.firstElementChild as HTMLElement | null
    if (!target) return
    const previous = target.getAttribute('aria-describedby')
    target.setAttribute('aria-describedby', [previous, id].filter(Boolean).join(' '))
    return () => {
      if (previous) target.setAttribute('aria-describedby', previous)
      else target.removeAttribute('aria-describedby')
    }
  }, [id, open])

  return (
    <span
      ref={anchorRef}
      className="inline-flex"
      onPointerEnter={showWithDelay}
      onPointerLeave={hide}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) hide()
      }}
    >
      {children}
      <OverlaySurface
        id={id}
        role="tooltip"
        open={open}
        anchorRef={anchorRef}
        onDismiss={hide}
        placement={placement}
        dismissOnOutsideActivation={false}
        surface="inverse"
        className="pointer-events-none max-w-64 px-space-2 py-space-1 text-label-sm"
      >
        {content}
      </OverlaySurface>
    </span>
  )
}
