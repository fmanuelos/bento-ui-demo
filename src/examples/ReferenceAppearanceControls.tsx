import { useEffect, useState } from 'react'
import { Button } from '../components'

/** Preview-only controls; restore the host document when the reference unmounts. */
export function ReferenceAppearanceControls() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark',
  )
  const [large, setLarge] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    const previous = root.getAttribute('data-theme')
    root.setAttribute('data-theme', dark ? 'dark' : 'light')
    return () => {
      if (previous === null) root.removeAttribute('data-theme')
      else root.setAttribute('data-theme', previous)
    }
  }, [dark])
  useEffect(() => {
    if (!large) return
    const root = document.documentElement
    const computed = getComputedStyle(root)
    const original = Array.from(computed)
      .filter((name) => name.startsWith('--text-') && !name.slice(7).includes('--'))
      .map(
        (name) =>
          [name, root.style.getPropertyValue(name), computed.getPropertyValue(name)] as const,
      )
    for (const [name, , value] of original) root.style.setProperty(name, `calc(${value} * 2)`)
    return () => {
      for (const [name, value] of original) {
        if (value) root.style.setProperty(name, value)
        else root.style.removeProperty(name)
      }
    }
  }, [large])
  return (
    <div className="flex flex-wrap items-end gap-scale-3">
      <Button variant="outline" aria-pressed={dark} onClick={() => setDark((value) => !value)}>
        Dark theme
      </Button>
      <Button variant="outline" aria-pressed={large} onClick={() => setLarge((value) => !value)}>
        200% text
      </Button>
    </div>
  )
}
