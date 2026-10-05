import {
  CompletionSummary,
  OrderSummary,
  ActivityHistory,
  ContentsNavigation,
  ServiceStatusSummary,
  FlowStepNavigation,
  ReviewSummary,
  PlanComparison,
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
    slug: 'order-summary',
    title: 'Order Summary',
    summary: 'An order’s items, quantities, adjustments, current total, and recurring commitments.',
    useCases: ['One-time digital purchases and recurring service checkout.'],
    importCode: "import { OrderSummary } from '@/components'",
    basicCode:
      '<OrderSummary title="Order summary" currency="USD" availability="unavailable" notice="Quote unavailable." items={[]} charges={[]} total={{ label: "Total due", amount: "Unknown" }} />',
    example: (
      <OrderSummary
        headingLevel={3}
        title="Digital order"
        currency="USD"
        availability="current"
        notice="Fictional quote for documentation only."
        items={[
          {
            id: 'library',
            name: 'Publishing library',
            quantity: '1 license',
            unitPrice: '$24.00',
            lineTotal: '$24.00',
          },
          {
            id: 'guide',
            name: 'Editorial guide',
            quantity: '1 license',
            unitPrice: '$10.00',
            lineTotal: '$10.00',
          },
        ]}
        charges={[
          { id: 'subtotal', label: 'Subtotal', amount: '$34.00' },
          { id: 'discount', label: 'Discount', amount: '$0.00' },
          { id: 'tax', label: 'Illustrative tax', amount: '$3.40' },
          { id: 'shipping', label: 'Shipping (digital delivery)', amount: '$0.00' },
        ]}
        total={{ label: 'Total due', amount: '$37.40' }}
        recurring={<p>One-time payment. No recurring charge.</p>}
      />
    ),
    props: [
      {
        name: 'title / headingLevel',
        type: 'string / HeadingLevel',
        description: 'Summary identity and native heading level (default 2).',
      },
      {
        name: 'currency / availability / notice',
        type: 'string / current | stale | unavailable / string',
        description:
          'Explicit currency, quote availability, and freshness or captured-order context. Unavailable and empty orders hide monetary totals.',
      },
      {
        name: 'items',
        type: 'readonly { id; name; quantity; unitPrice; lineTotal }[]',
        description:
          'Named order items with preformatted quantity and monetary strings. The consumer owns formatting and arithmetic.',
      },
      {
        name: 'charges / total',
        type: 'readonly { id; label; amount }[] / { label; amount }',
        description:
          'Authoritative, reconciled monetary breakdown and clearly labelled current total.',
      },
      {
        name: 'recurring / corrections',
        type: 'ReactNode',
        description:
          'Renewal and commitment context when applicable; consumer-owned correction controls.',
      },
    ],
    accessibility: [
      'Native lists and description pairs retain monetary relationships. Amounts use bidirectional isolation. The consuming checkout manages focus and changed-total announcements.',
    ],
    mistakes: [
      'Do not infer payment success, calculate taxes, hide renewal terms, or render unknown amounts as zero. The summary does not submit payment.',
    ],
  },
  {
    ...shared,
    slug: 'contents-navigation',
    title: 'Contents Navigation',
    summary: 'A named list of native links to stable section headings in a public document.',
    useCases: ['Procedural guides and versioned policies with substantive sections.'],
    importCode: "import { ContentsNavigation } from '@/components'",
    basicCode:
      '<ContentsNavigation items={[{ id: "scope", label: "Scope", targetId: "scope" }]} />',
    example: (
      <div className="space-y-scale-4">
        <ContentsNavigation
          label="Example contents"
          items={[
            { id: 'scope', label: 'Policy scope', targetId: 'contents-example-scope' },
            { id: 'review', label: 'Editorial review', targetId: 'contents-example-review' },
          ]}
        />
        <h3 id="contents-example-scope" tabIndex={-1}>
          Policy scope
        </h3>
        <p>This fictional policy covers sample public articles.</p>
        <h3 id="contents-example-review" tabIndex={-1}>
          Editorial review
        </h3>
        <p>Review facts and section destinations before publication.</p>
      </div>
    ),
    props: [
      {
        name: 'items',
        type: 'readonly { id; label; targetId }[]',
        description:
          'Stable identity, descriptive link label, and an existing heading target. Empty lists omit the navigation.',
      },
      {
        name: 'label',
        type: 'string',
        defaultValue: 'On this page',
        description: 'Distinct visible and accessible navigation name.',
      },
    ],
    accessibility: [
      'Targets need a unique id and tabIndex={-1}. Native links preserve fragment history and move focus to the heading.',
    ],
  },
  {
    ...shared,
    slug: 'service-status-summary',
    title: 'Service Status Summary',
    summary:
      'Named public service conditions with explicit coverage, freshness, and aggregate wording.',
    useCases: ['A single-service status destination and a related service portfolio.'],
    importCode: "import { ServiceStatusSummary } from '@/components'",
    basicCode:
      '<ServiceStatusSummary title="Service conditions" scope="All sample regions" freshness="Fictional snapshot" summary="Overall status unknown" services={[]} emptyMessage="No data available." />',
    example: (
      <ServiceStatusSummary
        headingLevel={3}
        title="Service conditions"
        scope="Publishing and delivery · all sample regions"
        freshness="Fictional snapshot: October 5, 2026, 14:00 UTC"
        summary="Overall status unknown — coverage is incomplete."
        services={[
          {
            id: 'publishing',
            name: 'Publishing API',
            condition: 'unknown',
            detail: 'The source has not reported this service.',
          },
          { id: 'delivery', name: 'Asset delivery', condition: 'operational' },
        ]}
        emptyMessage="No service data received."
      />
    ),
    props: [
      {
        name: 'title / headingLevel',
        type: 'string / HeadingLevel',
        description: 'Section identity and heading level (default 2).',
      },
      {
        name: 'scope / freshness / summary',
        type: 'string',
        description:
          'Consumer-owned coverage, exact as-of context, and honest aggregation. Missing or stale data cannot imply healthy.',
      },
      {
        name: 'services',
        type: 'readonly { id; name; condition; detail? }[]',
        description: 'Condition: operational, degraded, outage, maintenance, or unknown.',
      },
      {
        name: 'emptyMessage',
        type: 'string',
        description: 'Required scoped unavailable-data explanation for an empty list.',
      },
    ],
  },
  {
    ...shared,
    slug: 'activity-history',
    title: 'Activity History',
    summary: 'An ordered event collection for one subject, with explicit coverage and timestamps.',
    useCases: ['Workspace publication history and public incident updates.'],
    importCode: "import { ActivityHistory } from '@/components'",
    basicCode:
      '<ActivityHistory title="Publication history" ordering="Newest first" events={[]} emptyMessage="No events are available in this view." />',
    example: (
      <ActivityHistory
        headingLevel={3}
        title="Publication history"
        ordering="Newest first"
        coverage="Two fictional publishing events; this is not a complete audit trail."
        emptyMessage="No accessible events."
        events={[
          {
            id: 'published',
            description: 'Article published',
            actor: 'Example editor',
            timestamp: { dateTime: '2026-10-05T14:00:00Z', label: 'October 5, 2026, 14:00 UTC' },
          },
          {
            id: 'imported',
            description: 'Draft imported',
            detail: <p>The original timestamp was not retained.</p>,
          },
        ]}
      />
    ),
    props: [
      {
        name: 'title / headingLevel',
        type: 'string / HeadingLevel',
        description: 'Named subject and heading level (default 2).',
      },
      {
        name: 'ordering / coverage',
        type: 'string / ReactNode',
        description:
          'Explicit consumer-supplied order and optional completeness, freshness, or access explanation.',
      },
      {
        name: 'events',
        type: 'readonly ActivityEvent[]',
        description:
          'Stable ID, description, optional exact timestamp pair, actor, and detail. Input order is preserved; missing time reads Time unknown.',
      },
      {
        name: 'emptyMessage',
        type: 'string',
        description: 'Required scoped absence message; absence does not prove no events occurred.',
      },
    ],
    mistakes: [
      'Do not supply private actors or diagnostics to public history. Paging, refresh, and access enforcement remain consumer-owned.',
    ],
  },
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
  {
    ...shared,
    slug: 'flow-step-navigation',
    title: 'Flow Step Navigation',
    summary: 'Shows workflow-supplied step states and permitted return actions.',
    useCases: ['Onboarding with optional preferences; application submission.'],
    importCode: "import { FlowStepNavigation } from '@/components'",
    basicCode: '<FlowStepNavigation label="Task steps" steps={steps} />',
    example: (
      <FlowStepNavigation
        label="Example task steps"
        steps={[
          { id: 'details', label: 'Your details', status: 'completed' },
          { id: 'preferences', label: 'Preferences', status: 'current', description: 'Optional' },
          {
            id: 'review',
            label: 'Review',
            status: 'blocked',
            description: 'Continue from preferences first.',
          },
        ]}
      />
    ),
    props: [
      { name: 'label', type: 'string', description: 'Accessible navigation name.' },
      {
        name: 'steps',
        type: 'readonly FlowStep[]',
        description:
          'Stable identities, labels, supplied status, optional description and activation callback.',
      },
      {
        name: 'busy',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables available activation during a conflicting operation.',
      },
    ],
  },
  {
    ...shared,
    slug: 'review-summary',
    title: 'Review Summary',
    summary: 'Groups a reviewed snapshot and correction actions before commitment.',
    useCases: ['Application review; profile setup review.'],
    importCode: "import { ReviewSummary } from '@/components'",
    basicCode:
      '<ReviewSummary title="Check your information" groups={groups} consequences="Submission is not approval." />',
    example: (
      <ReviewSummary
        headingLevel={3}
        title="Check your information"
        groups={[
          {
            id: 'applicant',
            title: 'Applicant',
            values: [{ id: 'name', label: 'Name', value: 'Example person' }],
            correction: (
              <Link href="/examples/application-submission">
                Open editable application reference
              </Link>
            ),
          },
        ]}
        consequences="A receipt confirms submission, not approval."
      />
    ),
    props: [
      {
        name: 'title / headingLevel',
        type: 'string / HeadingLevel',
        description: 'Region name and document hierarchy.',
      },
      {
        name: 'groups',
        type: 'readonly ReviewGroup[]',
        description: 'Named groups, labelled values, and optional scoped correction content.',
      },
      {
        name: 'consequences / feedback',
        type: 'ReactNode',
        description: 'Material consequences and workflow-owned status.',
      },
    ],
  },
  {
    ...shared,
    slug: 'plan-comparison',
    title: 'Plan Comparison',
    summary: 'Comparable offer summaries with explicit billing basis and qualifications.',
    useCases: ['Public subscription plans; public service packages.'],
    importCode: "import { PlanComparison } from '@/components'",
    basicCode:
      '<PlanComparison title="Offers" context="Sample prices" plans={plans} qualifications="Fictional examples." />',
    variants: ['Offer summaries are implemented. Attribute comparison remains contract-only.'],
    example: (
      <PlanComparison
        headingLevel={3}
        title="Sample offers"
        context="Fictional monthly USD prices."
        plans={[
          {
            id: 'starter',
            name: 'Starter',
            price: '$12',
            basis: 'Charged monthly',
            attributes: [{ id: 'seats', label: 'Seats', value: '1' }],
            action: <Link href="/examples/comparison">Explore Starter in the reference</Link>,
          },
          {
            id: 'team',
            name: 'Team',
            price: '$24',
            basis: 'Charged monthly',
            attributes: [{ id: 'seats', label: 'Seats', value: '2' }],
            action: <Link href="/examples/comparison">Explore Team in the reference</Link>,
          },
        ]}
        qualifications="Examples only; no purchase is available."
      />
    ),
    props: [
      {
        name: 'title / headingLevel',
        type: 'string / HeadingLevel',
        description: 'Region name and heading hierarchy.',
      },
      {
        name: 'context / qualifications',
        type: 'ReactNode',
        description: 'Comparison basis and material offer qualifications.',
      },
      {
        name: 'plans',
        type: 'readonly ComparisonPlan[]',
        description:
          'Offer names, prices, billing basis, attributes, and action or unavailability reason.',
      },
      {
        name: 'controls / feedback',
        type: 'ReactNode',
        description: 'Consumer-owned comparison controls and scoped feedback.',
      },
    ],
  },
]
