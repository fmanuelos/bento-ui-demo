import { useState } from 'react'
import { Button } from '../../components'

export type CodeBlockProps = { code: string; label?: string }

export function CodeBlock({ code, label = 'Example code' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-secondary bg-background-inverse text-text-inverse">
      <div className="flex items-center justify-between gap-md border-b border-border-inverse px-lg py-sm">
        <span className="text-label-sm font-semibold text-navigation-sidebar-foreground">
          {label}
        </span>
        <Button
          variant="ghost"
          size="tiny"
          className="text-text-inverse hover:bg-navigation-sidebar-item-hover"
          onClick={() => void copy()}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="m-0 overflow-x-auto p-lg text-body-sm leading-relaxed">
        <code className="!bg-transparent !p-0">{code}</code>
      </pre>
    </div>
  )
}
