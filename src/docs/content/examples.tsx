/* eslint-disable react-refresh/only-export-components */
import { useRef, useState, type ReactNode } from 'react'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Combobox,
  DataGrid,
  Dropdown,
  Input,
  Listbox,
  Modal,
  NavigationShell,
  RadioGroup,
  Select,
  StatCard,
  StatusBadge,
  Switch,
  Table,
  Tabs,
  Textarea,
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

const tableColumns: TableColumn<(typeof rows)[number]>[] = [
  { id: 'project', header: 'Project', cell: (row) => row.project, sortable: true },
  { id: 'owner', header: 'Owner', cell: (row) => row.owner },
  { id: 'status', header: 'Status', cell: (row) => <StatusBadge variant={row.status === 'Active' ? 'positive' : row.status === 'Review' ? 'info' : 'neutral'}>{row.status}</StatusBadge> },
  { id: 'tasks', header: 'Tasks', cell: (row) => row.tasks, numeric: true },
]

function ModalExample() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return <><Button ref={triggerRef} onClick={() => setOpen(true)}>Open modal</Button><Modal open={open} onClose={() => setOpen(false)} returnFocusRef={triggerRef} title="Create project" description="Add a clear name now; details can follow." footer={<><Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Create project</Button></>}><Input label="Project name" placeholder="Northstar" autoFocus /></Modal></>
}

function TableExample() {
  const [selected, setSelected] = useState<string[]>([])
  const [sort, setSort] = useState<{ columnId: string; direction: 'ascending' | 'descending' }>({ columnId: 'project', direction: 'ascending' })
  const sortedRows = [...rows].sort((first, second) => sort.direction === 'ascending' ? first.project.localeCompare(second.project) : second.project.localeCompare(first.project))
  return <Table caption="Example projects" columns={tableColumns} rows={sortedRows} getRowId={(row) => row.id} sort={sort} onSort={(columnId, direction) => setSort({ columnId, direction })} selectedRowIds={selected} onSelectionChange={setSelected} />
}

function DataGridExample() {
  const [selected, setSelected] = useState<string[]>([])
  return <DataGrid label="Keyboard-navigable project grid" columns={tableColumns.map((column) => ({ id: column.id, header: column.header, cell: column.cell, numeric: column.numeric }))} rows={rows} getRowId={(row) => row.id} selectable selectedRowIds={selected} onSelectionChange={setSelected} />
}

function NavigationExample() {
  return <NavigationShell brand={<span className="font-bold">Bento</span>} currentHref="#overview" items={[{ href: '#overview', label: 'Overview', icon: <span>⌂</span> }, { href: '#projects', label: 'Projects', icon: <span>□</span> }, { href: '#settings', label: 'Settings', icon: <span>⚙</span> }]} utilities={<StatusBadge variant="positive">Online</StatusBadge>} className="relative !min-h-content-narrow overflow-hidden rounded-lg border border-border-secondary [&>aside]:absolute [&>header]:absolute [&>header]:inset-x-0 [&>main]:pt-20"><Card heading={<h3 className="m-0 text-heading-h4">Workspace</h3>}><p className="m-0 text-body-sm text-text-secondary">The shell keeps destinations stable while the workspace reflows.</p></Card></NavigationShell>
}

export const componentExamples: Record<string, ReactNode> = {
  button: <div className="flex flex-wrap gap-md"><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="tertiary">Tertiary</Button><Button variant="destructive">Delete project</Button><Button size="sm">Compact</Button><Button loading>Save changes</Button></div>,
  input: <div className="grid max-w-content-narrow gap-lg"><Input label="Project name" helperText="Use a name your team will recognize." placeholder="Field Notes" /><Input label="Project code" error="Use 3–12 letters or numbers." defaultValue="!" /><Input label="Search" variant="search" size="compact" type="search" placeholder="Search projects" /></div>,
  textarea: <div className="max-w-content-narrow"><Textarea label="Project description" helperText="Describe the intended outcome." placeholder="Add context for collaborators…" maxLength={240} /></div>,
  select: <div className="max-w-content-narrow"><Select label="Project status" placeholder="Choose a status" options={[{ value: 'draft', label: 'Draft' }, { value: 'active', label: 'Active' }, { value: 'archived', label: 'Archived' }]} /></div>,
  listbox: <div className="max-w-content-narrow"><Listbox label="Project owners" options={people} multiple defaultValue={['amara']} /></div>,
  combobox: <div className="max-w-content-narrow"><Combobox label="Project owner" options={people} helperText="Type to filter people." /></div>,
  checkbox: <div className="grid gap-sm"><Checkbox label="Email notifications" description="Receive updates about project activity." defaultChecked /><Checkbox label="Select all projects" description="Some projects are already selected." indeterminate /></div>,
  'radio-group': <RadioGroup label="Billing interval" orientation="horizontal" defaultValue="annual" options={[{ value: 'monthly', label: 'Monthly' }, { value: 'annual', label: 'Annual', description: 'Save 15%' }]} />,
  switch: <div className="max-w-content-narrow"><Switch label="Email notifications" description="Changes save immediately." defaultChecked /></div>,
  modal: <ModalExample />,
  tabs: <Tabs label="Project views" defaultValue="overview" items={[{ id: 'overview', label: 'Overview', content: <p className="m-0 text-body-sm text-text-secondary">Summary, milestones, and ownership.</p> }, { id: 'activity', label: 'Activity', content: <p className="m-0 text-body-sm text-text-secondary">Recent changes across the project.</p> }, { id: 'settings', label: 'Settings', content: <p className="m-0 text-body-sm text-text-secondary">Project preferences and access.</p> }]} />,
  table: <TableExample />,
  'data-grid': <DataGridExample />,
  'status-badge': <div className="flex flex-wrap gap-sm"><StatusBadge variant="positive">Active</StatusBadge><StatusBadge variant="warning">At risk</StatusBadge><StatusBadge variant="negative">Blocked</StatusBadge><StatusBadge variant="info">In review</StatusBadge><StatusBadge>Draft</StatusBadge></div>,
  alert: <div className="grid gap-md"><Alert title="Changes saved" variant="success">Your project settings are up to date.</Alert><Alert title="Report failed" variant="danger" urgent dismissible>Try again or contact support if the problem continues.</Alert></div>,
  dropdown: <Dropdown label="Project actions" buttonProps={{ variant: 'secondary' }} items={[{ id: 'rename', label: 'Rename', onSelect: () => undefined }, { id: 'duplicate', label: 'Duplicate', onSelect: () => undefined }, { id: 'archive', label: 'Archive', onSelect: () => undefined }, { id: 'delete', label: 'Delete', destructive: true, onSelect: () => undefined }]} />,
  navigation: <NavigationExample />,
  card: <div className="grid gap-lg sm:grid-cols-2"><Card heading={<h3 className="m-0 text-heading-h4">Project brief</h3>} footer={<Button variant="tertiary">View details</Button>}><p className="m-0 text-body-sm text-text-secondary">A bounded group for related content and actions.</p></Card><StatCard label="Tasks complete" value="72%" metadata="Up 8% this week" /></div>,
}
