/* eslint-disable react-refresh/only-export-components */
import { type FoundationDocumentation } from './types'

const colorGroups = {
  'Canvas & surfaces': [
    'background-primary',
    'background-secondary',
    'background-tertiary',
    'background-inverse',
    'background-accent',
    'surface-primary',
    'surface-secondary',
    'surface-raised',
    'surface-sunken',
    'surface-inverse',
  ],
  'Text & boundaries': [
    'text-primary',
    'text-secondary',
    'text-tertiary',
    'text-accent',
    'text-success',
    'text-warning',
    'text-danger',
    'text-info',
    'border-primary',
    'border-secondary',
    'border-strong',
    'border-focus',
    'border-success',
    'border-warning',
    'border-danger',
  ],
  'Feedback & status': [
    'feedback-success-background',
    'feedback-warning-background',
    'feedback-danger-background',
    'feedback-info-background',
    'status-positive-background',
    'status-warning-background',
    'status-negative-background',
    'status-info-background',
    'status-neutral-background',
  ],
  'Data visualization': [
    'chart-series-1',
    'chart-series-2',
    'chart-series-3',
    'chart-series-4',
    'chart-series-5',
    'chart-series-6',
    'chart-positive',
    'chart-negative',
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
] as const
const spacingRoles = [
  ['space-1', 'w-space-1'],
  ['space-2', 'w-space-2'],
  ['space-3', 'w-space-3'],
  ['space-4', 'w-space-4'],
  ['space-6', 'w-space-6'],
  ['space-8', 'w-space-8'],
  ['space-12', 'w-space-12'],
  ['space-16', 'w-space-16'],
] as const
const radiusRoles = [
  ['none', 'rounded-none'],
  ['xs', 'rounded-xs'],
  ['sm', 'rounded-sm'],
  ['md', 'rounded-md'],
  ['lg', 'rounded-lg'],
  ['xl', 'rounded-xl'],
  ['full', 'rounded-full'],
] as const

export const foundationDocs: readonly FoundationDocumentation[] = [
  {
    path: '/docs/foundations',
    title: 'Foundations',
    summary:
      'Bento UI Admin begins with semantic roles: product code names a purpose, while the active theme supplies the visual value.',
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(12rem,100%),1fr))] gap-space-3">
            <Range name="Mobile" detail="Below 40rem" />
            <Range name="Tablet" detail="40rem–63.999rem" />
            <Range name="Desktop" detail="64rem–79.999rem" />
            <Range name="Wide" detail="80rem and above" />
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
          <div className="grid gap-space-6">
            {Object.entries(colorGroups).map(([group, tokens]) => (
              <section key={group}>
                <h3 className="mt-0 mb-space-3 text-heading-sm">{group}</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-space-2">
                  {tokens.map((token) => (
                    <div
                      key={token}
                      className="flex items-center gap-space-3 rounded-md border border-border-secondary bg-surface-primary p-space-3"
                    >
                      <span
                        className="size-9 shrink-0 rounded-md border border-border-primary"
                        style={{ background: `var(--color-${token})` }}
                      />
                      <code className="min-w-0 text-body-xs break-all">{token}</code>
                    </div>
                  ))}
                </div>
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
      'Inter provides a legible hierarchy from public-facing display text to compact labels and tabular data.',
    sections: [
      {
        title: 'Type roles',
        body: (
          <div className="overflow-hidden rounded-lg border border-border-secondary">
            {typeRoles.map(([role, classes]) => (
              <div
                key={role}
                className="grid gap-space-2 border-b border-border-secondary p-space-4 last:border-0 sm:grid-cols-[10rem_1fr]"
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
          <div className="grid gap-space-3">
            {spacingRoles.map(([role, width]) => (
              <div key={role} className="grid grid-cols-[4rem_1fr] items-center gap-space-3">
                <code className="text-body-xs">{role}</code>
                <span
                  className={`block h-space-2 max-w-full rounded-full bg-action-primary-background-default ${width}`}
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
              <code>container-page</code> supports general websites and applications.
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
          <div className="grid gap-space-3 sm:grid-cols-2">
            {radiusRoles.map(([role, radius]) => (
              <div key={role} className="flex items-center gap-space-3">
                <span
                  className={`size-14 border-2 border-border-strong bg-surface-secondary ${radius}`}
                />
                <code className="text-body-xs">rounded.{role}</code>
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
        title: 'Layer order',
        body: (
          <ol>
            <li>Page or workspace background</li>
            <li>Standard bordered or tonal surface</li>
            <li>Raised menu, dropdown, or popover</li>
            <li>Modal above its overlay</li>
            <li>Tooltip above blocking overlays when essential</li>
          </ol>
        ),
      },
      {
        title: 'Shadows',
        body: (
          <p>
            Exact shadow values are not tokenized. Use borders and tonal separation as the stable
            default; reserve shadows for content that genuinely floats.
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
      'The light theme is normative; inverse surfaces are supported locally, while the current dark theme is an explicitly limited documentation and demo extension.',
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
          <div className="rounded-lg bg-surface-inverse p-space-6 text-text-inverse">
            <p className="m-0">
              Inverse is a supported local surface mode, not a complete page theme.
            </p>
          </div>
        ),
      },
      {
        title: 'Dark-mode status',
        body: (
          <p>
            Dark mode is not yet a supported system theme during the Draft phase. The toggle in this
            documentation site uses the repository’s demo-specific role remapping; do not treat it
            as a complete production palette. A future theme must remap and verify every foreground,
            surface, border, focus, feedback, status, and chart combination.
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

function Range({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border-secondary bg-surface-primary p-space-4">
      <strong className="block text-label-md">{name}</strong>
      <span className="mt-space-1 block text-body-sm text-text-secondary">{detail}</span>
    </div>
  )
}

export const foundationDocsByPath = new Map(
  foundationDocs.map((foundation) => [foundation.path, foundation]),
)
