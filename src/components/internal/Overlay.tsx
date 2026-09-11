import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type Ref,
} from 'react'
import { createPortal } from 'react-dom'

export type OverlayPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value)
  else if (ref) ref.current = value
}

export type OverlaySurfaceProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean
  anchorRef: React.RefObject<HTMLElement | null>
  onDismiss: () => void
  placement?: OverlayPlacement
  offset?: number
  restoreFocus?: boolean
  dismissOnOutsideActivation?: boolean
  surface?: 'raised' | 'inverse'
}

export const OverlaySurface = forwardRef<HTMLDivElement, OverlaySurfaceProps>(
  function OverlaySurface(
    {
      open,
      anchorRef,
      onDismiss,
      placement = 'bottom-start',
      offset = 4,
      restoreFocus = false,
      dismissOnOutsideActivation = true,
      surface = 'raised',
      className = '',
      style,
      children,
      ...props
    },
    forwardedRef,
  ) {
    const surfaceRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<CSSProperties>({ visibility: 'hidden' })

    const dismiss = () => {
      onDismiss()
      if (restoreFocus) {
        queueMicrotask(() => {
          const anchor = anchorRef.current
          const focusTarget = anchor?.matches(
            'button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
          )
            ? anchor
            : anchor?.querySelector<HTMLElement>(
                'button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
              )
          focusTarget?.focus()
        })
      }
    }

    useLayoutEffect(() => {
      if (!open) return
      const update = () => {
        const anchor = anchorRef.current
        const surface = surfaceRef.current
        if (!anchor || !surface) return
        const anchorRect = anchor.getBoundingClientRect()
        const surfaceRect = surface.getBoundingClientRect()
        const viewportPadding = 8
        const prefersTop = placement.startsWith('top')
        const alignsEnd = placement.endsWith('end')
        const spaceBelow = window.innerHeight - anchorRect.bottom
        const spaceAbove = anchorRect.top
        const useTop = prefersTop
          ? spaceAbove >= surfaceRect.height + offset || spaceAbove > spaceBelow
          : !(spaceBelow >= surfaceRect.height + offset || spaceBelow >= spaceAbove)
        const desiredTop = useTop
          ? anchorRect.top - surfaceRect.height - offset
          : anchorRect.bottom + offset
        const desiredLeft = alignsEnd ? anchorRect.right - surfaceRect.width : anchorRect.left
        setPosition({
          position: 'fixed',
          top: Math.max(
            viewportPadding,
            Math.min(desiredTop, window.innerHeight - surfaceRect.height - viewportPadding),
          ),
          left: Math.max(
            viewportPadding,
            Math.min(desiredLeft, window.innerWidth - surfaceRect.width - viewportPadding),
          ),
          maxHeight: `calc(100dvh - ${viewportPadding * 2}px)`,
          visibility: 'visible',
        })
      }
      update()
      window.addEventListener('resize', update)
      document.addEventListener('scroll', update, true)
      return () => {
        window.removeEventListener('resize', update)
        document.removeEventListener('scroll', update, true)
      }
    }, [anchorRef, offset, open, placement])

    useEffect(() => {
      if (!open) return
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return
        event.preventDefault()
        event.stopPropagation()
        dismiss()
      }
      const handlePointerUp = (event: PointerEvent) => {
        if (!dismissOnOutsideActivation) return
        const target = event.target as Node
        if (!anchorRef.current?.contains(target) && !surfaceRef.current?.contains(target)) dismiss()
      }
      document.addEventListener('keydown', handleKeyDown, true)
      document.addEventListener('pointerup', handlePointerUp)
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true)
        document.removeEventListener('pointerup', handlePointerUp)
      }
    })

    if (!open) return null

    return createPortal(
      <div
        ref={(element) => {
          surfaceRef.current = element
          assignRef(forwardedRef, element)
        }}
        className={`z-40 overflow-y-auto rounded-shape-md border p-space-2 shadow-lg ${surface === 'inverse' ? 'border-border-inverse bg-surface-inverse text-text-inverse' : 'border-border-secondary bg-surface-raised text-text-primary'} ${className}`}
        style={{ ...position, ...style }}
        {...props}
      >
        {children}
      </div>,
      document.body,
    )
  },
)
