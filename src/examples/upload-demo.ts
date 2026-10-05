import type { FileConstraints, UploadTransport } from '../components/file-upload-model'

export const attachmentConstraints: FileConstraints = {
  maxFiles: 2,
  maxBytes: 2 * 1024 * 1024,
  accept: [
    { extension: '.pdf', mime: 'application/pdf' },
    { extension: '.txt', mime: 'text/plain' },
  ],
}
/** Local fixture: never reads file contents or sends a network request. */
export const simulateUpload: UploadTransport = (file, { signal }) =>
  new Promise((resolve, reject) => {
    const cancel = () => {
      clearTimeout(timer)
      reject(new Error('Cancelled'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel)
      resolve({ receipt: `sample-${file.name}-${file.size}` })
    }, 1800)
    if (signal.aborted) cancel()
    else signal.addEventListener('abort', cancel, { once: true })
  })
export const failUpload: UploadTransport = (_file, { signal }) =>
  new Promise((_resolve, reject) => {
    const cancel = () => {
      clearTimeout(timer)
      reject(new Error('Cancelled'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel)
      reject(new Error('Simulated failure'))
    }, 1200)
    if (signal.aborted) cancel()
    else signal.addEventListener('abort', cancel, { once: true })
  })
