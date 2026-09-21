export const iconSizes = {
  xs: {
    label: 'Extra small',
    pixels: 12,
    className: 'size-scale-3',
    usage: 'Non-interactive indicators, compact metadata, and exceptionally dense UI',
  },
  sm: {
    label: 'Small',
    pixels: 16,
    className: 'size-scale-4',
    usage: 'Tiny and small controls, compact metadata, and dense utilities',
  },
  md: {
    label: 'Medium',
    pixels: 20,
    className: 'size-scale-5',
    usage: 'Default controls, navigation, fields, and standalone interface use',
  },
  lg: {
    label: 'Large',
    pixels: 24,
    className: 'size-scale-6',
    usage: 'Extra-large controls, prominent feedback, and spacious compositions',
  },
  xl: {
    label: 'Extra large',
    pixels: 32,
    className: 'size-scale-8',
    usage: 'Prominent standalone emphasis, empty states, and compact feature callouts',
  },
} as const

export type IconSize = keyof typeof iconSizes
export const iconSizeKeys = Object.keys(iconSizes) as IconSize[]
