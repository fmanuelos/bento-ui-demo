type NavigableOption = {
  label: string
  disabled?: boolean
}

export function findFirstEnabledIndex(options: readonly NavigableOption[]) {
  return options.findIndex((option) => !option.disabled)
}

export function findLastEnabledIndex(options: readonly NavigableOption[]) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index]?.disabled) return index
  }

  return -1
}

export function findNextEnabledIndex(
  options: readonly NavigableOption[],
  startIndex: number,
  direction: 1 | -1,
) {
  if (options.length === 0) return -1

  for (let step = 1; step <= options.length; step += 1) {
    const index = (startIndex + direction * step + options.length) % options.length
    if (!options[index]?.disabled) return index
  }

  return -1
}

export function findTypeaheadIndex(
  options: readonly NavigableOption[],
  query: string,
  startIndex = -1,
) {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery || options.length === 0) return -1

  for (let step = 1; step <= options.length; step += 1) {
    const index = (startIndex + step + options.length) % options.length
    const option = options[index]
    if (!option?.disabled && option.label.toLocaleLowerCase().startsWith(normalizedQuery)) {
      return index
    }
  }

  return -1
}
