import {
  CompletionSummary,
  FormSection,
  Input,
  Link,
  PageHeader,
  SectionHeader,
} from '../../components'
import { type LibraryDocumentation } from './types'

const shared = {
  status: 'Draft' as const,
  variants: [
    'Optional regions are omitted without empty wrappers. The consumer chooses the heading level and owns task state.',
  ],
  accessibility: [
    'Native headings, labels, legends, and description lists preserve relationships.',
    'No automatic focus movement or live announcement; the consuming workflow owns both.',
  ],
  responsive:
    'Content wraps in source order, using the containing mode’s width and spacing. No fixed height or truncated headings.',
  theme: 'Uses existing semantic surface, text, border, and focus tokens in both themes.',
  mistakes: ['Do not treat a block as a complete page template or authentication state machine.'],
  related: ['input', 'alert', 'button', 'link'],
}
export const focusedBlockDocs: readonly LibraryDocumentation[] = [
  {
    ...shared,
    slug: 'page-header',
    title: 'Page Header',
    summary: 'Stable page identity, context, description, metadata, and scoped actions.',
    useCases: ['A public content page, workspace record, or Focused Flow task.'],
    importCode: "import { PageHeader } from '@/components'",
    basicCode: '<PageHeader title="Sign in" description="Use your account details to continue." />',
    example: (
      <PageHeader
        headingLevel={3}
        title="Sign in"
        description="Use your account details to continue."
      />
    ),
    props: [
      { name: 'title', type: 'string', description: 'Required page heading.' },
      {
        name: 'headingLevel',
        type: '1 | 2 | 3 | 4 | 5 | 6',
        defaultValue: '1',
        description: 'Matches the containing document outline.',
      },
      {
        name: 'context / description / metadata / actions',
        type: 'ReactNode',
        description: 'Optional regions in meaningful source order.',
      },
      {
        name: 'headingRef / headingTabIndex',
        type: 'Ref<HTMLHeadingElement> / number',
        description: 'Allows the workflow to manage a deliberate focus transition.',
      },
    ],
  },
  {
    ...shared,
    slug: 'section-header',
    title: 'Section Header',
    summary: 'Names a local region and its supporting context or actions.',
    useCases: ['A named guidance section, results region, or public content section.'],
    importCode: "import { SectionHeader } from '@/components'",
    basicCode:
      '<section aria-labelledby="next"><SectionHeader headingId="next" title="What happens next" description="Verify your email to finish setup." /></section>',
    example: (
      <section aria-labelledby="section-example">
        <SectionHeader
          headingLevel={3}
          headingId="section-example"
          title="What happens next"
          description="Verify your email to finish setup."
        />
      </section>
    ),
    props: [
      {
        name: 'title / headingId / headingLevel',
        type: 'string / string / HeadingLevel',
        description: 'Names the following section at the correct level; default level is 2.',
      },
      {
        name: 'description / eyebrow / metadata / actions',
        type: 'ReactNode',
        description: 'Optional section context and scoped actions.',
      },
      {
        name: 'layout',
        type: 'stacked | inline | centered',
        defaultValue: 'stacked',
        description: 'Presentation; inline wraps while preserving text-before-actions order.',
      },
    ],
  },
  {
    ...shared,
    slug: 'form-section',
    title: 'Form Section',
    summary: 'Groups related controls with a native legend and optional guidance.',
    useCases: ['Account credentials or a meaningful group in a larger form.'],
    importCode: "import { FormSection, Input } from '@/components'",
    basicCode:
      '<FormSection title="Account details"><Input label="Email address" type="email" autoComplete="username" /></FormSection>',
    example: (
      <FormSection title="Account details" description="Use sample details for this example.">
        <Input label="Email address" type="email" autoComplete="username" />
        <Input label="Password" type="password" autoComplete="new-password" />
      </FormSection>
    ),
    props: [
      {
        name: 'title / children',
        type: 'string / ReactNode',
        description: 'Required legend and the independently labelled controls.',
      },
      {
        name: 'description / guidance / actions / feedback',
        type: 'ReactNode',
        description: 'Optional regions; actions must remain local to this group.',
      },
      {
        name: 'variant',
        type: 'open | contained',
        defaultValue: 'open',
        description:
          'A boundary is optional. Consumers compose repeated groups with stable identities.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Native fieldset behavior, including disabled descendants.',
      },
    ],
  },
  {
    ...shared,
    slug: 'completion-summary',
    title: 'Completion Summary',
    summary: 'Explains a confirmed outcome, reference details, and useful next steps.',
    useCases: ['Registration completion, application receipts, or terminal import results.'],
    importCode: "import { CompletionSummary } from '@/components'",
    basicCode:
      '<CompletionSummary title="Application received" description="Your application is awaiting review." nextSteps="We will contact you after review." />',
    example: (
      <CompletionSummary
        headingLevel={3}
        title="Application received"
        description="Your application is awaiting review."
        details={[{ id: 'ref', label: 'Reference', value: 'EXAMPLE-104' }]}
        nextSteps="Keep this reference for your records."
        actions={<Link href="/docs/templates/registration">Read the registration template</Link>}
      />
    ),
    props: [
      {
        name: 'title / description',
        type: 'string / ReactNode',
        description: 'Required confirmed outcome and exact completed scope.',
      },
      {
        name: 'details',
        type: 'readonly { id: string; label: string; value: ReactNode }[]',
        description: 'Optional labelled result details with stable identifiers.',
      },
      {
        name: 'nextSteps / actions',
        type: 'ReactNode',
        description: 'Expectations and useful continuation; neither implies further completion.',
      },
      {
        name: 'headingLevel / headingRef / headingTabIndex',
        type: 'HeadingLevel / Ref<HTMLHeadingElement> / number',
        description:
          'Defaults to level 2; the workflow may focus the heading after confirmed completion.',
      },
    ],
  },
]
