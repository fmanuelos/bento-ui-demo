import type { ServiceCondition } from '../components/ServiceStatusSummary'

export function summarizeServiceStatus(
  conditions: readonly ServiceCondition[],
  current: boolean,
  complete: boolean,
): string {
  if (!current) return 'Current status unavailable — this snapshot is stale.'
  if (!conditions.length) return 'Status unavailable — no service data received.'
  const qualification =
    !complete || conditions.includes('unknown') ? ' Some service status is unknown.' : ''
  if (conditions.includes('outage')) return `Service disruption reported.${qualification}`
  if (conditions.includes('degraded')) return `Degraded performance reported.${qualification}`
  if (conditions.includes('maintenance')) return `Maintenance in progress.${qualification}`
  if (qualification) return 'Overall status unknown — coverage is incomplete.'
  return 'All listed services operational.'
}
