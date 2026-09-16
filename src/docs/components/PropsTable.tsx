import { type PropReference } from '../content/types'

export function PropsTable({ props }: { props: readonly PropReference[] }) {
  return (
    <div className="overflow-x-auto rounded-shape-lg border border-border-secondary">
      <table className="w-full min-w-[44rem] border-collapse text-left text-body-sm">
        <thead className="bg-table-header-background text-label-md text-text-secondary">
          <tr>
            <th className="h-control-height-medium border-b border-table-border px-space-3">
              Prop
            </th>
            <th className="h-control-height-medium border-b border-table-border px-space-3">
              Type
            </th>
            <th className="h-control-height-medium border-b border-table-border px-space-3">
              Default
            </th>
            <th className="h-control-height-medium border-b border-table-border px-space-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <th
                scope="row"
                className="border-b border-table-border p-space-3 font-semibold text-text-primary"
              >
                <code>{prop.name}</code>
              </th>
              <td className="border-b border-table-border p-space-3">
                <code>{prop.type}</code>
              </td>
              <td className="border-b border-table-border p-space-3">
                <code>{prop.defaultValue ?? '—'}</code>
              </td>
              <td className="border-b border-table-border p-space-3">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
