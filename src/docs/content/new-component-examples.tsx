import { useState } from 'react'
import { CodeBlock, DateInput, FileUpload, Select, useFileUploads } from '../../components'
import { attachmentConstraints, simulateUpload, failUpload } from '../../examples/upload-demo'

export function FileUploadExample() {
  const [failed, setFailed] = useState(false)
  const upload = useFileUploads(attachmentConstraints, failed ? failUpload : simulateUpload)
  return (
    <div className="space-y-scale-4">
      <Select
        label="Upload scenario"
        value={failed ? 'failed' : 'success'}
        disabled={upload.items.some((item) => item.status === 'uploading')}
        options={[
          { value: 'success', label: 'Success' },
          { value: 'failed', label: 'Failure' },
        ]}
        onChange={(event) => setFailed(event.target.value === 'failed')}
      />
      <FileUpload
        label="Sample attachments"
        constraints={attachmentConstraints}
        {...upload}
        description="Local simulation: no file contents are read or sent. Removal detaches from this example only."
      />
    </div>
  )
}
export function DateInputExample() {
  const [value, setValue] = useState('')
  return (
    <DateInput
      label="Preferred start date"
      required
      value={value}
      min="2026-10-01"
      max="2027-12-31"
      onValueChange={setValue}
    />
  )
}
const denied = async () => {
  throw new Error('Simulated copy failure')
}
export function CodeBlockExample() {
  const [fail, setFail] = useState(false)
  return (
    <div className="space-y-scale-4">
      <Select
        label="Copy scenario"
        value={fail ? 'denied' : 'available'}
        onChange={(event) => setFail(event.target.value === 'denied')}
        options={[
          { value: 'available', label: 'Available' },
          { value: 'denied', label: 'Denied' },
        ]}
      />
      <CodeBlock
        label="Sample configuration"
        language="JSON"
        code={'{\n  "project": "Example",\n  "enabled": true\n}'}
        copyText={fail ? denied : undefined}
      />
    </div>
  )
}
