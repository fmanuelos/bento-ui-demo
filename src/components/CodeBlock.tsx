import { useEffect, useId, useRef, useState } from 'react'
import { Button } from './Button'

export type CodeBlockProps = {
  code: string
  label?: string
  language?: string
  wrap?: boolean
  copyText?: (text: string) => Promise<void>
}
export function CodeBlock({
  code,
  label = 'Example code',
  language = 'Plain text',
  wrap = false,
  copyText,
}: CodeBlockProps) {
  const id = useId()
  const [feedback, setFeedback] = useState<{
    code: string
    writer: typeof copyText
    status: 'copying' | 'copied' | 'failed'
  } | null>(null)
  const generation = useRef(0)
  const lifecycle = useRef({ active: true })
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const busy = useRef(false)
  useEffect(() => {
    const scope = { active: true }
    lifecycle.current = scope
    busy.current = false
    return () => {
      scope.active = false
      clearTimeout(timer.current)
    }
  }, [code, copyText])
  const status =
    feedback?.code === code && feedback.writer === copyText ? feedback.status : undefined
  async function copy() {
    if (busy.current) return
    busy.current = true
    const request = ++generation.current
    const scope = lifecycle.current
    clearTimeout(timer.current)
    setFeedback({ code, writer: copyText, status: 'copying' })
    try {
      if (copyText) await copyText(code)
      else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code)
      else throw new Error('Clipboard unavailable')
      if (!scope.active || request !== generation.current) return
      setFeedback({ code, writer: copyText, status: 'copied' })
      timer.current = setTimeout(() => setFeedback(null), 2500)
    } catch {
      if (scope.active && request === generation.current)
        setFeedback({ code, writer: copyText, status: 'failed' })
    } finally {
      if (scope.active && request === generation.current) busy.current = false
    }
  }
  return (
    <section
      aria-labelledby={`${id}-label`}
      className="min-w-0 overflow-hidden rounded-shape-lg border border-border-secondary bg-surface-secondary text-text-primary"
    >
      <div className="flex flex-wrap items-center justify-between gap-scale-3 border-b border-border-secondary p-scale-3">
        <span id={`${id}-label`} className="text-label-sm font-semibold break-words">
          {label} · {language}
        </span>
        <Button
          type="button"
          variant="outline"
          aria-disabled={status === 'copying'}
          aria-busy={status === 'copying'}
          aria-label={`Copy ${label}`}
          onClick={() => void copy()}
        >
          Copy
        </Button>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${label} code, ${language}`}
        dir="ltr"
        className={`m-0 max-w-full overflow-x-auto p-scale-4 font-code-md text-code-md leading-code-md ${wrap ? 'break-words whitespace-pre-wrap' : 'whitespace-pre'}`}
      >
        <code className="!bg-transparent !p-0">{code}</code>
      </pre>
      <p role="status" className="m-0 px-scale-3 pb-scale-3 text-body-sm">
        {status === 'copying'
          ? 'Copying…'
          : status === 'copied'
            ? 'Copied.'
            : status === 'failed'
              ? 'Copy unavailable. Select the code and copy it manually.'
              : ''}
      </p>
    </section>
  )
}
