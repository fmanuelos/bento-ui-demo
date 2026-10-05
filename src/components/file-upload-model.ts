export type FileConstraints = {
  maxFiles: number
  maxBytes: number
  accept: readonly { extension: string; mime: string }[]
}
export type UploadItem = {
  id: string
  name: string
  size: number
  status: 'selected' | 'rejected' | 'uploading' | 'uploaded' | 'failed' | 'cancelled'
  message?: string
  progress?: number
  receipt?: string
}
export type UploadTransport = (
  file: File,
  options: { signal: AbortSignal; onProgress: (loaded: number, total: number) => void },
) => Promise<{ receipt: string }>

/** Owns local selection and transport lifecycle, never remote deletion or persistence. */
export class FileUploadController {
  private items: readonly UploadItem[] = []
  private files = new Map<string, File>()
  private requests = new Map<string, AbortController>()
  private listeners = new Set<() => void>()
  private sequence = 0
  private constraints: FileConstraints
  constructor(constraints: FileConstraints) {
    this.constraints = constraints
  }
  snapshot = () => this.items
  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }
  private publish(items: readonly UploadItem[]) {
    this.items = items
    this.listeners.forEach((listener) => listener())
  }
  private patch(id: string, changes: Partial<UploadItem>) {
    this.publish(this.items.map((item) => (item.id === id ? { ...item, ...changes } : item)))
  }
  select = (files: readonly File[]) => {
    const additions: UploadItem[] = []
    for (const file of files) {
      const id = `upload-${++this.sequence}`
      const type = this.constraints.accept.find((type) =>
        file.name.toLowerCase().endsWith(type.extension.toLowerCase()),
      )
      let message: string | undefined
      if (!type || (file.type && file.type !== type.mime))
        message = 'This file type is not accepted.'
      else if (!file.size) message = 'Empty files are not accepted.'
      else if (file.size > this.constraints.maxBytes)
        message = `File exceeds ${this.constraints.maxBytes.toLocaleString()} bytes.`
      else if (
        [...this.files.values()].some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified,
        )
      )
        message = 'A file with the same name, size, and modification time is already selected.'
      else if (this.files.size >= this.constraints.maxFiles)
        message = `Select at most ${this.constraints.maxFiles} files. Remove another file first.`
      if (!message) this.files.set(id, file)
      additions.push({
        id,
        name: file.name,
        size: file.size,
        status: message ? 'rejected' : 'selected',
        message,
      })
    }
    this.publish([...this.items, ...additions])
  }
  start = async (id: string, transport: UploadTransport) => {
    const item = this.items.find((item) => item.id === id)
    const file = this.files.get(id)
    if (!file || !item || !['selected', 'failed', 'cancelled'].includes(item.status)) return
    const request = new AbortController()
    this.requests.set(id, request)
    this.patch(id, {
      status: 'uploading',
      message: undefined,
      progress: undefined,
      receipt: undefined,
    })
    const current = () => this.requests.get(id) === request && !request.signal.aborted
    try {
      const result = await transport(file, {
        signal: request.signal,
        onProgress: (loaded, total) => {
          if (
            !current() ||
            !Number.isFinite(loaded) ||
            !Number.isFinite(total) ||
            total <= 0 ||
            loaded < 0
          )
            return
          const progress = Math.min(100, (loaded / total) * 100)
          this.patch(id, {
            progress: Math.max(this.items.find((item) => item.id === id)?.progress ?? 0, progress),
          })
        },
      })
      if (!current()) return
      if (!result.receipt) throw new Error('Missing upload receipt')
      this.requests.delete(id)
      this.patch(id, { status: 'uploaded', receipt: result.receipt, progress: undefined })
    } catch {
      if (!current()) return
      this.requests.delete(id)
      this.patch(id, {
        status: 'failed',
        progress: undefined,
        message: 'Upload failed. Retry this file or remove it.',
      })
    }
  }
  cancel = (id: string) => {
    const request = this.requests.get(id)
    if (!request) return
    this.requests.delete(id)
    request.abort()
    this.patch(id, {
      status: 'cancelled',
      progress: undefined,
      message: 'Local upload cancelled. Retry when ready.',
    })
  }
  remove = (id: string) => {
    this.cancel(id)
    this.files.delete(id)
    this.publish(this.items.filter((item) => item.id !== id))
  }
  reset = () => {
    for (const id of this.requests.keys()) this.cancel(id)
    this.files.clear()
    this.publish([])
  }
  dispose = () => {
    for (const id of this.requests.keys()) this.cancel(id)
  }
}
