/* eslint-disable react-refresh/only-export-components */
import { useRef, useState, type ReactNode } from 'react'
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Breadcrumb,
  Card,
  Checkbox,
  Combobox,
  DataGrid,
  Disclosure,
  Drawer,
  Dropdown,
  EmptyState,
  Input,
  InputGroup,
  Listbox,
  Link,
  LinkButton,
  Modal,
  NavigationShell,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Select,
  SiteNavigation,
  SkipLink,
  Slider,
  StatCard,
  StatusBadge,
  Switch,
  Table,
  Tabs,
  Textarea,
  ToastRegion,
  Tooltip,
  type ToastMessage,
  type DataGridColumn,
  type DataGridSortDirection,
  type TableColumn,
} from '../../components'

const people = [
  { value: 'amara', label: 'Amara Chen', description: 'Design' },
  { value: 'jon', label: 'Jon Bell', description: 'Engineering' },
  { value: 'noor', label: 'Noor Singh', description: 'Research' },
]

type Customer = {
  id: string
  name: string
  plan: 'Basic' | 'Pro'
  status: 'Active' | 'Paused'
  monthlyFee: number
}

const customers: Customer[] = [
  { id: 'ana', name: 'Ana', plan: 'Pro', status: 'Active', monthlyFee: 49 },
  { id: 'ben', name: 'Ben', plan: 'Basic', status: 'Paused', monthlyFee: 19 },
  { id: 'chen', name: 'Chen', plan: 'Pro', status: 'Active', monthlyFee: 49 },
  { id: 'diego', name: 'Diego', plan: 'Basic', status: 'Active', monthlyFee: 19 },
  { id: 'ellis', name: 'Ellis', plan: 'Pro', status: 'Paused', monthlyFee: 49 },
  { id: 'farah', name: 'Farah', plan: 'Basic', status: 'Active', monthlyFee: 19 },
]

const ArrowIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
)

const SearchIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m16 16 4 4" />
  </svg>
)

const customerTableColumns: TableColumn<Customer>[] = [
  { id: 'name', header: 'Customer', cell: (customer) => customer.name },
  { id: 'plan', header: 'Plan', cell: (customer) => customer.plan },
  {
    id: 'monthly-fee',
    header: 'Monthly fee',
    cell: (customer) => `$${customer.monthlyFee}`,
    numeric: true,
  },
]

function ModalExample() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        returnFocusRef={triggerRef}
        title="Create project"
        description="Add a clear name now; details can follow."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Create project</Button>
          </>
        }
      >
        <Input label="Project name" placeholder="Northstar" autoFocus />
      </Modal>
    </>
  )
}

function TableExample() {
  return (
    <div className="grid gap-space-3">
      <Table
        caption="Customer plan report"
        columns={customerTableColumns}
        rows={customers.slice(0, 3)}
        getRowId={(customer) => customer.id}
      />
      <p className="m-0 text-body-sm text-text-secondary">
        <strong className="font-semibold text-text-primary">Table:</strong> best for simple
        presentation, reports, and small datasets. People scan and compare these values; the cells
        do not receive managed focus.
      </p>
    </div>
  )
}

function DataGridExample() {
  const [selected, setSelected] = useState<string[]>([])
  const [gridRows, setGridRows] = useState(customers)
  const [query, setQuery] = useState('')
  const [plan, setPlan] = useState<'all' | Customer['plan']>('all')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{
    columnId: string
    direction: DataGridSortDirection
  }>({ columnId: 'name', direction: 'ascending' })
  const [gridMessage, setGridMessage] = useState('')
  const visibleCustomers = gridRows.filter(
    (customer) =>
      customer.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) &&
      (plan === 'all' || customer.plan === plan),
  )
  const sortedCustomers = [...visibleCustomers].sort((first, second) => {
    const comparison = first.name.localeCompare(second.name)
    return sort.direction === 'ascending' ? comparison : -comparison
  })
  const pageSize = 3
  const pageCustomers = sortedCustomers.slice((page - 1) * pageSize, page * pageSize)
  const gridColumns: DataGridColumn<Customer>[] = [
    { id: 'name', header: 'Customer', cell: (customer) => customer.name, sortable: true },
    { id: 'plan', header: 'Plan', cell: (customer) => customer.plan },
    {
      id: 'status',
      header: (
        <span>
          Status <span className="font-normal text-text-tertiary">(editable)</span>
        </span>
      ),
      cell: (customer) => (
        <StatusBadge variant={customer.status === 'Active' ? 'positive' : 'neutral'}>
          {customer.status}
        </StatusBadge>
      ),
      edit: (customer, finish) => (
        <form
          className="flex min-w-48 items-center gap-space-2"
          onSubmit={(event) => {
            event.preventDefault()
            const status = new FormData(event.currentTarget).get('status') as Customer['status']
            setGridRows((current) =>
              current.map((candidate) =>
                candidate.id === customer.id ? { ...candidate, status } : candidate,
              ),
            )
            setGridMessage(`${customer.name}'s status changed to ${status}`)
            finish()
          }}
        >
          <label className="sr-only" htmlFor={`status-${customer.id}`}>
            Status for {customer.name}
          </label>
          <select
            id={`status-${customer.id}`}
            name="status"
            defaultValue={customer.status}
            autoFocus
            className="h-control-height-small min-w-0 flex-1 rounded-shape-md border border-border-primary bg-surface-primary px-space-2 text-body-sm text-text-primary outline-none focus-visible:border-border-focus focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid"
          >
            <option>Active</option>
            <option>Paused</option>
          </select>
          <Button type="submit" size="tiny">
            Save
          </Button>
        </form>
      ),
    },
    {
      id: 'monthly-fee',
      header: 'Monthly fee',
      cell: (customer) => `$${customer.monthlyFee}`,
      numeric: true,
    },
  ]

  return (
    <div className="grid gap-space-3">
      <div className="grid gap-space-3 sm:grid-cols-2">
        <Input
          label="Search customers"
          type="search"
          variant="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(1)
          }}
          placeholder="Customer name"
        />
        <Select
          label="Plan"
          value={plan}
          onChange={(event) => {
            setPlan(event.target.value as 'all' | Customer['plan'])
            setPage(1)
          }}
          options={[
            { value: 'all', label: 'All plans' },
            { value: 'Pro', label: 'Pro' },
            { value: 'Basic', label: 'Basic' },
          ]}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-space-3">
        <p className="m-0 text-body-sm text-text-secondary" aria-live="polite">
          {gridMessage ||
            `${visibleCustomers.length} of ${gridRows.length} records shown · ${selected.length} selected`}
        </p>
        <Button
          size="small"
          disabled={selected.length === 0}
          onClick={() => {
            const selectedCount = selected.length
            setGridRows((current) =>
              current.map((customer) =>
                selected.includes(customer.id) ? { ...customer, status: 'Active' } : customer,
              ),
            )
            setSelected([])
            setGridMessage(`${selectedCount} customer${selectedCount === 1 ? '' : 's'} activated`)
          }}
        >
          Activate selected
        </Button>
      </div>
      <DataGrid
        label="Customer management grid"
        columns={gridColumns}
        rows={pageCustomers}
        getRowId={(customer) => customer.id}
        getRowLabel={(customer) => customer.name}
        selectable
        selectedRowIds={selected}
        onSelectionChange={(rowIds) => {
          setSelected(rowIds)
          setGridMessage('')
        }}
        sort={sort}
        onSort={(columnId, direction) => {
          setSort({ columnId, direction })
          setPage(1)
          setGridMessage(`Customers sorted ${direction}`)
        }}
        pagination={{
          page,
          onPageChange: (nextPage) => {
            setPage(nextPage)
          },
          pageSize,
          totalRowCount: sortedCustomers.length,
          label: 'Customer grid pages',
        }}
      />
      <p className="m-0 text-body-sm text-text-secondary">
        <strong className="font-semibold text-text-primary">Data grid:</strong> best for managing
        many records and spreadsheet-like tasks. Arrow Up reaches a column header; Enter or Space
        sorts Customer; Space selects a data row; Enter or F2 edits Status. Pagination preserves
        sorting and selections made on other pages.
      </p>
    </div>
  )
}

function NavigationExample() {
  return (
    <NavigationShell
      brand={<span className="font-bold">Bento</span>}
      currentHref="#overview"
      items={[
        { href: '#overview', label: 'Overview', icon: <span>⌂</span> },
        { href: '#projects', label: 'Projects', icon: <span>□</span> },
        { href: '#settings', label: 'Settings', icon: <span>⚙</span> },
      ]}
      utilities={<StatusBadge variant="positive">Online</StatusBadge>}
      className="relative !min-h-container-narrow overflow-hidden rounded-shape-lg border border-border-secondary [&>aside]:absolute [&>header]:absolute [&>header]:inset-x-0 [&>main]:pt-[calc(var(--spacing-topbar-height)+var(--spacing-space-4))]"
    >
      <Card heading={<h3 className="m-0 text-heading-sm">Workspace</h3>}>
        <p className="m-0 text-body-sm text-text-secondary">
          The shell keeps destinations stable while the workspace reflows.
        </p>
      </Card>
    </NavigationShell>
  )
}

function AlertDialogExample() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button ref={triggerRef} variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Delete Field Notes?"
        description="The project and its shared files will be permanently removed."
        confirmLabel="Delete project"
        returnFocusRef={triggerRef}
      />
    </>
  )
}

function DrawerExample() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button ref={triggerRef} variant="secondary" onClick={() => setOpen(true)}>
        View project details
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Field Notes"
        description="Project details and ownership."
        returnFocusRef={triggerRef}
        footer={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        <p className="m-0 text-body-sm text-text-secondary">
          Review the project without losing your place in the project list.
        </p>
      </Drawer>
    </>
  )
}

function PaginationExample() {
  const [page, setPage] = useState(4)
  return <Pagination page={page} pageCount={12} onPageChange={setPage} label="Project pages" />
}

function ToastExample() {
  const initial: ToastMessage[] = [
    {
      id: 'saved',
      title: 'Changes saved',
      description: 'Project settings are up to date.',
      variant: 'success',
      duration: null,
    },
  ]
  const [toasts, setToasts] = useState(initial)
  return (
    <div className="min-h-32">
      <Button
        onClick={() =>
          setToasts([
            {
              id: String(Date.now()),
              title: 'Report ready',
              description: 'Your export is available to download.',
              variant: 'success',
              duration: null,
            },
          ])
        }
      >
        Show notification
      </Button>
      <ToastRegion
        toasts={toasts}
        onDismiss={(id) => setToasts((current) => current.filter((toast) => toast.id !== id))}
        position="container"
      />
    </div>
  )
}

function InputGroupExample() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('Enter an email address to try the action.')

  return (
    <div className="grid max-w-container-narrow gap-space-5">
      <InputGroup
        label="Website"
        leadingAddon="https://"
        defaultValue="example.com"
        helperText="The protocol is included in the saved URL."
      />
      <InputGroup
        label="Search projects"
        leadingAddon={SearchIcon}
        type="search"
        placeholder="Search by name or owner"
      />
      <InputGroup
        label="Invoice amount"
        leadingAddon="$"
        type="number"
        min="0"
        step="0.01"
        defaultValue="1250"
        select={{
          label: 'Currency',
          defaultValue: 'USD',
          options: [
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' },
          ],
        }}
      />
      <InputGroup
        label="Invite teammate"
        type="email"
        placeholder="name@company.com"
        value={email}
        onChange={(event) => {
          setEmail(event.currentTarget.value)
          setMessage('Enter an email address to try the action.')
        }}
        helperText={message}
        action={{
          label: 'Send invite',
          onClick: () =>
            setMessage(email ? `Invite ready for ${email}.` : 'Enter an email address first.'),
        }}
      />
    </div>
  )
}

export const componentExamples: Record<string, ReactNode> = {
  'form-field': (
    <div className="max-w-container-narrow">
      <Input
        label="Project name"
        helperText="Use 3–40 characters."
        error="Remove the slash character."
        defaultValue="Field/Notes"
      />
    </div>
  ),
  overlay: (
    <Popover
      trigger={<Button variant="secondary">Display settings</Button>}
      title="Display settings"
    >
      <Switch label="Compact rows" description="Show more projects at once." />
    </Popover>
  ),
  progress: (
    <div className="max-w-container-narrow">
      <Progress label="Exporting report" value={40} valueLabel="40 of 100 items" />
    </div>
  ),
  'empty-state': (
    <EmptyState
      title="No projects match these filters"
      description="Change or clear the current filters to see more projects."
      variant="filtered"
      primaryAction={<Button variant="outline">Clear filters</Button>}
    />
  ),
  avatar: (
    <div className="flex items-center gap-space-3">
      <Avatar name="Morgan Lee" size="large" />
      <span className="font-semibold">Morgan Lee</span>
    </div>
  ),
  'avatar-group': (
    <AvatarGroup
      label="Project members"
      maxVisible={2}
      expandable
      people={[
        { id: 'morgan', name: 'Morgan Lee' },
        { id: 'amara', name: 'Amara Chen' },
        { id: 'noor', name: 'Noor Singh' },
        { id: 'jon', name: 'Jon Bell' },
      ]}
    />
  ),
  tooltip: (
    <Tooltip content="Archive project">
      <Button variant="outline" iconOnly aria-label="Archive project">
        <span aria-hidden="true">↓</span>
      </Button>
    </Tooltip>
  ),
  'alert-dialog': <AlertDialogExample />,
  disclosure: (
    <Disclosure title="Show project details">
      <p className="m-0 text-body-sm text-text-secondary">Owned by the Design team.</p>
    </Disclosure>
  ),
  accordion: (
    <Accordion
      type="single"
      defaultValue={['access']}
      items={[
        {
          id: 'access',
          title: 'Who can access a project?',
          content: 'Workspace members with project access can view it.',
        },
        {
          id: 'archive',
          title: 'What happens when I archive?',
          content: 'The project becomes read-only and leaves active views.',
        },
      ]}
    />
  ),
  breadcrumb: (
    <Breadcrumb
      maxItems={4}
      label="Article breadcrumb"
      items={[
        { href: '#home', label: 'Home' },
        { href: '#documentation', label: 'Documentation' },
        { href: '#guides', label: 'Guides' },
        { href: '#project-management', label: 'Project management' },
        { label: 'Move a project' },
      ]}
    />
  ),
  link: (
    <div className="flex flex-wrap items-center gap-space-4">
      <Link href="#accessibility-guidance">Accessibility guidance</Link>
      <Link variant="standalone" href="#project-guide" icon={ArrowIcon}>
        Read the project guide
      </Link>
      <LinkButton href="#start-free">Start free</LinkButton>
      <Button variant="link" onClick={() => undefined}>
        Clear filters
      </Button>
    </div>
  ),
  pagination: <PaginationExample />,
  popover: (
    <Popover
      trigger={<Button variant="secondary">Display settings</Button>}
      title="Display settings"
      description="These changes apply immediately."
      initialFocus="first"
    >
      <Switch label="Compact rows" />
    </Popover>
  ),
  toast: <ToastExample />,
  drawer: <DrawerExample />,
  'site-navigation': (
    <SiteNavigation
      brand="Bento"
      brandHref="#home"
      currentHref="#product"
      items={[
        { href: '#product', label: 'Product' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#resources', label: 'Resources' },
      ]}
      primaryAction={
        <LinkButton href="#start-free" size="small">
          Start free
        </LinkButton>
      }
      className="rounded-shape-lg border"
    />
  ),
  'back-to-top': (
    <div className="rounded-shape-md border border-border-secondary bg-surface-primary p-space-4">
      <p className="m-0 text-body-sm text-text-secondary">
        The live Back-to-Top control for this page appears in the viewport as you approach the end
        of the documentation.
      </p>
    </div>
  ),
  'skip-link': (
    <div className="grid gap-space-4">
      <SkipLink
        targetId="skip-link-example-target"
        className="!static !translate-y-0 justify-self-start"
      />
      <p
        id="skip-link-example-target"
        tabIndex={-1}
        className="m-0 rounded-shape-md border border-border-secondary p-space-3 text-body-sm text-text-secondary outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid"
      >
        Main content destination
      </p>
    </div>
  ),
  button: (
    <div className="grid gap-space-4">
      <div className="flex flex-wrap items-center gap-space-3">
        <Button size="tiny">Tiny</Button>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
        <Button size="extra-large">Extra-large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-space-3">
        <Button size="tiny" icon={ArrowIcon}>
          Tiny
        </Button>
        <Button size="small" icon={ArrowIcon}>
          Small
        </Button>
        <Button size="medium" icon={ArrowIcon}>
          Medium
        </Button>
        <Button size="large" icon={ArrowIcon}>
          Large
        </Button>
        <Button size="extra-large" icon={ArrowIcon}>
          Extra-large
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-space-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete project</Button>
        <Button variant="link">Clear filters</Button>
        <Button loading>Save changes</Button>
      </div>
    </div>
  ),
  'button-group': (
    <div className="max-w-container-narrow">
      <ButtonGroup variant="connected" aria-label="Zoom controls">
        <Button variant="outline">Decrease zoom</Button>
        <Button variant="outline">Reset zoom</Button>
        <Button variant="outline">Increase zoom</Button>
      </ButtonGroup>
    </div>
  ),
  input: (
    <div className="grid max-w-container-narrow gap-space-4">
      <Input
        label="Project name"
        helperText="Use a name your team will recognize."
        placeholder="Field Notes"
      />
      <Input label="Project code" error="Use 3–12 letters or numbers." defaultValue="!" />
      <Input
        label="Search"
        variant="search"
        size="small"
        type="search"
        placeholder="Search projects"
      />
    </div>
  ),
  'input-group': <InputGroupExample />,
  textarea: (
    <div className="max-w-container-narrow">
      <Textarea
        label="Project description"
        helperText="Describe the intended outcome."
        placeholder="Add context for collaborators…"
        maxLength={240}
      />
    </div>
  ),
  select: (
    <div className="max-w-container-narrow">
      <Select
        label="Project status"
        placeholder="Choose a status"
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'active', label: 'Active' },
          { value: 'archived', label: 'Archived' },
        ]}
      />
    </div>
  ),
  listbox: (
    <div className="max-w-container-narrow">
      <Listbox label="Project owners" options={people} multiple defaultValue={['amara']} />
    </div>
  ),
  combobox: (
    <div className="max-w-container-narrow">
      <Combobox label="Project owner" options={people} helperText="Type to filter people." />
    </div>
  ),
  checkbox: (
    <div className="grid gap-space-2">
      <Checkbox
        label="Email notifications"
        description="Receive updates about project activity."
        defaultChecked
      />
      <Checkbox
        label="Select all projects"
        description="Some projects are already selected."
        indeterminate
      />
    </div>
  ),
  'radio-group': (
    <RadioGroup
      label="Billing interval"
      orientation="horizontal"
      defaultValue="annual"
      options={[
        { value: 'monthly', label: 'Monthly' },
        { value: 'annual', label: 'Annual', description: 'Save 15%' },
      ]}
    />
  ),
  switch: (
    <div className="max-w-container-narrow">
      <Switch label="Email notifications" description="Changes save immediately." defaultChecked />
    </div>
  ),
  slider: (
    <div className="max-w-container-narrow">
      <Slider label="Volume" defaultValue={72} formatValue={(value) => `${value}%`} />
    </div>
  ),
  modal: <ModalExample />,
  tabs: (
    <Tabs
      label="Project views"
      defaultValue="overview"
      items={[
        {
          id: 'overview',
          label: 'Overview',
          content: (
            <p className="m-0 text-body-sm text-text-secondary">
              Summary, milestones, and ownership.
            </p>
          ),
        },
        {
          id: 'activity',
          label: 'Activity',
          content: (
            <p className="m-0 text-body-sm text-text-secondary">
              Recent changes across the project.
            </p>
          ),
        },
        {
          id: 'settings',
          label: 'Settings',
          content: (
            <p className="m-0 text-body-sm text-text-secondary">Project preferences and access.</p>
          ),
        },
      ]}
    />
  ),
  table: <TableExample />,
  'data-grid': <DataGridExample />,
  'status-badge': (
    <div className="flex flex-wrap gap-space-2">
      <StatusBadge variant="positive">Active</StatusBadge>
      <StatusBadge variant="warning">At risk</StatusBadge>
      <StatusBadge variant="negative">Blocked</StatusBadge>
      <StatusBadge variant="info">In review</StatusBadge>
      <StatusBadge>Draft</StatusBadge>
    </div>
  ),
  alert: (
    <div className="grid gap-space-3">
      <Alert title="Changes saved" variant="success">
        Your project settings are up to date.
      </Alert>
      <Alert title="Report failed" variant="danger" urgent dismissible>
        Try again or contact support if the problem continues.
      </Alert>
    </div>
  ),
  dropdown: (
    <Dropdown
      label="Project actions"
      buttonProps={{ variant: 'secondary' }}
      items={[
        { id: 'rename', label: 'Rename', onSelect: () => undefined },
        { id: 'duplicate', label: 'Duplicate', onSelect: () => undefined },
        { id: 'archive', label: 'Archive', onSelect: () => undefined },
        { id: 'delete', label: 'Delete', destructive: true, onSelect: () => undefined },
      ]}
    />
  ),
  navigation: <NavigationExample />,
  card: (
    <div className="grid gap-space-4 sm:grid-cols-2">
      <Card
        heading={<h3 className="m-0 text-heading-sm">Project brief</h3>}
        footer={<Button variant="outline">View details</Button>}
      >
        <p className="m-0 text-body-sm text-text-secondary">
          A bounded group for related content and actions.
        </p>
      </Card>
      <StatCard label="Tasks complete" value="72%" metadata="Up 8% this week" />
    </div>
  ),
}
