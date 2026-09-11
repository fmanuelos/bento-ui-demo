/* eslint-disable react-refresh/only-export-components */
import { useRef, useState, type ReactNode } from 'react'
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  AvatarGroup,
  BackToTop,
  Button,
  Card,
  Checkbox,
  Combobox,
  DataGrid,
  Disclosure,
  Drawer,
  Dropdown,
  EmptyState,
  Input,
  Listbox,
  Modal,
  NavigationShell,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Select,
  SiteNavigation,
  StatCard,
  StatusBadge,
  Switch,
  Table,
  Tabs,
  Textarea,
  ToastRegion,
  Tooltip,
  type ToastMessage,
  type TableColumn,
} from '../../components'

const people = [
  { value: 'amara', label: 'Amara Chen', description: 'Design' },
  { value: 'jon', label: 'Jon Bell', description: 'Engineering' },
  { value: 'noor', label: 'Noor Singh', description: 'Research' },
]

const rows = [
  { id: 'atlas', project: 'Atlas', owner: 'Amara', status: 'Active', tasks: 18 },
  { id: 'field-notes', project: 'Field Notes', owner: 'Noor', status: 'Review', tasks: 12 },
  { id: 'northstar', project: 'Northstar', owner: 'Jon', status: 'Draft', tasks: 7 },
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

const tableColumns: TableColumn<(typeof rows)[number]>[] = [
  { id: 'project', header: 'Project', cell: (row) => row.project, sortable: true },
  { id: 'owner', header: 'Owner', cell: (row) => row.owner },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => (
      <StatusBadge
        variant={
          row.status === 'Active' ? 'positive' : row.status === 'Review' ? 'info' : 'neutral'
        }
      >
        {row.status}
      </StatusBadge>
    ),
  },
  { id: 'tasks', header: 'Tasks', cell: (row) => row.tasks, numeric: true },
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
  const [selected, setSelected] = useState<string[]>([])
  const [sort, setSort] = useState<{ columnId: string; direction: 'ascending' | 'descending' }>({
    columnId: 'project',
    direction: 'ascending',
  })
  const sortedRows = [...rows].sort((first, second) =>
    sort.direction === 'ascending'
      ? first.project.localeCompare(second.project)
      : second.project.localeCompare(first.project),
  )
  return (
    <Table
      caption="Example projects"
      columns={tableColumns}
      rows={sortedRows}
      getRowId={(row) => row.id}
      sort={sort}
      onSort={(columnId, direction) => setSort({ columnId, direction })}
      selectedRowIds={selected}
      onSelectionChange={setSelected}
    />
  )
}

function DataGridExample() {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <DataGrid
      label="Keyboard-navigable project grid"
      columns={tableColumns.map((column) => ({
        id: column.id,
        header: column.header,
        cell: column.cell,
        numeric: column.numeric,
      }))}
      rows={rows}
      getRowId={(row) => row.id}
      selectable
      selectedRowIds={selected}
      onSelectionChange={setSelected}
    />
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
      primaryAction={<Button size="small">Start free</Button>}
      className="rounded-shape-lg border"
    />
  ),
  'back-to-top': (
    <div
      role="region"
      aria-label="Scrollable Back-to-Top example"
      tabIndex={0}
      className="h-56 overflow-y-auto rounded-shape-md border border-border-secondary p-space-3 outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
    >
      <p
        id="back-to-top-example-target"
        tabIndex={-1}
        className="m-0 text-body-sm text-text-secondary outline-none"
      >
        Start of the example content
      </p>
      <div className="flex min-h-[28rem] items-end justify-end">
        <BackToTop targetId="back-to-top-example-target" />
      </div>
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
        <Button loading>Save changes</Button>
      </div>
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
