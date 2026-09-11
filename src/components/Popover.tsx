import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { Button } from './Button'
import { OverlaySurface, type OverlayPlacement } from './internal/Overlay'

type PopoverTriggerProps = HTMLAttributes<HTMLElement> & {
  'aria-expanded'?: boolean
  'aria-controls'?: string
}

export type PopoverProps = {
  trigger: ReactElement<PopoverTriggerProps>
  children: ReactNode
  title?: ReactNode
  description?: ReactNode
  placement?: OverlayPlacement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  initialFocus?: 'trigger' | 'first'
  showCloseButton?: boolean
  className?: string
}

export function Popover({
  trigger,
  children,
  title,
  description,
  placement = 'bottom-start',
  open,
  defaultOpen = false,
  onOpenChange,
  initialFocus = 'trigger',
  showCloseButton = false,
  className = '',
}: PopoverProps) {
  const id = useId()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const expanded = open ?? internalOpen
  const setExpanded = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!expanded || initialFocus !== 'first') return
    queueMicrotask(() =>
      surfaceRef.current
        ?.querySelector<HTMLElement>(
          'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        )
        ?.focus(),
    )
  }, [expanded, initialFocus])

  const renderedTrigger = cloneElement(trigger, {
    'aria-expanded': expanded,
    'aria-controls': id,
    onClick: (event: MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event)
      if (!event.defaultPrevented) setExpanded(!expanded)
    },
  })

  return (
    <span ref={anchorRef} className="inline-flex">
      {renderedTrigger}
      <OverlaySurface
        ref={surfaceRef}
        id={id}
        open={expanded}
        anchorRef={anchorRef}
        onDismiss={() => setExpanded(false)}
        placement={placement}
        restoreFocus={initialFocus === 'first'}
        className={`w-max max-w-[min(24rem,calc(100vw-1rem))] p-space-4 ${className}`}
        aria-busy={undefined}
      >
        {(title || description || showCloseButton) && (
          <header className="mb-space-3 flex items-start gap-space-4">
            <div className="min-w-0 flex-1">
              {title && <h3 className="m-0 text-heading-sm font-semibold">{title}</h3>}
              {description && (
                <div className="mt-space-1 text-body-sm text-text-secondary">{description}</div>
              )}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="tiny"
                iconOnly
                aria-label="Close popover"
                onClick={() => {
                  setExpanded(false)
                  queueMicrotask(() => anchorRef.current?.querySelector<HTMLElement>('*')?.focus())
                }}
              >
                <span aria-hidden="true">×</span>
              </Button>
            )}
          </header>
        )}
        {children}
      </OverlaySurface>
    </span>
  )
}
