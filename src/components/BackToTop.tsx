import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { linkStyles } from './interactiveStyles'

export type BackToTopProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
  targetId: string
  label?: string
  revealOffset?: number
}

export function BackToTop({
  targetId,
  label = 'Back to top',
  revealOffset = 320,
  className = '',
  onClick,
  tabIndex,
  inert,
  'aria-hidden': ariaHidden,
  ...props
}: BackToTopProps) {
  const [visible, setVisible] = useState(false)
  const href = `#${encodeURIComponent(targetId)}`

  useEffect(() => {
    const offset = Number.isFinite(revealOffset) ? Math.max(0, revealOffset) : 320
    let animationFrame = 0

    const updateVisibility = () => {
      animationFrame = 0
      const documentElement = document.documentElement
      const scrollTop = window.scrollY || documentElement.scrollTop
      const scrollableDistance = documentElement.scrollHeight - window.innerHeight
      const remainingDistance = Math.max(0, scrollableDistance - scrollTop)

      setVisible(scrollableDistance > 200 && scrollTop >= 200 && remainingDistance <= offset)
    }

    const scheduleUpdate = () => {
      if (animationFrame) return
      animationFrame = requestAnimationFrame(updateVisibility)
    }

    updateVisibility()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(scheduleUpdate) : undefined
    resizeObserver?.observe(document.body)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      resizeObserver?.disconnect()
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [revealOffset])

  const moveFocusToTarget = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    const target = document.getElementById(targetId)
    if (!target) return

    if (!target.hasAttribute('tabindex')) target.tabIndex = -1
    requestAnimationFrame(() => target.focus({ preventScroll: true }))
  }

  return (
    <a
      href={href}
      onClick={moveFocusToTarget}
      tabIndex={visible ? tabIndex : -1}
      aria-hidden={visible ? ariaHidden : true}
      inert={visible ? inert : true}
      className={linkStyles({
        variant: 'navigation',
        className: [
          'fixed z-20 inline-flex min-h-control-height-medium items-center gap-scale-2 rounded-shape-md border border-border-secondary bg-surface-raised px-scale-3 text-label-md font-semibold text-text-link shadow-lg',
          '[inset-block-end:calc(env(safe-area-inset-bottom,0px)+var(--spacing-page-padding-mobile))]',
          '[inset-inline-end:calc(max(env(safe-area-inset-left,0px),env(safe-area-inset-right,0px))+var(--spacing-page-padding-mobile))]',
          'transition-[opacity,transform,visibility] duration-200 ease-out hover:text-action-link-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid active:text-action-link-active',
          'sm:[inset-block-end:calc(env(safe-area-inset-bottom,0px)+var(--spacing-page-padding-tablet))]',
          'sm:[inset-inline-end:calc(max(env(safe-area-inset-left,0px),env(safe-area-inset-right,0px))+var(--spacing-page-padding-tablet))]',
          'lg:[inset-block-end:calc(env(safe-area-inset-bottom,0px)+var(--spacing-page-padding-desktop))]',
          'lg:[inset-inline-end:calc(max(env(safe-area-inset-left,0px),env(safe-area-inset-right,0px))+var(--spacing-page-padding-desktop))]',
          'motion-reduce:transform-none motion-reduce:transition-none',
          visible
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible translate-y-scale-2 opacity-0',
          className,
        ].join(' '),
      })}
      {...props}
    >
      <svg
        className="size-4 shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m4 7 4-4 4 4M8 3v10" />
      </svg>
      <span>{label}</span>
    </a>
  )
}
