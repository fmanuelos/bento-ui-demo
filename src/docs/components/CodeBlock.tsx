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
    <div className="overflow-hidden rounded-shape-lg border border-border-secondary bg-background-inverse text-text-inverse">
      <div className="flex items-center justify-between gap-scale-3 border-b border-border-inverse px-scale-4 py-scale-2">
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
      <pre className="m-0 overflow-x-auto p-scale-4 font-code-md text-code-md leading-code-md font-normal tracking-code-md">
        <code className="!bg-transparent !p-0">{code}</code>
      </pre>
    </div>
  )
}
