import { componentExamples } from './examples'
import { type ComponentDocumentation, type PropReference } from './types'

const classNameProp: PropReference = {
  name: 'className',
  type: 'string',
  description: 'Adds styling at the component boundary without replacing semantic defaults.',
}

const createDoc = (
  documentation: Omit<ComponentDocumentation, 'example'>,
): ComponentDocumentation => ({
  ...documentation,
  example: componentExamples[documentation.slug],
})

export const componentDocs = [
  createDoc({
    slug: 'form-field',
    title: 'Form field',
    summary:
      'Provides shared labels, guidance, requirements, validation, and status for form controls.',
    useCases: [
      'Compose consistent field anatomy around text fields, selection controls, and named control groups.',
    ],
    importCode: "import { Input, Select, Textarea } from '@/components'",
    basicCode: `<Input label="Project name" helperText="Use 3–40 characters." error={error} />`,
    props: [
      { name: 'label', type: 'string', description: 'Persistent visible and accessible label.' },
      {
        name: 'hint / helperText',
        type: 'string',
        description: 'Contextual metadata and persistent guidance.',
      },
      {
        name: 'error / status',
        type: "string / 'default' | 'success' | 'warning' | 'invalid'",
        description: 'Current validation state and corrective message.',
      },
      {
        name: 'required / readOnly / disabled',
        type: 'boolean',
        description: 'Native availability and requirement states exposed by the composed control.',
      },
    ],
    variants: [
      'Stacked field and named control-group composition.',
      'Default, edited, validating, success, warning, invalid, read-only, and disabled states.',
    ],
    accessibility: [
      'Uses native label or fieldset relationships.',
      'Persistent guidance and current errors remain programmatically associated.',
      'Validation updates do not move focus or erase entered values.',
    ],
    responsive:
      'Labels, guidance, controls, and messages wrap in stable reading order at narrow widths and high zoom.',
    theme: 'Uses semantic label, secondary text, validation, border, and focus roles.',
    mistakes: [
      'Do not replace labels with placeholders.',
      'Do not remove persistent guidance when an error appears.',
      'Do not substitute disabled for read-only.',
    ],
    related: ['input', 'textarea', 'select', 'combobox'],
  }),
  createDoc({
    slug: 'overlay',
    title: 'Overlay foundation',
    summary:
      'Coordinates anchored-layer placement, viewport fit, dismissal, and focus restoration.',
    useCases: [
      'Shared internal behavior for tooltip, popover, action-menu, listbox, and combobox surfaces.',
    ],
    importCode: "import { Popover, Tooltip } from '@/components'",
    basicCode: `<Popover trigger={<Button>Settings</Button>}>…</Popover>`,
    props: [
      {
        name: 'placement',
        type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'",
        description: 'Preferred logical placement; the surface flips or shifts to remain visible.',
      },
      {
        name: 'open / onDismiss',
        type: 'boolean / callback',
        description: 'Controls visibility and safe dismissal.',
      },
      {
        name: 'anchor',
        type: 'HTMLElement',
        description: 'Supplies the visual and interaction relationship boundary.',
      },
    ],
    variants: [
      'Trigger-focus, surface-focus, and active-descendant focus models selected by the dependent component.',
      'Closed, open, repositioning, and closing states.',
    ],
    accessibility: [
      'Introduces no generic ARIA role.',
      'Escape closes the innermost eligible surface.',
      'Focus is restored only when it moved into the surface.',
    ],
    responsive:
      'Surfaces shift or flip before clipping and stay within the viewport with one useful scrolling direction.',
    theme: 'Raised surfaces reuse dropdown surface, boundary, spacing, and depth roles.',
    mistakes: [
      'Do not give every floating surface menu semantics.',
      'Do not position without collision handling.',
      'Do not dismiss on initial pointer press.',
    ],
    related: ['tooltip', 'popover', 'dropdown', 'combobox'],
  }),
  createDoc({
    slug: 'progress',
    title: 'Progress and spinner',
    summary: 'Communicates measurable or indeterminate work without inventing progress.',
    useCases: ['Known-duration operations, indeterminate local work, and compact busy controls.'],
    importCode: "import { Progress, Spinner } from '@/components'",
    basicCode: `<Progress label="Exporting report" value={40} valueLabel="40 of 100 items" />`,
    props: [
      { name: 'label', type: 'string', description: 'Names the operation.' },
      {
        name: 'value / min / max',
        type: 'number',
        description: 'Defines determinate progress; omit value when indeterminate.',
      },
      {
        name: 'valueLabel / showValue',
        type: 'string / boolean',
        description: 'Provides useful visible and accessible progress text.',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        description: 'Spinner size matched to its containing control.',
      },
      classNameProp,
    ],
    variants: [
      'Determinate linear, indeterminate linear, and compact spinner.',
      'Delayed, active, paused, completing, failed, and cancelled experience states.',
    ],
    accessibility: [
      'Determinate progress exposes bounds and current value.',
      'Indeterminate progress omits fictional numeric values.',
      'Reduced motion preserves visible busy status.',
    ],
    responsive: 'Labels and values wrap without shrinking or causing horizontal scrolling.',
    theme: 'Uses feedback-info track and indicator roles plus semantic text.',
    mistakes: [
      'Do not show fictional percentages.',
      'Do not replace the operation label with a spinner.',
      'Do not announce every small update.',
    ],
    related: ['button', 'toast', 'empty-state'],
  }),
  createDoc({
    slug: 'empty-state',
    title: 'Empty state',
    summary: 'Explains why expected content is absent and offers a realistic next step.',
    useCases: ['No data yet, no results, filtered empty, unavailable, and retrieval-error states.'],
    importCode: "import { EmptyState } from '@/components'",
    basicCode: `<EmptyState title="No matches" description="Change the filters." primaryAction={<Button>Clear filters</Button>} />`,
    props: [
      {
        name: 'title / description',
        type: 'ReactNode',
        description: 'Names and explains the current condition.',
      },
      {
        name: 'variant',
        type: "'no-data' | 'no-results' | 'filtered' | 'unavailable' | 'error'",
        defaultValue: "'no-data'",
        description: 'Identifies why content is absent.',
      },
      {
        name: 'size',
        type: "'compact' | 'spacious'",
        defaultValue: "'compact'",
        description: 'Adapts composition to a bounded region or primary page state.',
      },
      {
        name: 'primaryAction / secondaryAction',
        type: 'ReactNode',
        description: 'Offers creation, retry, filter, or recovery actions.',
      },
      {
        name: 'announce',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Announces a newly changed result without moving focus.',
      },
      classNameProp,
    ],
    variants: [
      'Compact and spacious layouts across five semantic causes.',
      'Current, retrying, resolved, and persistent states.',
    ],
    accessibility: [
      'Uses ordinary document structure and meaningful reading order.',
      'Decorative imagery is hidden.',
      'Announcements are reserved for changed results.',
    ],
    responsive:
      'Copy wraps and actions stack while preserving title, explanation, primary action, and secondary action order.',
    theme: 'Neutral states inherit their surface; warning and error variants use feedback roles.',
    mistakes: [
      'Do not show empty before loading finishes.',
      'Do not offer retry for valid no-data states.',
      'Do not clear search or filters automatically.',
    ],
    related: ['progress', 'table', 'data-grid', 'card'],
  }),
  createDoc({
    slug: 'avatar',
    title: 'Avatar',
    summary: 'Provides a compact visual reference to a person with deterministic fallbacks.',
    useCases: ['People in lists, tables, compact groups, account context, and profile summaries.'],
    importCode: "import { Avatar } from '@/components'",
    basicCode: `<Avatar name="Morgan Lee" src={person.photoUrl} />`,
    props: [
      {
        name: 'name',
        type: 'string',
        description: 'Full localized display name used for identity and fallback.',
      },
      {
        name: 'src / alt',
        type: 'string',
        description: 'Optional approved image and alternative text.',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        defaultValue: "'medium'",
        description: 'Selects one supported avatar size.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Prevents duplicate identity when adjacent text already names the person.',
      },
      classNameProp,
    ],
    variants: [
      'Person image, locale-aware initials, and generic person fallback.',
      'Small, medium, and large sizes.',
    ],
    accessibility: [
      'Exposes the person once.',
      'Initials and glyphs are visual fallbacks, not accessible names.',
      'Interaction belongs to an enclosing link or button.',
    ],
    responsive: 'Switch only among supported sizes and never distort or shrink below small.',
    theme: 'Fallbacks use avatar size and avatar-fallback semantic mappings.',
    mistakes: [
      'Do not make the base avatar interactive.',
      'Do not attach unexplained status dots.',
      'Do not duplicate an adjacent visible name.',
    ],
    related: ['avatar-group', 'status-badge'],
  }),
  createDoc({
    slug: 'avatar-group',
    title: 'Avatar Group',
    summary: 'Previews an ordered group of people with an optional named overflow control.',
    useCases: ['Compact project membership, ownership, and participant summaries.'],
    importCode: "import { AvatarGroup } from '@/components'",
    basicCode: `<AvatarGroup label="Project members" people={members} maxVisible={3} expandable />`,
    props: [
      {
        name: 'people',
        type: 'readonly AvatarGroupPerson[]',
        description: 'Stable ordered identities.',
      },
      { name: 'label', type: 'string', description: 'Names the group purpose.' },
      {
        name: 'size',
        type: "'small' | 'medium'",
        defaultValue: "'small'",
        description: 'Uses one consistent Avatar size.',
      },
      {
        name: 'maxVisible',
        type: 'number',
        defaultValue: '3',
        description: 'Sets the visible limit before overflow.',
      },
      {
        name: 'expandable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Makes the overflow summary open a complete Popover list.',
      },
      classNameProp,
    ],
    variants: [
      'Static and expandable groups.',
      'Complete, partially resolved, overflowed, expanded, and contracted states.',
    ],
    accessibility: [
      'Provides one non-duplicating group summary.',
      'Overflow controls include the hidden count in their name.',
      'Expanded names remain in stable product order.',
    ],
    responsive:
      'Reduces visible people before reducing avatar size; keeps one identity plus overflow while useful.',
    theme: 'Composes Avatar mappings with surface-colored overlap boundaries.',
    mistakes: [
      'Do not use a group when users must manage individuals.',
      'Do not reorder as images load.',
      'Do not render an empty group.',
    ],
    related: ['avatar', 'popover', 'drawer'],
  }),
  createDoc({
    slug: 'tooltip',
    title: 'Tooltip',
    summary: 'Provides brief, non-interactive supplemental text for a labelled control or anchor.',
    useCases: ['Explain unfamiliar icon actions or reveal short nonessential values.'],
    importCode: "import { Tooltip } from '@/components'",
    basicCode: `<Tooltip content="Archive project"><Button aria-label="Archive project" iconOnly>…</Button></Tooltip>`,
    props: [
      { name: 'content', type: 'string', description: 'Brief plain-text description.' },
      { name: 'children', type: 'ReactElement', description: 'Described trigger or anchor.' },
      {
        name: 'placement',
        type: 'OverlayPlacement',
        defaultValue: "'top-start'",
        description: 'Preferred viewport-aware placement.',
      },
      {
        name: 'delay',
        type: 'number',
        defaultValue: '400',
        description: 'Pointer show delay; keyboard focus remains immediate.',
      },
    ],
    variants: [
      'Control and static-content descriptions.',
      'Hidden, pending, visible, repositioning, and dismissed states.',
    ],
    accessibility: [
      'Connects visible tooltip text with aria-describedby.',
      'Never replaces the trigger accessible name.',
      'Escape dismisses without moving focus.',
    ],
    responsive: 'Wraps short text and repositions without becoming a touch-only interaction.',
    theme: 'Uses inverse surface, inverse text, compact spacing, and tooltip layer order.',
    mistakes: [
      'Do not place interactive content in a tooltip.',
      'Do not put essential instructions only on hover.',
      'Do not rely on a disabled control receiving focus.',
    ],
    related: ['popover', 'overlay', 'button'],
  }),
  createDoc({
    slug: 'alert-dialog',
    title: 'Alert dialog',
    summary:
      'Interrupts the current task for a short, consequential decision requiring acknowledgement.',
    useCases: [
      'Irreversible deletion, broad-scope changes, and critical blocking acknowledgement.',
    ],
    importCode: "import { AlertDialog } from '@/components'",
    basicCode: `<AlertDialog open={open} title="Delete project?" description="This cannot be undone." confirmLabel="Delete project" onConfirm={remove} onClose={cancel} />`,
    props: [
      {
        name: 'open / onClose / onConfirm',
        type: 'boolean / callbacks',
        description: 'Controls the decision lifecycle.',
      },
      {
        name: 'title / description',
        type: 'string',
        description: 'Names the decision, object, scope, and consequence.',
      },
      {
        name: 'confirmLabel / cancelLabel',
        type: 'string',
        description: 'Uses outcome-specific commitment and safe-action labels.',
      },
      {
        name: 'destructive / busy / error',
        type: 'boolean / ReactNode',
        description: 'Communicates risk, commitment progress, and recovery.',
      },
      {
        name: 'confirmationPhrase',
        type: 'string',
        description: 'Optional typed confirmation for exceptional impact.',
      },
    ],
    variants: [
      'Destructive confirmation and critical acknowledgement.',
      'Awaiting, validating, committing, failed, and closing states.',
    ],
    accessibility: [
      'Always modal with alertdialog semantics.',
      'Initial focus favors the safe action.',
      'Risk and consequence are communicated in text.',
    ],
    responsive: 'Keeps viewport clearance and stacks actions when labels do not fit.',
    theme: 'Composes modal surface and Button mappings without recoloring the whole dialog.',
    mistakes: [
      'Prefer undo for reversible changes.',
      'Do not use vague labels such as Yes or OK.',
      'Do not initially focus the destructive action.',
    ],
    related: ['modal', 'button', 'alert'],
  }),
  createDoc({
    slug: 'disclosure',
    title: 'Disclosure',
    summary:
      'Shows or hides ordinary content while keeping its trigger and region in one reading context.',
    useCases: ['Optional details, compact supporting information, and responsive navigation.'],
    importCode: "import { Disclosure } from '@/components'",
    basicCode: `<Disclosure title="Show details">…</Disclosure>`,
    props: [
      {
        name: 'title / children',
        type: 'ReactNode',
        description: 'Stable trigger label and controlled content.',
      },
      {
        name: 'open / defaultOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Controlled or initial expanded state.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Reports expansion changes.',
      },
      {
        name: 'disabled / busy',
        type: 'boolean',
        description: 'Communicates unavailable or loading content.',
      },
      {
        name: 'headingLevel',
        type: '2 | 3 | 4 | 5 | 6',
        description: 'Places the trigger in document heading structure.',
      },
      classNameProp,
    ],
    variants: [
      'Inline, layered, and navigation disclosures.',
      'Collapsed, expanded, busy, error, and disabled states.',
    ],
    accessibility: [
      'Uses a native button with expanded and controlled relationships.',
      'Opening leaves focus on the trigger.',
      'Interactive content follows in ordinary focus order.',
    ],
    responsive: 'Content reflows in reading order and does not create two-dimensional scrolling.',
    theme: 'Trigger and content compose existing Button, navigation, and surface roles.',
    mistakes: [
      'Do not use disclosure as a menu, tab set, or dialog.',
      'Do not move focus simply because content appeared.',
      'Do not collapse inline content on outside activation.',
    ],
    related: ['accordion', 'site-navigation', 'popover'],
  }),
  createDoc({
    slug: 'accordion',
    title: 'Accordion',
    summary:
      'Coordinates a structured group of disclosure sections with an explicit open-state policy.',
    useCases: [
      'Related FAQ, settings, and reference sections that benefit from progressive disclosure.',
    ],
    importCode: "import { Accordion } from '@/components'",
    basicCode: `<Accordion type="single" items={sections} />`,
    props: [
      {
        name: 'items',
        type: 'readonly AccordionItem[]',
        description: 'Stable section ids, trigger labels, content, and availability.',
      },
      {
        name: 'type',
        type: "'single' | 'multiple'",
        defaultValue: "'multiple'",
        description: 'Defines whether sections coordinate to keep one or many open.',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Allows the final open section to close.',
      },
      {
        name: 'value / defaultValue',
        type: 'readonly string[]',
        description: 'Controlled or initial open section ids.',
      },
      {
        name: 'onValueChange',
        type: '(ids: string[]) => void',
        description: 'Reports coordinated expansion changes.',
      },
      {
        name: 'headingLevel',
        type: '2 | 3 | 4 | 5 | 6',
        defaultValue: '3',
        description: 'Preserves the surrounding heading hierarchy.',
      },
    ],
    variants: [
      'Multiple-open, single-open, and required-open groups.',
      'Collapsed, partially expanded, fully expanded, busy, and disabled states.',
    ],
    accessibility: [
      'Each section preserves Disclosure semantics.',
      'Heading levels fit the surrounding document.',
      'Open-state policy does not change keyboard focus order.',
    ],
    responsive: 'Sections wrap and reflow without hiding trigger labels or essential content.',
    theme: 'Composes Button, Disclosure, border, spacing, and text roles.',
    mistakes: [
      'Do not use for unrelated navigation destinations.',
      'Do not choose single-open solely to shorten a page.',
      'Do not skip heading levels.',
    ],
    related: ['disclosure', 'tabs'],
  }),
  createDoc({
    slug: 'pagination',
    title: 'Pagination',
    summary: 'Moves through a bounded result set while preserving data and focus context.',
    useCases: [
      'Numbered pages and sequential previous/next navigation for tables, grids, and collections.',
    ],
    importCode: "import { Pagination } from '@/components'",
    basicCode: `<Pagination page={page} pageCount={12} onPageChange={setPage} />`,
    props: [
      {
        name: 'page / pageCount',
        type: 'number / number | undefined',
        description: 'Current one-based page and optional known page count.',
      },
      {
        name: 'onPageChange',
        type: '(page: number) => void',
        description: 'Requests a valid destination page.',
      },
      {
        name: 'siblingCount',
        type: 'number',
        defaultValue: '1',
        description: 'Controls nearby numbered pages.',
      },
      {
        name: 'showPageNumbers',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Switches between numbered and sequential presentation.',
      },
      {
        name: 'hasNextPage / summary',
        type: 'boolean / ReactNode',
        description: 'Supports cursor pagination and a visible result-range summary.',
      },
      {
        name: 'label / disabled',
        type: 'string / boolean',
        description: 'Names the navigation and prevents requests while unavailable.',
      },
      classNameProp,
    ],
    variants: [
      'Numbered and sequential pagination.',
      'First, middle, last, loading, empty, error, and unknown-total experience states.',
    ],
    accessibility: [
      'Uses a named navigation landmark.',
      'Current page is exposed programmatically.',
      'Previous and next become unavailable at boundaries.',
    ],
    responsive: 'May simplify to sequential controls before labels or targets overlap.',
    theme: 'Composes Button, focus, selection, and semantic text roles.',
    mistakes: [
      'Do not use pagination for an unbounded activity stream.',
      'Do not reset filters or sort on page changes.',
      'Do not move focus to the page top by default.',
    ],
    related: ['table', 'data-grid', 'progress'],
  }),
  createDoc({
    slug: 'popover',
    title: 'Popover',
    summary:
      'Presents brief supplemental interactive content near a trigger without blocking the task.',
    useCases: [
      'Small reversible settings, supporting details, and structured information richer than a tooltip.',
    ],
    importCode: "import { Popover } from '@/components'",
    basicCode: `<Popover trigger={<Button>Display settings</Button>} title="Display settings">…</Popover>`,
    props: [
      {
        name: 'trigger / children',
        type: 'ReactElement / ReactNode',
        description: 'Controlling element and supplemental content.',
      },
      {
        name: 'title / description',
        type: 'ReactNode',
        description: 'Optional content name and concise purpose.',
      },
      {
        name: 'open / defaultOpen / onOpenChange',
        type: 'boolean / callback',
        description: 'Controlled or internal visibility.',
      },
      {
        name: 'initialFocus',
        type: "'trigger' | 'first'",
        defaultValue: "'trigger'",
        description: 'Chooses and documents one non-modal focus model.',
      },
      {
        name: 'placement / showCloseButton',
        type: 'OverlayPlacement / boolean',
        description: 'Controls preferred position and explicit dismissal.',
      },
      classNameProp,
    ],
    variants: [
      'Informational and interactive popovers.',
      'Closed, open, busy, error, repositioning, and closing states.',
    ],
    accessibility: [
      'Trigger exposes expanded and controlled relationships.',
      'No generic popover ARIA role is added.',
      'Escape restores trigger focus when focus moved inside.',
    ],
    responsive:
      'Repositions within the viewport and should transform to a drawer or dialog when content no longer fits.',
    theme: 'Uses the shared raised dropdown surface mapping.',
    mistakes: [
      'Do not use menu semantics for ordinary content.',
      'Do not place complex or consequential forms in a popover.',
      'Do not trap focus.',
    ],
    related: ['tooltip', 'overlay', 'drawer', 'modal'],
  }),
  createDoc({
    slug: 'toast',
    title: 'Toast and notification region',
    summary: 'Coordinates brief asynchronous outcomes without replacing the task or moving focus.',
    useCases: [
      'Transient completion, persistent failure or recovery, and understandable background progress.',
    ],
    importCode: "import { ToastRegion } from '@/components'",
    basicCode: `<ToastRegion toasts={notifications} onDismiss={dismissNotification} />`,
    props: [
      {
        name: 'toasts',
        type: 'readonly ToastMessage[]',
        description: 'Ordered notifications with stable operation ids.',
      },
      {
        name: 'onDismiss',
        type: '(id: string) => void',
        description: 'Removes one visible notification without cancelling its operation.',
      },
      {
        name: 'maxVisible',
        type: 'number',
        defaultValue: '3',
        description: 'Bounds the visible queue.',
      },
      {
        name: 'position',
        type: "'viewport' | 'container'",
        defaultValue: "'viewport'",
        description: 'Places the stable region globally or inside a positioned preview.',
      },
      {
        name: 'title / description / variant',
        type: 'ToastMessage fields',
        description: 'Names and explains one semantic outcome.',
      },
      {
        name: 'duration / action / progress',
        type: 'ToastMessage fields',
        description: 'Controls persistence, recovery, and in-place progress.',
      },
      classNameProp,
    ],
    variants: [
      'Transient, persistent, and progress toasts.',
      'Queued, visible, paused, updating, dismissing, and resolved states.',
    ],
    accessibility: [
      'Routine outcomes use polite status semantics.',
      'Urgent failures opt into alert semantics.',
      'Appearance and removal never move focus.',
    ],
    responsive:
      'Region avoids primary chrome and uses available width with page padding on narrow screens.',
    theme: 'Reuses Alert semantic variants and Progress styling.',
    mistakes: [
      'Do not use for validation or required instructions.',
      'Do not auto-dismiss a toast with an action.',
      'Do not add a second toast when an operation can update in place.',
    ],
    related: ['alert', 'progress', 'empty-state'],
  }),
  createDoc({
    slug: 'drawer',
    title: 'Drawer and sheet',
    summary:
      'Presents a focused task from a viewport edge while preserving its relationship to the current context.',
    useCases: ['Modal side drawers, non-modal inspectors, and modal bottom sheets.'],
    importCode: "import { Drawer } from '@/components'",
    basicCode: `<Drawer open={open} onClose={close} title="Project details">…</Drawer>`,
    props: [
      {
        name: 'open / onClose',
        type: 'boolean / callback',
        description: 'Controls the panel lifecycle.',
      },
      {
        name: 'title / description / children',
        type: 'ReactNode',
        description: 'Names and contains the focused task.',
      },
      {
        name: 'placement',
        type: "'start' | 'end' | 'bottom'",
        defaultValue: "'end'",
        description: 'Selects a logical drawer edge or bottom sheet.',
      },
      {
        name: 'modal',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Blocks background interaction or acts as a focused inspector.',
      },
      {
        name: 'busy / footer / returnFocusRef',
        type: 'boolean / ReactNode / RefObject',
        description: 'Preserves status, actions, and task return path.',
      },
      classNameProp,
    ],
    variants: [
      'Modal start/end drawer, non-modal inspector, and modal bottom sheet.',
      'Closed, open, resizing, busy, error, and closing states.',
    ],
    accessibility: [
      'Modal variants contain focus and make background content inert.',
      'Non-modal variants retain predictable surrounding access.',
      'Closing restores the trigger or logical continuation.',
    ],
    responsive:
      'Can transform between inspector, drawer, sheet, and page while preserving task state.',
    theme: 'Composes raised surface, overlay, border, shape, and dialog roles.',
    mistakes: [
      'Do not use an edge panel as generic page layout.',
      'Do not lock page scroll for non-modal inspectors.',
      'Do not rely on drag as the only close or resize method.',
    ],
    related: ['modal', 'alert-dialog', 'popover', 'navigation'],
  }),
  createDoc({
    slug: 'site-navigation',
    title: 'Public-site navigation',
    summary:
      'Presents public identity, destinations, current location, and one principal action responsively.',
    useCases: ['Commercial, marketing, and informational site headers.'],
    importCode: "import { SiteNavigation } from '@/components'",
    basicCode: `<SiteNavigation brand="Bento" items={links} currentHref={pathname} primaryAction={<Button>Start free</Button>} />`,
    props: [
      {
        name: 'brand / brandHref',
        type: 'ReactNode / string',
        description: 'Public identity and home destination.',
      },
      {
        name: 'items / currentHref',
        type: 'readonly SiteNavigationItem[] / string',
        description: 'Stable destinations and current-location state.',
      },
      {
        name: 'primaryAction / utilities',
        type: 'ReactNode',
        description: 'Main conversion action and secondary utilities.',
      },
      {
        name: 'navigationLabel',
        type: 'string',
        defaultValue: "'Primary navigation'",
        description: 'Names the navigation landmark and disclosure.',
      },
      classNameProp,
    ],
    variants: [
      'Inline, disclosure, modal, and sticky presentations.',
      'Default, focus, current, collapsed, expanded, and temporary states.',
    ],
    accessibility: [
      'Uses a named navigation landmark and aria-current.',
      'Disclosure preserves every destination and its order.',
      'Brand and destinations remain links rather than in-place actions.',
    ],
    responsive:
      'Moves destinations into an accessible disclosure before labels, brand, or actions overlap.',
    theme: 'Composes topbar, navigation-item, current-state, Button, and page-padding roles.',
    mistakes: [
      'Use Navigation Shell for authenticated workspaces.',
      'Do not hide destinations without an equivalent control.',
      'Do not style the current page as the primary action.',
    ],
    related: ['navigation', 'disclosure', 'drawer'],
  }),
  createDoc({
    slug: 'button',
    title: 'Button',
    summary:
      'Triggers one immediate action with a clear hierarchy and complete keyboard semantics.',
    useCases: [
      'Commit a form or focused task.',
      'Expose a supporting, low-emphasis, destructive, toggle, or disclosure action.',
    ],
    importCode: "import { Button } from '@/components'",
    basicCode: `<Button variant="primary" onClick={save}>Save changes</Button>`,
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
        defaultValue: "'primary'",
        description: 'Sets the semantic action hierarchy.',
      },
      {
        name: 'size',
        type: "'tiny' | 'small' | 'medium' | 'large' | 'extra-large'",
        defaultValue: "'medium'",
        description: 'Sets dimensions, typography, icon size, and icon/label gap.',
      },
      {
        name: 'iconOnly',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Makes the selected size square; requires an accessible name.',
      },
      {
        name: 'loading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Exposes busy state and prevents repeat activation.',
      },
      {
        name: 'icon / iconPosition',
        type: "ReactNode / 'start' | 'end'",
        description: 'Adds a decorative icon before or after the label.',
      },
      {
        name: '…button props',
        type: 'ButtonHTMLAttributes<HTMLButtonElement>',
        description: 'Forwards native button attributes and event handlers.',
      },
      classNameProp,
    ],
    variants: [
      'Primary, secondary, outline, ghost, and destructive treatments.',
      'Tiny, small, medium, large, and extra-large sizes with independent icon-only presentation.',
      'Default, hover, focus, active, loading, disabled, pressed, and expanded states.',
    ],
    accessibility: [
      'Uses a native button, so Enter and Space activate it.',
      'Icon-only buttons need an accessible name.',
      'Use aria-pressed for toggles and aria-expanded with aria-controls for disclosures.',
    ],
    responsive:
      'Use tiny and small in dense interfaces only when a non-overlapping 44px target is available. Medium is the default; reserve extra-large for one public-facing CTA group.',
    theme:
      'Every variant uses semantic action tokens; focus remains visible in light and demo dark themes.',
    mistakes: [
      'Do not use a button for navigation.',
      'Do not use large or extra-large sizing for dashboard toolbars or repeated actions.',
      'Do not remove the label during loading.',
      'Name the destructive outcome instead of relying on red.',
    ],
    related: ['modal', 'dropdown', 'progress'],
  }),
  createDoc({
    slug: 'input',
    title: 'Input',
    summary: 'Collects short, structured text with persistent guidance and validation.',
    useCases: ['Names, email addresses, search, codes, dates, and other single-line values.'],
    importCode: "import { Input } from '@/components'",
    basicCode: `<Input label="Project name" helperText="Visible to your team." />`,
    props: [
      { name: 'label', type: 'string', description: 'Required visible and accessible label.' },
      {
        name: 'size',
        type: "'small' | 'medium'",
        defaultValue: "'medium'",
        description: 'Aligns compact filters and standard fields with shared control heights.',
      },
      {
        name: 'variant',
        type: "'default' | 'search'",
        defaultValue: "'default'",
        description: 'Applies standard or utility-search surface styling.',
      },
      {
        name: 'helperText / error',
        type: 'string',
        description: 'Connects persistent guidance or the current error.',
      },
      {
        name: 'status',
        type: "'default' | 'success' | 'warning' | 'invalid'",
        defaultValue: "'default'",
        description: 'Selects a semantic boundary and message state.',
      },
      {
        name: '…input props',
        type: 'InputHTMLAttributes<HTMLInputElement>',
        description:
          'Forwards type, autocomplete, required, readOnly, disabled, and native events.',
      },
      classNameProp,
    ],
    variants: [
      'Medium, small, and search.',
      'Empty, populated, read-only, invalid, warning, success, and disabled states.',
    ],
    accessibility: [
      'The visible label is explicitly associated with the input.',
      'Helper and error text use programmatic descriptions; errors expose invalid state.',
      'Choose the correct native type and autocomplete value.',
    ],
    responsive:
      'Fields fill their container; labels, help, and errors wrap. Prefer medium height when touch input is expected.',
    theme: 'Surface, text, border, disabled, validation, and focus roles are semantic tokens.',
    mistakes: [
      'A placeholder is not a label.',
      'Do not use disabled when a value should remain focusable and copyable.',
      'Do not erase the value during validation.',
    ],
    related: ['form-field', 'textarea', 'select', 'combobox'],
  }),
  createDoc({
    slug: 'textarea',
    title: 'Textarea',
    summary: 'Collects plain multi-line text while preserving line breaks and resize access.',
    useCases: ['Descriptions, notes, feedback, and other values where line breaks matter.'],
    importCode: "import { Textarea } from '@/components'",
    basicCode: `<Textarea label="Description" maxLength={240} />`,
    props: [
      { name: 'label', type: 'string', description: 'Required visible label.' },
      {
        name: 'autoGrow',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Signals a content-growing treatment while retaining resize access.',
      },
      {
        name: 'helperText / error',
        type: 'string',
        description: 'Persistent guidance or current validation error.',
      },
      {
        name: 'status',
        type: 'FieldStatus',
        defaultValue: "'default'",
        description: 'Semantic validation state.',
      },
      {
        name: '…textarea props',
        type: 'TextareaHTMLAttributes<HTMLTextAreaElement>',
        description: 'Forwards maxLength, rows, required, readOnly, disabled, and native events.',
      },
      classNameProp,
    ],
    variants: [
      'Resizable fixed-height and bounded content-growing treatments.',
      'Read-only, invalid, warning, success, busy, and disabled states.',
    ],
    accessibility: [
      'Uses a native textarea with explicit label and descriptions.',
      'Character limits remain exposed through the native maxLength contract.',
      'Browser resize behavior remains available.',
    ],
    responsive: 'Fills available form width and lets labels, counts, long text, and errors wrap.',
    theme: 'Uses the text-field surface, boundary, focus, and validation roles.',
    mistakes: [
      'Do not use for formatted rich text.',
      'Do not silently truncate at the character limit.',
      'Do not disable resizing without an equivalent way to reach content.',
    ],
    related: ['form-field', 'input'],
  }),
  createDoc({
    slug: 'select',
    title: 'Select',
    summary: 'Chooses one value from a stable set using the platform-native selection control.',
    useCases: ['Moderately sized predetermined lists that do not need filtering.'],
    importCode: "import { Select } from '@/components'",
    basicCode: `<Select label="Status" options={[{ value: 'active', label: 'Active' }]} />`,
    props: [
      { name: 'label', type: 'string', description: 'Required visible label.' },
      {
        name: 'options',
        type: 'readonly SelectOption[]',
        description: 'Values, labels, and optional disabled state.',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Optional prompt; it is not a selected value when required.',
      },
      {
        name: 'size',
        type: "'small' | 'medium'",
        defaultValue: "'medium'",
        description: 'Aligns compact and standard native selects with shared control heights.',
      },
      {
        name: 'helperText / error',
        type: 'string',
        description: 'Associated guidance or validation.',
      },
      {
        name: '…select props',
        type: 'SelectHTMLAttributes<HTMLSelectElement>',
        description: 'Forwards native value, defaultValue, onChange, required, and disabled.',
      },
      classNameProp,
    ],
    variants: [
      'Small and medium native selects.',
      'Unselected, selected, focus, invalid, and disabled states.',
    ],
    accessibility: [
      'Native select semantics expose name, choices, value, and keyboard behavior.',
      'The visible label and descriptions are explicitly related.',
      'Disabled options remain visible but unavailable.',
    ],
    responsive: 'The control stays within its container; option rendering follows the platform.',
    theme: 'Uses semantic field surfaces, validation borders, text, and focus.',
    mistakes: [
      'Use RadioGroup when a short list benefits from simultaneous visibility.',
      'Use Combobox when filtering or text entry is needed.',
      'Do not treat placeholder copy as a valid required value.',
    ],
    related: ['form-field', 'radio-group', 'combobox', 'listbox'],
  }),
  createDoc({
    slug: 'listbox',
    title: 'Listbox',
    summary: 'Presents a visible list of selectable values with managed active-option navigation.',
    useCases: [
      'Persistent or popup single selection.',
      'Multiple selection where options need simultaneous visibility.',
    ],
    importCode: "import { Listbox } from '@/components'",
    basicCode: `<Listbox label="Owners" options={people} multiple />`,
    props: [
      { name: 'label', type: 'string', description: 'Accessible visible name.' },
      {
        name: 'options',
        type: 'readonly ListboxOption[]',
        description: 'Selectable values, labels, descriptions, and disabled state.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Enables independent multi-selection.',
      },
      {
        name: 'value / defaultValue',
        type: 'string | readonly string[]',
        description: 'Controlled or initial selection.',
      },
      {
        name: 'onValueChange',
        type: '(value: string | string[]) => void',
        description: 'Reports committed selection.',
      },
      {
        name: 'loading / error',
        type: 'boolean / string',
        description: 'Exposes async and failure states.',
      },
      classNameProp,
    ],
    variants: [
      'Single and multiple selection.',
      'Active, selected, checked, disabled, loading, empty, and error states.',
    ],
    accessibility: [
      'Arrow keys, Home, End, Enter, Space, and type-ahead are supported.',
      'Active option and selected values are exposed separately.',
      'The listbox owns one page tab stop through aria-activedescendant.',
    ],
    responsive:
      'The list scrolls internally when necessary while remaining within available width.',
    theme:
      'Popup surface, selection, action-hover, focus, and disabled tokens retain state distinctions.',
    mistakes: [
      'Do not use listbox options for unrelated commands.',
      'Do not confuse focus with selection.',
      'Prefer a native select when it satisfies the task.',
    ],
    related: ['select', 'combobox', 'dropdown', 'overlay', 'progress', 'empty-state'],
  }),
  createDoc({
    slug: 'combobox',
    title: 'Combobox',
    summary: 'Combines text entry with a filtered list of selectable suggestions.',
    useCases: [
      'Search and select from long directories.',
      'Optional free-form entry with relevant suggestions.',
    ],
    importCode: "import { Combobox } from '@/components'",
    basicCode: `<Combobox label="Owner" options={people} />`,
    props: [
      { name: 'label', type: 'string', description: 'Required visible label.' },
      {
        name: 'options',
        type: 'readonly ListboxOption[]',
        description: 'Suggestions and selectable values.',
      },
      {
        name: 'value / defaultValue',
        type: 'string',
        description: 'Controlled or initial selected value.',
      },
      {
        name: 'allowCustomValue',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Allows a value outside the options.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Reports selected or custom value.',
      },
      {
        name: 'loading / emptyMessage / error',
        type: 'boolean / string / string',
        description: 'Async, empty, and validation feedback.',
      },
      classNameProp,
    ],
    variants: [
      'Selection-only and explicit free-form entry.',
      'Collapsed, expanded, typing, loading, active, selected, empty, invalid, and disabled states.',
    ],
    accessibility: [
      'Exposes combobox, listbox, expanded, controlled, autocomplete, and active-descendant relationships.',
      'Native text editing keys remain available.',
      'Arrow keys navigate active suggestions; Enter commits; Escape closes and restores policy.',
    ],
    responsive:
      'The anchored popup uses the field width and scrolls instead of clipping long result sets.',
    theme: 'Combines text-field tokens with the dropdown surface and listbox states.',
    mistakes: [
      'Do not accept arbitrary input unless the variant explicitly allows it.',
      'Do not announce every arrow-key movement.',
      'Use Select if editable filtering is unnecessary.',
    ],
    related: ['form-field', 'input', 'select', 'listbox', 'overlay', 'progress', 'empty-state'],
  }),
  createDoc({
    slug: 'checkbox',
    title: 'Checkbox',
    summary: 'Represents an independent binary choice or one independent choice in a set.',
    useCases: ['Form options, bulk selection, or independent notification channels.'],
    importCode: "import { Checkbox } from '@/components'",
    basicCode: `<Checkbox label="Email notifications" defaultChecked />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible label that activates the input.' },
      {
        name: 'description / error',
        type: 'string',
        description: 'Associated context or validation.',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Sets the native mixed summary state.',
      },
      {
        name: '…input props',
        type: 'InputHTMLAttributes<HTMLInputElement>',
        description: 'Forwards checked, defaultChecked, onChange, required, and disabled.',
      },
      classNameProp,
    ],
    variants: [
      'Unchecked, checked, and indeterminate.',
      'Hover, focus, invalid, and disabled states.',
    ],
    accessibility: [
      'Uses a native checkbox and native mixed DOM state.',
      'The indicator and visible label share one touch-friendly target.',
      'Shape and checkmark communicate state without color alone.',
    ],
    responsive: 'Labels and descriptions wrap without breaking the activation relationship.',
    theme: 'Selected action, neutral boundary, disabled, validation, and focus roles are semantic.',
    mistakes: [
      'Indeterminate is a summary, not automatically a third submitted value.',
      'Use RadioGroup for one mutually exclusive choice.',
      'Do not separate the label from the target.',
    ],
    related: ['form-field', 'radio-group', 'switch'],
  }),
  createDoc({
    slug: 'radio-group',
    title: 'Radio group',
    summary:
      'Selects exactly one value from a short set whose options benefit from being visible together.',
    useCases: ['Billing interval, plan type, or another short mutually exclusive choice.'],
    importCode: "import { RadioGroup } from '@/components'",
    basicCode: `<RadioGroup label="Interval" options={intervals} />`,
    props: [
      { name: 'label', type: 'string', description: 'Group legend and accessible name.' },
      {
        name: 'options',
        type: 'readonly RadioOption[]',
        description: 'Values, labels, descriptions, and option availability.',
      },
      {
        name: 'value / defaultValue',
        type: 'string',
        description: 'Controlled or initial selection.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'vertical'",
        description: 'Changes layout without changing option order.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Reports the selected option.',
      },
      {
        name: 'description / error',
        type: 'string',
        description: 'Group-level guidance or validation.',
      },
      classNameProp,
    ],
    variants: [
      'Horizontal and vertical layouts.',
      'Unselected, selected, focus, invalid, disabled option, and disabled group states.',
    ],
    accessibility: [
      'Uses fieldset, legend, and native radios with one shared name.',
      'Arrow-key behavior follows the browser and platform convention.',
      'The selected state uses both shape and color.',
    ],
    responsive: 'Choose vertical layout when labels wrap or horizontal space is constrained.',
    theme: 'Action-selected, neutral boundary, focus, disabled, and danger roles remain distinct.',
    mistakes: [
      'Do not use for a long compact list.',
      'Do not give each option a different group name.',
      'Do not reorder options visually.',
    ],
    related: ['form-field', 'select', 'checkbox'],
  }),
  createDoc({
    slug: 'switch',
    title: 'Switch',
    summary: 'Changes a persistent setting between on and off, normally with immediate effect.',
    useCases: ['Settings that save immediately, such as notifications or visibility.'],
    importCode: "import { Switch } from '@/components'",
    basicCode: `<Switch label="Email notifications" defaultChecked />`,
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Stable setting name; it does not change with state.',
      },
      {
        name: 'description / error',
        type: 'string',
        description: 'Current consequence or failure message.',
      },
      {
        name: 'busy',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Exposes pending state and prevents duplicate changes.',
      },
      {
        name: '…input props',
        type: 'InputHTMLAttributes<HTMLInputElement>',
        description: 'Forwards checked, defaultChecked, onChange, and disabled.',
      },
      classNameProp,
    ],
    variants: ['Off and on.', 'Hover, focus, busy, error, and disabled states.'],
    accessibility: [
      'Exposes role switch and the native checked state.',
      'Space toggles; the label activates the same control.',
      'Position and shape supplement color.',
    ],
    responsive: 'The row wraps or stacks naturally while preserving a minimum target.',
    theme: 'On, off, boundary, text, disabled, and focus states use semantic roles.',
    mistakes: [
      'Use Checkbox for a value committed by a later form submission.',
      'Do not change the visible label between on and off.',
      'Restore the prior state and explain async failures.',
    ],
    related: ['form-field', 'checkbox', 'alert'],
  }),
  createDoc({
    slug: 'modal',
    title: 'Dialog and modal',
    summary:
      'Creates a short focused task surface with explicit modal or non-modal behavior and focus recovery.',
    useCases: ['Short focused forms and supporting tasks that return to the invoking context.'],
    importCode: "import { Modal } from '@/components'",
    basicCode: `<Modal open={open} onClose={close} title="Create project">…</Modal>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Controls whether the modal is present.' },
      { name: 'onClose', type: '() => void', description: 'Handles permitted dismissal.' },
      {
        name: 'title / description',
        type: 'string',
        description: 'Programmatic dialog name and optional description.',
      },
      { name: 'footer', type: 'ReactNode', description: 'Right-aligned action row.' },
      {
        name: 'initialFocusRef / returnFocusRef',
        type: 'RefObject<HTMLElement | null>',
        description: 'Overrides initial and restored focus targets.',
      },
      {
        name: 'closeOnBackdrop / closeOnEscape',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Configures safe dismissal.',
      },
      {
        name: 'busy',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Blocks dismissal while an essential operation is pending.',
      },
      {
        name: 'modal / role',
        type: "boolean / 'dialog' | 'alertdialog'",
        defaultValue: "true / 'dialog'",
        description: 'Selects blocking behavior and the specialized dialog role.',
      },
      {
        name: 'presentation',
        type: "'center' | 'drawer-start' | 'drawer-end' | 'sheet'",
        defaultValue: "'center'",
        description: 'Adapts the shared dialog foundation to centered and edge presentations.',
      },
      classNameProp,
    ],
    variants: [
      'Modal and non-modal focused dialogs.',
      'Closed and open, with optional opening, busy, error, and closing content states.',
      'Safe-dismiss and explicit-dismiss policies.',
    ],
    accessibility: [
      'Uses native dialog behavior; modal variants contain focus and make the background inert.',
      'Connects title and description; Escape follows the configured policy.',
      'Closing restores focus to the invoking or captured element.',
    ],
    responsive:
      'Uses available width up to the narrow content token with viewport padding and vertical scrolling.',
    theme:
      'Overlay, raised surface, secondary border, XL radius, and focus roles come from semantic tokens.',
    mistakes: [
      'Do not use for a full page or long multi-step task.',
      'Disable backdrop dismissal when abandoning content could lose data.',
      'Keep Cancel available for destructive confirmations.',
    ],
    related: ['button', 'alert', 'alert-dialog', 'drawer'],
  }),
  createDoc({
    slug: 'tabs',
    title: 'Tabs',
    summary: 'Switches between peer views of the same context with roving keyboard focus.',
    useCases: ['Overview, activity, and settings views of one entity.'],
    importCode: "import { Tabs } from '@/components'",
    basicCode: `<Tabs label="Project views" items={views} />`,
    props: [
      { name: 'label', type: 'string', description: 'Accessible tab-list name.' },
      {
        name: 'items',
        type: 'readonly TabItem[]',
        description: 'IDs, labels, panels, and optional disabled state.',
      },
      {
        name: 'value / defaultValue',
        type: 'string',
        description: 'Controlled or initial selected tab.',
      },
      {
        name: 'activation',
        type: "'automatic' | 'manual'",
        defaultValue: "'automatic'",
        description: 'Determines whether focus or an activation key selects.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Sets layout and arrow-key axis.',
      },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Reports selection.' },
      classNameProp,
    ],
    variants: [
      'Horizontal and vertical.',
      'Automatic and manual activation.',
      'Default, hover, focus, selected, and disabled states.',
    ],
    accessibility: [
      'Implements tablist, tab, and tabpanel relationships with managed tab stops.',
      'Arrow keys, Home, and End move focus; Enter or Space selects in manual mode.',
      'A line indicator supplements selected color.',
    ],
    responsive:
      'Horizontal tabs scroll in a contained region rather than wrapping into ambiguous rows.',
    theme: 'Default, hover, selected, focus, surface, and indicator colors use semantic tokens.',
    mistakes: [
      'Do not use tabs for global navigation or sequential steps.',
      'Do not use automatic activation if panels load slowly.',
      'Keep selection and focus conceptually distinct.',
    ],
    related: ['navigation'],
  }),
  createDoc({
    slug: 'table',
    title: 'Table',
    summary:
      'Presents relational data with native row and column semantics, sorting, and optional selection.',
    useCases: ['Scannable records where comparison across columns matters.'],
    importCode: "import { Table } from '@/components'",
    basicCode: `<Table caption="Projects" columns={columns} rows={rows} getRowId={(row) => row.id} />`,
    props: [
      { name: 'caption', type: 'string', description: 'Accessible table name.' },
      {
        name: 'columns',
        type: 'readonly TableColumn<T>[]',
        description: 'Headers, cell renderers, numeric alignment, and sortable state.',
      },
      {
        name: 'rows / getRowId',
        type: 'readonly T[] / (row: T) => string',
        description: 'Data and stable row identity.',
      },
      {
        name: 'sort / onSort',
        type: 'Sort state / callback',
        description: 'Controlled active sort and direction.',
      },
      {
        name: 'selectedRowIds / onSelectionChange',
        type: 'readonly string[] / callback',
        description: 'Optional explicit row selection.',
      },
      {
        name: 'loading / error / emptyMessage',
        type: 'boolean / ReactNode / ReactNode',
        description: 'Distinct data availability states.',
      },
      {
        name: 'toolbar',
        type: 'ReactNode',
        description: 'Optional labelled controls above the table.',
      },
      classNameProp,
    ],
    variants: [
      'Static and selectable data tables.',
      'Sorted, loading, empty, error, selected, and hover states.',
    ],
    accessibility: [
      'Uses native table, caption, headers, cells, and aria-sort.',
      'Selection controls include record context.',
      'Numeric cells use consistent alignment and tabular numerals.',
    ],
    responsive:
      'Prioritizes data, then uses contained horizontal scrolling without forcing page overflow.',
    theme: 'Header, row, hover, selected, and boundary tokens map directly to the table contract.',
    mistakes: [
      'Do not apply grid semantics without managed cell navigation.',
      'Do not make whole rows ambiguous actions.',
      'Do not remove headers while refreshing.',
    ],
    related: ['data-grid', 'status-badge', 'pagination', 'progress', 'empty-state'],
  }),
  createDoc({
    slug: 'data-grid',
    title: 'Data grid',
    summary:
      'Adds managed two-dimensional focus, row selection, and optional cell editing to tabular data.',
    useCases: [
      'Large datasets where people need efficient cell navigation, selection, or inline editing.',
    ],
    importCode: "import { DataGrid } from '@/components'",
    basicCode: `<DataGrid label="Projects" columns={columns} rows={rows} getRowId={(row) => row.id} />`,
    props: [
      { name: 'label', type: 'string', description: 'Accessible grid name.' },
      {
        name: 'columns',
        type: 'readonly DataGridColumn<T>[]',
        description: 'Cell renderers and optional editor renderers.',
      },
      {
        name: 'rows / getRowId',
        type: 'readonly T[] / (row: T) => string',
        description: 'Data and stable identity.',
      },
      {
        name: 'selectable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Enables Space-based row selection.',
      },
      {
        name: 'selectedRowIds / onSelectionChange',
        type: 'readonly string[] / callback',
        description: 'Controlled selection.',
      },
      {
        name: 'loading / emptyMessage',
        type: 'boolean / ReactNode',
        description: 'Data availability state.',
      },
      classNameProp,
    ],
    variants: [
      'Read-only, selectable, and editable cells.',
      'Focused, selected, editing, loading, and empty states.',
    ],
    accessibility: [
      'Only one cell is in the page tab sequence.',
      'Arrow keys move between cells; Home and End move within the row.',
      'Enter enters configured edit mode, Escape exits, and Space selects a row.',
    ],
    responsive:
      'Keeps grid navigation intact inside contained horizontal scrolling; prioritize essential columns first.',
    theme: 'Shares table roles while focus, selection, and validation remain distinct.',
    mistakes: [
      'Use Table when managed cell navigation is unnecessary.',
      'Do not add grid semantics just to reduce tab stops.',
      'Provide non-drag alternatives for resizing or rearranging.',
    ],
    related: ['table', 'input', 'pagination', 'progress', 'empty-state'],
  }),
  createDoc({
    slug: 'status-badge',
    title: 'Status badge',
    summary: 'Communicates persistent entity or workflow state with a required text label.',
    useCases: ['Active, pending, blocked, in-review, and draft states.'],
    importCode: "import { StatusBadge } from '@/components'",
    basicCode: `<StatusBadge variant="positive">Active</StatusBadge>`,
    props: [
      {
        name: 'variant',
        type: "'positive' | 'warning' | 'negative' | 'info' | 'neutral'",
        defaultValue: "'neutral'",
        description: 'Maps persistent meaning to the correct status token family.',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional decorative icon; text remains required.',
      },
      { name: 'children', type: 'ReactNode', description: 'Required visible status label.' },
      {
        name: '…span props',
        type: 'HTMLAttributes<HTMLSpanElement>',
        description: 'Forwards non-interactive span attributes.',
      },
      classNameProp,
    ],
    variants: [
      'Positive, warning, negative, info, and neutral.',
      'Informational only—no hover, focus, or active states.',
    ],
    accessibility: [
      'Always include text; icons or dots are supplementary.',
      'Important dynamic changes use surrounding announcement logic rather than making every badge live.',
      'The component intentionally has no interaction semantics.',
    ],
    responsive:
      'Preserves the label on narrow screens rather than collapsing to an unexplained dot.',
    theme: 'Each variant uses its matching status foreground, background, and border roles.',
    mistakes: [
      'Do not use for transient operation feedback.',
      'Do not make the badge itself a filter or link.',
      'Do not communicate status by color alone.',
    ],
    related: ['alert', 'table'],
  }),
  createDoc({
    slug: 'alert',
    title: 'Alert',
    summary:
      'Communicates contextual information, warnings, outcomes, failures, and available recovery.',
    useCases: ['Inline notices, save confirmation, warnings, and recoverable errors.'],
    importCode: "import { Alert } from '@/components'",
    basicCode: `<Alert variant="success" title="Changes saved">Settings are current.</Alert>`,
    props: [
      {
        name: 'variant',
        type: "'success' | 'warning' | 'danger' | 'info'",
        defaultValue: "'info'",
        description: 'Sets the feedback—not status—meaning.',
      },
      { name: 'title', type: 'ReactNode', description: 'Concise summary.' },
      {
        name: 'urgent',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Uses an urgent alert announcement instead of status.',
      },
      { name: 'action', type: 'ReactNode', description: 'Optional recovery or next action.' },
      {
        name: 'dismissible / onDismiss',
        type: 'boolean / () => void',
        description: 'Adds a labelled close action and notification.',
      },
      { name: 'children', type: 'ReactNode', description: 'Message body.' },
      classNameProp,
    ],
    variants: [
      'Success, warning, danger, and info.',
      'Current, dismissible, urgent, non-urgent, and resolved states.',
    ],
    accessibility: [
      'New urgent messages use alert; non-urgent updates use status.',
      'The semantic icon and text provide non-color severity cues.',
      'Dismiss controls are labelled with alert context.',
    ],
    responsive:
      'Content and actions wrap; actions can stack below the message in constrained space.',
    theme: 'Uses feedback foreground, background, and border roles—not persistent status roles.',
    mistakes: [
      'Do not mark routine static guidance urgent.',
      'Do not dismiss the only recovery path.',
      'Do not use a status badge for a transient failure.',
    ],
    related: ['status-badge', 'button', 'toast'],
  }),
  createDoc({
    slug: 'dropdown',
    title: 'Dropdown',
    summary:
      'Provides the shared raised popup surface as an accessible action-menu implementation.',
    useCases: ['Short command menus such as Rename, Duplicate, Archive, and Delete.'],
    importCode: "import { Dropdown } from '@/components'",
    basicCode: `<Dropdown label="Project actions" items={actions} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible trigger label and menu name.' },
      {
        name: 'items',
        type: 'readonly DropdownItem[]',
        description: 'Commands with stable IDs, labels, availability, and handlers.',
      },
      {
        name: 'buttonProps',
        type: 'Omit<ButtonProps, controlled trigger props>',
        description: 'Configures the real Button trigger.',
      },
      {
        name: 'align',
        type: "'start' | 'end'",
        defaultValue: "'start'",
        description: 'Aligns the popup to a trigger edge.',
      },
      classNameProp,
    ],
    variants: [
      'Action menu with normal, destructive, and disabled commands.',
      'Closed and open states with active item focus.',
    ],
    accessibility: [
      'Trigger exposes menu popup and expanded state.',
      'Arrow keys, Home, End, Escape, Tab, and native activation are supported.',
      'Escape closes and restores trigger focus; outside activation dismisses.',
    ],
    responsive:
      'The menu sizes to content; use a dialog or bottom sheet if touch targets cannot fit the viewport.',
    theme: 'Uses raised surface, quiet boundary, ghost hover/focus, danger text, and focus tokens.',
    mistakes: [
      'Dropdown is not one universal behavior.',
      'Use Listbox for selection and Combobox for editable suggestions.',
      'Do not assign menu roles to ordinary navigation.',
    ],
    related: ['button', 'listbox', 'combobox', 'overlay', 'tooltip', 'popover'],
  }),
  createDoc({
    slug: 'navigation',
    title: 'Navigation shell',
    summary:
      'Provides stable destinations, global utilities, a collapsible desktop sidebar, and modal mobile navigation.',
    useCases: [
      'Application and admin shells where navigation must coexist with a fluid workspace.',
    ],
    importCode: "import { NavigationShell } from '@/components'",
    basicCode: `<NavigationShell brand="Bento" items={items} currentHref={pathname}>…</NavigationShell>`,
    props: [
      { name: 'brand', type: 'ReactNode', description: 'Product or system identity.' },
      {
        name: 'items',
        type: 'readonly NavigationItem[]',
        description: 'Stable destination labels, hrefs, and optional icons.',
      },
      {
        name: 'currentHref',
        type: 'string',
        description: 'Marks the current destination programmatically and visually.',
      },
      {
        name: 'utilities',
        type: 'ReactNode',
        description: 'Account, help, notifications, or global actions.',
      },
      {
        name: 'collapsed / onCollapsedChange',
        type: 'boolean / callback',
        description: 'Controlled or internal desktop sidebar state.',
      },
      {
        name: 'navigationLabel',
        type: 'string',
        defaultValue: "'Primary navigation'",
        description: 'Names the navigation landmark and mobile dialog.',
      },
      {
        name: 'mainContentId',
        type: 'string',
        defaultValue: "'main-content'",
        description: 'Provides the stable fragment target for the main content landmark.',
      },
      {
        name: 'skipToMainLabel',
        type: 'string',
        defaultValue: "'Skip to main content'",
        description: 'Labels the bypass link and supports localization.',
      },
      classNameProp,
    ],
    variants: [
      'Expanded and collapsed persistent sidebar.',
      'Temporary modal navigation at mobile and tablet widths.',
      'Default, hover, focus, and current destination states.',
    ],
    accessibility: [
      'A focus-revealed bypass link is the first focusable element and moves focus to main content.',
      'Uses named navigation landmarks and aria-current.',
      'Collapsed links retain names through title and accessible text.',
      'Mobile navigation moves focus inside, contains it, closes on Escape, and restores the trigger.',
    ],
    responsive:
      'At mobile and tablet widths the sidebar becomes temporary navigation; at desktop and wide widths it may remain persistent when the dashboard still has sufficient room.',
    theme:
      'Sidebar, item, selected, topbar, boundary, and focus roles map directly to navigation tokens.',
    mistakes: [
      'Do not style the current route as a primary action.',
      'Do not remove destination names from the accessible tree when collapsed.',
      'Do not place a squeezed persistent sidebar beside a narrow dashboard.',
    ],
    related: ['tabs', 'button', 'disclosure', 'drawer', 'site-navigation', 'tooltip'],
  }),
  createDoc({
    slug: 'card',
    title: 'Card',
    summary: 'Groups related content when a quiet boundary materially improves comprehension.',
    useCases: ['Bounded summaries, project groups, and compact metric or statistic cards.'],
    importCode: "import { Card, StatCard } from '@/components'",
    basicCode: `<Card heading={<h2>Project brief</h2>}>…</Card>`,
    props: [
      {
        name: 'compact',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Uses compact padding and radius.',
      },
      {
        name: 'heading / footer',
        type: 'ReactNode',
        description: 'Optional structured header and footer regions.',
      },
      {
        name: 'as',
        type: "'article' | 'section'",
        defaultValue: "'section'",
        description: 'Chooses the semantic container.',
      },
      {
        name: 'label / value / metadata',
        type: 'StatCard props',
        description: 'Statistic-card content with tabular numeric emphasis.',
      },
      {
        name: '…element props',
        type: 'HTMLAttributes<HTMLElement>',
        description: 'Forwards semantic element attributes.',
      },
      classNameProp,
    ],
    variants: [
      'Standard, compact, and statistic cards.',
      'Static by default; loading, empty, and error content follow data-display patterns.',
    ],
    accessibility: [
      'Choose a section or article and preserve heading hierarchy.',
      'A static card has no interaction or hover state.',
      'Whole-card actions must not contain conflicting nested controls.',
    ],
    responsive: 'Card grids reflow before values or labels become hard to scan.',
    theme: 'Uses primary surface, quiet boundary, semantic text, radii, and spacing roles.',
    mistakes: [
      'Do not wrap every region in a card.',
      'Do not use elevation to imply missing interaction.',
      'Keep multiple actions separate instead of making the whole card clickable.',
    ],
    related: ['status-badge', 'table', 'empty-state'],
  }),
] as const satisfies readonly ComponentDocumentation[]

export const componentDocsBySlug = new Map(
  componentDocs.map((component) => [component.slug, component]),
)
