/* eslint-disable react-refresh/only-export-components */
import { type FoundationDocumentation } from './types'

const colorGroups = {
  Brand: [
    'brand-background',
    'brand-background-subtle',
    'brand-foreground',
    'brand-on-background',
    'brand-border',
  ],
  Background: [
    'background-primary',
    'background-secondary',
    'background-tertiary',
    'background-inverse',
    'background-accent',
    'background-disabled',
    'background-overlay',
  ],
  Surface: [
    'surface-primary',
    'surface-secondary',
    'surface-raised',
    'surface-sunken',
    'surface-inverse',
  ],
  Text: [
    'text-primary',
    'text-secondary',
    'text-tertiary',
    'text-placeholder',
    'text-inverse',
    'text-disabled',
    'text-accent',
    'text-link',
    'text-success',
    'text-warning',
    'text-danger',
    'text-info',
  ],
  Border: [
    'border-primary',
    'border-secondary',
    'border-subtle',
    'border-strong',
    'border-inverse',
    'border-disabled',
    'border-focus',
    'border-accent',
    'border-success',
    'border-warning',
    'border-danger',
  ],
  Action: {
    Primary: [
      'action-primary-background-default',
      'action-primary-background-hover',
      'action-primary-background-active',
      'action-primary-background-disabled',
      'action-primary-foreground',
      'action-primary-foreground-disabled',
      'action-primary-border',
      'action-primary-border-disabled',
    ],
    Secondary: [
      'action-secondary-background-default',
      'action-secondary-background-hover',
      'action-secondary-background-active',
      'action-secondary-background-disabled',
      'action-secondary-foreground',
      'action-secondary-foreground-disabled',
      'action-secondary-border',
      'action-secondary-border-disabled',
    ],
    Outline: [
      'action-outline-background-default',
      'action-outline-background-hover',
      'action-outline-background-active',
      'action-outline-background-disabled',
      'action-outline-foreground',
      'action-outline-foreground-disabled',
      'action-outline-border',
      'action-outline-border-disabled',
    ],
    Ghost: [
      'action-ghost-background-default',
      'action-ghost-background-hover',
      'action-ghost-background-active',
      'action-ghost-background-disabled',
      'action-ghost-foreground',
      'action-ghost-foreground-disabled',
    ],
    Destructive: [
      'action-destructive-background-default',
      'action-destructive-background-hover',
      'action-destructive-background-active',
      'action-destructive-background-disabled',
      'action-destructive-foreground',
      'action-destructive-foreground-disabled',
    ],
    Link: [
      'action-link-default',
      'action-link-hover',
      'action-link-active',
      'action-link-visited',
      'action-link-disabled',
    ],
  },
  Feedback: {
    Success: [
      'feedback-success-background',
      'feedback-success-foreground',
      'feedback-success-border',
    ],
    Warning: [
      'feedback-warning-background',
      'feedback-warning-foreground',
      'feedback-warning-border',
    ],
    Danger: ['feedback-danger-background', 'feedback-danger-foreground', 'feedback-danger-border'],
    Info: ['feedback-info-background', 'feedback-info-foreground', 'feedback-info-border'],
  },
  Status: {
    Positive: [
      'status-positive-background',
      'status-positive-foreground',
      'status-positive-border',
    ],
    Warning: ['status-warning-background', 'status-warning-foreground', 'status-warning-border'],
    Negative: [
      'status-negative-background',
      'status-negative-foreground',
      'status-negative-border',
    ],
    Info: ['status-info-background', 'status-info-foreground', 'status-info-border'],
    Neutral: ['status-neutral-background', 'status-neutral-foreground', 'status-neutral-border'],
  },
  Navigation: [
    'navigation-sidebar-background',
    'navigation-sidebar-foreground',
    'navigation-sidebar-foreground-strong',
    'navigation-sidebar-item-hover',
    'navigation-sidebar-item-selected',
    'navigation-sidebar-item-selected-foreground',
    'navigation-topbar-background',
    'navigation-topbar-border',
  ],
  Table: [
    'table-header-background',
    'table-row-background',
    'table-row-hover',
    'table-row-selected',
    'table-border',
  ],
  Selection: ['selection-background', 'selection-foreground', 'focus-ring', 'focus-ring-offset'],
  Chart: [
    'chart-series-1',
    'chart-series-2',
    'chart-series-3',
    'chart-series-4',
    'chart-series-5',
    'chart-series-6',
    'chart-positive',
    'chart-negative',
    'chart-gridline',
    'chart-axis',
  ],
} as const

const typeRoles = [
  [
    'display-xl',
    'text-display-xl font-display-xl leading-display-xl font-bold tracking-display-xl',
  ],
  [
    'display-lg',
    'text-display-lg font-display-lg leading-display-lg font-bold tracking-display-lg',
  ],
  [
    'display-md',
    'text-display-md font-display-md leading-display-md font-bold tracking-display-md',
  ],
  [
    'heading-xl',
    'text-heading-xl font-heading-xl leading-heading-xl font-bold tracking-heading-xl',
  ],
  [
    'heading-lg',
    'text-heading-lg font-heading-lg leading-heading-lg font-bold tracking-heading-lg',
  ],
  [
    'heading-md',
    'text-heading-md font-heading-md leading-heading-md font-semibold tracking-heading-md',
  ],
  [
    'heading-sm',
    'text-heading-sm font-heading-sm leading-heading-sm font-semibold tracking-heading-sm',
  ],
  ['body-lg', 'text-body-lg font-body-lg leading-body-lg'],
  ['body-md', 'text-body-md font-body-md leading-body-md'],
  ['body-sm', 'text-body-sm font-body-sm leading-body-sm'],
  ['label-lg', 'text-label-lg font-label-lg leading-label-lg'],
  ['label-md', 'text-label-md font-label-md leading-label-md'],
  ['label-sm', 'text-label-sm font-label-sm leading-label-sm'],
  [
    'label-overline',
    'text-label-overline font-label-overline leading-label-overline font-semibold tracking-label-overline uppercase',
  ],
  ['caption', 'text-caption font-caption leading-caption'],
  ['data-lg', 'text-data-lg font-data-lg leading-data-lg'],
  ['data-md', 'text-data-md font-data-md leading-data-md'],
  ['data-sm', 'text-data-sm font-data-sm leading-data-sm'],
  ['code-sm', 'text-code-sm font-code-sm leading-code-sm font-normal tracking-code-sm'],
  ['code-md', 'text-code-md font-code-md leading-code-md font-normal tracking-code-md'],
] as const
const spacingRoles = [
  ['scale-0', 'w-scale-0'],
  ['scale-0-5', 'w-scale-0-5'],
  ['scale-1', 'w-scale-1'],
  ['scale-1-5', 'w-scale-1-5'],
  ['scale-2', 'w-scale-2'],
  ['scale-2-5', 'w-scale-2-5'],
  ['scale-3', 'w-scale-3'],
  ['scale-3-5', 'w-scale-3-5'],
  ['scale-4', 'w-scale-4'],
  ['scale-5', 'w-scale-5'],
  ['scale-6', 'w-scale-6'],
  ['scale-7', 'w-scale-7'],
  ['scale-8', 'w-scale-8'],
  ['scale-9', 'w-scale-9'],
  ['scale-10', 'w-scale-10'],
  ['scale-11', 'w-scale-11'],
  ['scale-12', 'w-scale-12'],
  ['scale-14', 'w-scale-14'],
  ['scale-16', 'w-scale-16'],
  ['scale-20', 'w-scale-20'],
  ['scale-24', 'w-scale-24'],
  ['scale-32', 'w-scale-32'],
] as const
const radiusRoles = [
  ['none', 'rounded-shape-none'],
  ['xs', 'rounded-shape-xs'],
  ['sm', 'rounded-shape-sm'],
  ['md', 'rounded-shape-md'],
  ['lg', 'rounded-shape-lg'],
  ['xl', 'rounded-shape-xl'],
  ['full', 'rounded-shape-full'],
] as const

export const foundationDocs: readonly FoundationDocumentation[] = [
  {
    path: '/docs/foundations',
    title: 'Foundations',
    summary:
      'Bento UI begins with semantic roles: product code names a purpose, while the active theme supplies the visual value.',
    sections: [
      {
        title: 'Token model',
        body: (
          <p>
            Use specific roles such as <code>text-primary</code>,{' '}
            <code>action-primary-background-hover</code>, and <code>status-warning-background</code>
            . Repeated literal values are aliases, not permission to substitute one meaning for
            another.
          </p>
        ),
      },
      {
        title: 'System ranges',
        body: (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(12rem,100%),1fr))] gap-scale-3">
            <Range name="Mobile" detail="Below 40rem / 640px" />
            <Range name="Tablet" detail="40rem–63.999rem / 640–1023px" />
            <Range name="Desktop" detail="64rem–79.999rem / 1024–1279px" />
            <Range name="Wide" detail="80rem / 1280px and above" />
          </div>
        ),
      },
      {
        title: 'Implementation rule',
        body: (
          <p>
            <code>DESIGN.md</code> is the exact token source. The generated theme and DTCG files are
            outputs and must not be edited directly. Components in this library consume the
            generated Tailwind utilities.
          </p>
        ),
      },
    ],
  },
  {
    path: '/docs/foundations/colors',
    title: 'Colors',
    summary:
      'Color communicates hierarchy and meaning through semantic families rather than raw palette values.',
    sections: [
      {
        title: 'Semantic roles',
        body: (
          <div className="grid gap-scale-6">
            {Object.entries(colorGroups).map(([group, tokens]) => (
              <section key={group}>
                <h3 className="mt-0 mb-scale-3 text-heading-sm">{group}</h3>
                {Array.isArray(tokens) ? (
                  <ColorSwatches tokens={tokens} />
                ) : (
                  <div className="grid gap-scale-4">
                    {Object.entries(tokens).map(([purpose, purposeTokens]) => (
                      <section key={purpose}>
                        <h4 className="mt-0 mb-scale-2 text-label-md">{purpose}</h4>
                        <ColorSwatches tokens={purposeTokens} />
                      </section>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        ),
      },
      {
        title: 'Meaning before appearance',
        body: (
          <p>
            Action, feedback, status, navigation, selection, and chart colors are intentionally
            separate. Pair every semantic color with text, an icon, position, shape, or another
            non-color cue.
          </p>
        ),
      },
      {
        title: 'Charts',
        body: (
          <p>
            Keep series assignments consistent within one analytical context. Reserve positive and
            negative colors for genuine quantitative meaning and provide direct labels or an
            accessible summary.
          </p>
        ),
      },
    ],
  },
  {
    path: '/docs/foundations/typography',
    title: 'Typography',
    summary:
      'Inter provides the interface hierarchy, while JetBrains Mono keeps code, commands, and terminal output clear.',
    sections: [
      {
        title: 'Type roles',
        body: (
          <div className="overflow-hidden rounded-shape-lg border border-border-secondary">
            {typeRoles.map(([role, classes]) => (
              <div
                key={role}
                className="grid gap-scale-2 border-b border-border-secondary p-scale-4 last:border-0 sm:grid-cols-[10rem_1fr]"
              >
                <code className="text-body-xs text-text-secondary">{role}</code>
                <span className={classes}>
                  {role === 'label-overline'
                    ? 'Featured project'
                    : 'Bento makes complex work feel calm.'}
                </span>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: 'Usage',
        body: (
          <ul className="list-disc">
            <li>Use body-md for public surfaces and body-sm for readable dashboard content.</li>
            <li>
              Use labels for controls and navigation, captions for metadata, and data roles for
              metrics.
            </li>
            <li>
              Use label-overline only for short eyebrow or contextual text. Apply uppercase in the
              adapter only when it is appropriate for the language and writing system.
            </li>
            <li>
              Use tabular numerals for aligned values; typography does not replace semantic heading
              structure.
            </li>
          </ul>
        ),
      },
      {
        title: 'Resilience',
        body: (
          <p>
            Text must remain readable at 200% zoom and with increased text spacing. Allow labels and
            translated content to wrap; truncate only nonessential values while preserving access to
            the complete text.
          </p>
        ),
      },
    ],
  },
  {
    path: '/docs/foundations/spacing',
    title: 'Spacing & layout',
    summary:
      'A primarily 4px rhythm controls grouping, density, gutters, widths, navigation dimensions, and touch targets.',
    sections: [
      {
        title: 'Base scale',
        body: (
          <div className="grid gap-scale-3">
            {spacingRoles.map(([role, width]) => (
              <div key={role} className="grid grid-cols-[6rem_1fr] items-center gap-scale-3">
                <code className="text-body-xs">{role}</code>
                <span
                  className={`block h-scale-2 max-w-full rounded-shape-full bg-action-primary-background-default ${width}`}
                />
              </div>
            ))}
          </div>
        ),
      },
      {
        title: 'Content widths',
        body: (
          <ul className="list-disc">
            <li>
              <code>container-narrow</code> supports authentication and focused forms.
            </li>
            <li>
              <code>container-readable</code> supports prose and guidance.
            </li>
            <li>
              <code>container-content</code> supports mixed marketing and application sections.
            </li>
            <li>
              <code>container-page</code> supports general websites and applications.
            </li>
            <li>
              <code>container-wide</code> supports expansive public-site layouts.
            </li>
            <li>
              <code>container-dashboard</code> supports dense dashboards.
            </li>
          </ul>
        ),
      },
      {
        title: 'Density and targets',
        body: (
          <p>
            Small controls belong in dense pointer-oriented tools. Medium controls are the dashboard
            default; large controls are for forms and touch contexts. Touch layouts preserve the
            44px minimum target.
          </p>
        ),
      },
    ],
  },
  {
    path: '/docs/foundations/borders',
    title: 'Borders & shapes',
    summary:
      'Quiet boundaries and a small radius scale provide structure before elevation is introduced.',
    sections: [
      {
        title: 'Radius scale',
        body: (
          <div className="grid gap-scale-3 sm:grid-cols-2">
            {radiusRoles.map(([role, radius]) => (
              <div key={role} className="flex items-center gap-scale-3">
                <span
                  className={`size-14 border-2 border-border-strong bg-surface-secondary ${radius}`}
                />
                <code className="text-body-xs">rounded.shape-{role}</code>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: 'Boundary roles',
        body: (
          <p>
            Use primary and secondary borders for structure, subtle for quiet grouping, strong for
            emphasis, focus for keyboard state, and semantic success, warning, or danger boundaries
            for validation.
          </p>
        ),
      },
      {
        title: 'Shape rules',
        body: (
          <p>
            Medium is the control default, large groups cards, extra-large is reserved for dialogs
            and feature surfaces, and full is for badges, pills, avatars, and circular controls.
          </p>
        ),
      },
    ],
  },
  {
    path: '/docs/foundations/elevation',
    title: 'Elevation & motion',
    summary:
      'Depth follows a semantic layer order, while restrained motion confirms state without becoming essential.',
    sections: [
      {
        title: 'Elevation hierarchy',
        body: (
          <ol>
            <li>Page or workspace background</li>
            <li>Standard surface with a quiet border or tonal separation</li>
            <li>Raised surface for persistent content that needs additional separation</li>
            <li>Floating surface for temporary content that overlaps the current layout</li>
            <li>Modal surface above a blocking backdrop</li>
          </ol>
        ),
      },
      {
        title: 'Shadows',
        body: (
          <p>
            Standard surfaces do not use shadows. Raised surfaces rely primarily on borders and
            tonal separation. Floating and modal surfaces may use implementation-defined shadows;
            exact values belong to the platform adapter. In dark mode, elevated surfaces retain a
            visible edge because shadows alone may disappear against the canvas.
          </p>
        ),
      },
      {
        title: 'Stacking order',
        body: (
          <p>
            Layer content in this order: page, sticky navigation, popover, blocking backdrop and
            dialog, then tooltip when essential. Numeric stacking values remain local to the
            implementation.
          </p>
        ),
      },
      {
        title: 'Motion',
        body: (
          <p>
            Interactive feedback completes within 200ms and functional motion within 300ms. Honor
            reduced motion by making nonessential transitions effectively immediate while keeping
            the state change perceivable.
          </p>
        ),
      },
    ],
  },
  {
    path: '/docs/foundations/themes',
    title: 'Themes',
    summary:
      'The light and dark themes are normative system mappings, while inverse surfaces remain a local treatment for specific surfaces.',
    sections: [
      {
        title: 'Light theme',
        body: (
          <p>
            The exact frontmatter values in <code>DESIGN.md</code> define the supported default
            palette. Components consume semantic roles so visual values can change without changing
            component meaning.
          </p>
        ),
      },
      {
        title: 'Inverse surfaces',
        body: (
          <div className="rounded-shape-lg bg-surface-inverse p-scale-6 text-text-inverse">
            <p className="m-0">
              Inverse is a supported local surface mode, not a complete page theme.
            </p>
          </div>
        ),
      },
      {
        title: 'Dark theme',
        body: (
          <p>
            Dark-mode values in the DESIGN.md frontmatter are an authored system theme. The runtime
            adapter maps unqualified semantic roles to their dark equivalents when the dark theme is
            active. Products must use one complete theme mapping at a time and verify every
            foreground, surface, border, focus, feedback, status, and chart pairing in rendered
            contexts.
          </p>
        ),
      },
      {
        title: 'Platform themes',
        body: (
          <p>
            Forced-color modes may replace authored colors, boundaries, and focus treatments as long
            as disabled, focused, selected, checked, invalid, and current states remain perceivable.
          </p>
        ),
      },
    ],
  },
  {
    path: '/docs/foundations/accessibility',
    title: 'Accessibility',
    summary:
      'Supported web experiences target WCAG 2.2 Level AA and a stronger 44px touch target where the component contract requires it.',
    sections: [
      {
        title: 'Interaction baseline',
        body: (
          <ul className="list-disc">
            <li>Expose name, role, value, state, relationships, descriptions, and errors.</li>
            <li>Support complete keyboard operation without a trap and retain visible focus.</li>
            <li>
              Keep pointer actions cancellable until release unless immediate activation is
              essential.
            </li>
          </ul>
        ),
      },
      {
        title: 'Content resilience',
        body: (
          <p>
            Preserve meaningful reading and focus order through responsive changes. Support zoom,
            increased text spacing, long translations, right-to-left direction, and complete values
            without clipping essential information.
          </p>
        ),
      },
      {
        title: 'State and announcements',
        body: (
          <p>
            Never rely on color alone. Announce meaningful dynamic feedback once at the correct
            urgency, keep routine refreshes quiet, and avoid moving focus unless it materially helps
            recovery or continuation.
          </p>
        ),
      },
      {
        title: 'Testing',
        body: (
          <p>
            Verify keyboard-only input, screen-reader browsing and interaction, touch, 200% text
            size, high zoom reflow, increased text spacing, reduced motion, and forced colors in
            rendered context.
          </p>
        ),
      },
    ],
  },
]

function ColorSwatches({ tokens }: { tokens: readonly string[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-scale-2">
      {tokens.map((token) => (
        <div
          key={token}
          className="flex items-center gap-scale-3 rounded-shape-md border border-border-secondary bg-surface-primary p-scale-3"
        >
          <span
            className="size-9 shrink-0 rounded-shape-md border border-border-primary"
            style={{ background: `var(--color-${token})` }}
          />
          <code className="min-w-0 font-code-sm text-code-sm leading-code-sm font-normal tracking-code-sm break-all">
            {token}
          </code>
        </div>
      ))}
    </div>
  )
}

function Range({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-4">
      <strong className="block text-label-md">{name}</strong>
      <span className="mt-scale-1 block text-body-sm text-text-secondary">{detail}</span>
    </div>
  )
}

export const foundationDocsByPath = new Map(
  foundationDocs.map((foundation) => [foundation.path, foundation]),
)
