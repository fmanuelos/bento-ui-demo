import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { Button, Link } from '../../components'
import { contractLink, loadContract } from '../content/contracts'

function inline(text: string, sourcePath: string): ReactNode {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link)
      return (
        <Link key={index} href={contractLink(link[2], sourcePath)}>
          {link[1].replace(/`/g, '')}
        </Link>
      )
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return (
        <code key={index} className="break-words">
          {part.slice(1, -1)}
        </code>
      )
    return part
  })
}

/** Renders the headings, prose and lists used by our authored block/template contracts. */
export function ContractContent({ source, sourcePath }: { source: string; sourcePath: string }) {
  const chunks = source
    .replace(/^# .+\n/, '')
    .trim()
    .split(/\n\s*\n/)
  return (
    <div className="space-y-scale-5 text-body-md leading-relaxed text-text-secondary">
      {chunks.map((chunk, index) => {
        const heading = chunk.match(/^(#{2,3}) (.+)$/)
        if (heading) {
          const id = heading[2]
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s-]/gu, '')
            .replace(/\s/g, '-')
          const Heading = heading[1].length === 2 ? 'h2' : 'h3'
          return (
            <Heading
              id={`contract-${id}`}
              key={index}
              className="mb-scale-3 scroll-mt-section-desktop text-heading-sm font-semibold text-text-primary"
            >
              {heading[2]}
            </Heading>
          )
        }
        if (/^(?:\d+\. |- )/.test(chunk)) {
          const ordered = /^\d+\./.test(chunk)
          const List = ordered ? 'ol' : 'ul'
          const items = chunk.split(/\n(?=(?:\d+\. |- ))/)
          return (
            <List
              key={index}
              className={`space-y-scale-2 ps-scale-6 ${ordered ? 'list-decimal' : 'list-disc'}`}
            >
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {inline(item.replace(/^(?:\d+\. |- )/, '').replace(/\n\s*/g, ' '), sourcePath)}
                </li>
              ))}
            </List>
          )
        }
        return (
          <Fragment key={index}>
            <p className="m-0">{inline(chunk.replace(/\n/g, ' '), sourcePath)}</p>
          </Fragment>
        )
      })}
    </div>
  )
}

export function ContractLoader({ sourcePath }: { sourcePath: string }) {
  const [source, setSource] = useState<string>()
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let current = true
    loadContract(sourcePath).then(
      (value) => {
        if (current) setSource(value)
      },
      () => {
        if (current) setFailed(true)
      },
    )
    return () => {
      current = false
    }
  }, [sourcePath, attempt])
  if (source) return <ContractContent source={source} sourcePath={sourcePath} />
  if (failed)
    return (
      <div role="status">
        <p>The contract could not be loaded.</p>
        <Button
          variant="outline"
          onClick={() => {
            setFailed(false)
            setAttempt((value) => value + 1)
          }}
        >
          Retry loading contract
        </Button>
      </div>
    )
  return <p role="status">Loading contract…</p>
}
