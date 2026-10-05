import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  FileUploadController,
  type FileConstraints,
  type UploadTransport,
} from './file-upload-model'

/** Constraints are fixed for a mounted controller; remount the consumer to change policy. */
export function useFileUploads(constraints: FileConstraints, transport: UploadTransport) {
  const [controller] = useState(() => new FileUploadController(constraints))
  const items = useSyncExternalStore(controller.subscribe, controller.snapshot, controller.snapshot)
  useEffect(() => () => controller.dispose(), [controller])
  return {
    items,
    onSelect: controller.select,
    onUpload: (id: string) => {
      void controller.start(id, transport)
    },
    onCancel: controller.cancel,
    onRemove: controller.remove,
    reset: controller.reset,
  }
}
