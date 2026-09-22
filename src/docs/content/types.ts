import { type ReactNode } from 'react'

export type PropReference = {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export type LibraryDocumentation = {
  slug: string
  title: string
  status?: 'Draft' | 'Complete'
  summary: string
  useCases: readonly string[]
  importCode: string
  basicCode: string
  example: ReactNode
  props: readonly PropReference[]
  variants: readonly string[]
  accessibility: readonly string[]
  responsive: string
  theme: string
  mistakes: readonly string[]
  related: readonly string[]
}

export type FoundationDocumentation = {
  path: string
  title: string
  summary: string
  sections: readonly { title: string; body: ReactNode }[]
}
