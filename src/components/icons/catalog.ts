import { ArrowEndIcon } from './ArrowEndIcon'
import { ArrowUpIcon } from './ArrowUpIcon'
import { ArrowUpRightIcon } from './ArrowUpRightIcon'
import { CheckIcon } from './CheckIcon'
import { ChevronDownIcon } from './ChevronDownIcon'
import { ChevronEndIcon } from './ChevronEndIcon'
import { ChevronStartIcon } from './ChevronStartIcon'
import { CloseIcon } from './CloseIcon'
import { DangerCircleIcon } from './DangerCircleIcon'
import { InfoCircleIcon } from './InfoCircleIcon'
import { MenuIcon } from './MenuIcon'
import { MoonIcon } from './MoonIcon'
import { SearchIcon } from './SearchIcon'
import { SparkleIcon } from './SparkleIcon'
import { SunIcon } from './SunIcon'
import { UserIcon } from './UserIcon'
import { WarningTriangleIcon } from './WarningTriangleIcon'

export type IconCategory = 'action' | 'feedback' | 'navigation' | 'object' | 'system'
export type IconStatus = 'proposed' | 'stable' | 'deprecated'

export type IconMetadata = {
  label: string
  category: IconCategory
  directional: boolean
  status: IconStatus
  aliases: readonly string[]
  replacement?: string
}

export const iconMetadata = {
  'arrow-end': {
    label: 'Arrow end',
    category: 'navigation',
    directional: true,
    status: 'stable',
    aliases: ['next', 'forward'],
  },
  'arrow-up': {
    label: 'Arrow up',
    category: 'navigation',
    directional: false,
    status: 'stable',
    aliases: ['back to top'],
  },
  'arrow-up-right': {
    label: 'Arrow up right',
    category: 'navigation',
    directional: false,
    status: 'stable',
    aliases: ['external', 'open'],
  },
  check: {
    label: 'Check',
    category: 'feedback',
    directional: false,
    status: 'stable',
    aliases: ['success', 'complete'],
  },
  'chevron-down': {
    label: 'Chevron down',
    category: 'navigation',
    directional: false,
    status: 'stable',
    aliases: ['expand'],
  },
  'chevron-end': {
    label: 'Chevron end',
    category: 'navigation',
    directional: true,
    status: 'stable',
    aliases: ['next'],
  },
  'chevron-start': {
    label: 'Chevron start',
    category: 'navigation',
    directional: true,
    status: 'stable',
    aliases: ['previous', 'collapse'],
  },
  close: {
    label: 'Close',
    category: 'action',
    directional: false,
    status: 'stable',
    aliases: ['dismiss'],
  },
  'danger-circle': {
    label: 'Danger circle',
    category: 'feedback',
    directional: false,
    status: 'stable',
    aliases: ['error', 'failed'],
  },
  'info-circle': {
    label: 'Info circle',
    category: 'feedback',
    directional: false,
    status: 'stable',
    aliases: ['information'],
  },
  menu: {
    label: 'Menu',
    category: 'navigation',
    directional: false,
    status: 'stable',
    aliases: ['navigation'],
  },
  moon: {
    label: 'Moon',
    category: 'system',
    directional: false,
    status: 'stable',
    aliases: ['dark theme'],
  },
  search: {
    label: 'Search',
    category: 'action',
    directional: false,
    status: 'stable',
    aliases: ['find'],
  },
  sparkle: {
    label: 'Sparkle',
    category: 'object',
    directional: false,
    status: 'stable',
    aliases: ['brand', 'featured'],
  },
  sun: {
    label: 'Sun',
    category: 'system',
    directional: false,
    status: 'stable',
    aliases: ['light theme'],
  },
  user: {
    label: 'User',
    category: 'object',
    directional: false,
    status: 'stable',
    aliases: ['person', 'profile'],
  },
  'warning-triangle': {
    label: 'Warning triangle',
    category: 'feedback',
    directional: false,
    status: 'stable',
    aliases: ['warning', 'caution'],
  },
} as const satisfies Record<string, IconMetadata>

export type IconName = keyof typeof iconMetadata

export const iconCatalog = [
  { name: 'arrow-end', Icon: ArrowEndIcon },
  { name: 'arrow-up', Icon: ArrowUpIcon },
  { name: 'arrow-up-right', Icon: ArrowUpRightIcon },
  { name: 'check', Icon: CheckIcon },
  { name: 'chevron-down', Icon: ChevronDownIcon },
  { name: 'chevron-end', Icon: ChevronEndIcon },
  { name: 'chevron-start', Icon: ChevronStartIcon },
  { name: 'close', Icon: CloseIcon },
  { name: 'danger-circle', Icon: DangerCircleIcon },
  { name: 'info-circle', Icon: InfoCircleIcon },
  { name: 'menu', Icon: MenuIcon },
  { name: 'moon', Icon: MoonIcon },
  { name: 'search', Icon: SearchIcon },
  { name: 'sparkle', Icon: SparkleIcon },
  { name: 'sun', Icon: SunIcon },
  { name: 'user', Icon: UserIcon },
  { name: 'warning-triangle', Icon: WarningTriangleIcon },
] as const satisfies readonly { name: IconName; Icon: typeof SearchIcon }[]
