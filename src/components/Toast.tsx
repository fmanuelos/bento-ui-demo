import { useEffect, useState, type ReactNode } from 'react'
import { Alert, type AlertVariant } from './Alert'
import { Progress } from './Progress'

export type ToastMessage = {
  id: string
  title: ReactNode
  description?: ReactNode
  variant?: AlertVariant
  action?: ReactNode
  duration?: number | null
  urgent?: boolean
  progress?: number
  progressLabel?: string
}

export type ToastRegionProps = {
  toasts: readonly ToastMessage[]
  onDismiss: (id: string) => void
  maxVisible?: number
  label?: string
  position?: 'viewport' | 'container'
  className?: string
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: () => void }) {
  const [paused, setPaused] = useState(false)
  const persistent = toast.duration === null || Boolean(toast.action)
  const duration = toast.duration ?? 6000

  useEffect(() => {
    if (persistent || paused) return
    const timeout = window.setTimeout(onDismiss, duration)
    return () => window.clearTimeout(timeout)
  }, [duration, onDismiss, paused, persistent])

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <Alert
        title={toast.title}
        variant={toast.variant}
        action={toast.action}
        urgent={toast.urgent}
        dismissible
        onDismiss={onDismiss}
        className="shadow-lg"
      >
        {toast.description}
        {toast.progress !== undefined && (
          <Progress
            label={toast.progressLabel ?? 'Progress'}
            value={toast.progress}
            className="mt-scale-3"
          />
        )}
      </Alert>
    </div>
  )
}

export function ToastRegion({
  toasts,
  onDismiss,
  maxVisible = 3,
  label = 'Notifications',
  position = 'viewport',
  className = '',
}: ToastRegionProps) {
  const visible = toasts.slice(0, Math.max(1, maxVisible))
  return (
    <section
      aria-label={label}
      className={[
        position === 'viewport'
          ? 'fixed right-page-padding-mobile bottom-page-padding-mobile sm:right-page-padding-tablet sm:bottom-page-padding-tablet'
          : 'absolute inset-x-page-padding-mobile bottom-page-padding-mobile sm:inset-x-auto sm:right-page-padding-tablet sm:bottom-page-padding-tablet',
        'z-50 grid w-[min(26rem,calc(100vw-var(--spacing-page-padding-mobile)*2))] gap-scale-3',
        className,
      ].join(' ')}
    >
      {visible.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </section>
  )
}
