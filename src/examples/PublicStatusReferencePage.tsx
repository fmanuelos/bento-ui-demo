import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ActivityHistory,
  Button,
  Link,
  PageHeader,
  Select,
  ServiceStatusSummary,
} from '../components'
import type { ServiceCondition } from '../components/ServiceStatusSummary'
import { BatchReferenceFrame } from './BatchReferenceFrame'
import { summarizeServiceStatus } from './service-status-model'

export function PublicStatusReferencePage() {
  const location = useLocation()
  const multi = new URLSearchParams(location.search).get('context') === 'multi'
  const [scenario, setScenario] = useState('degraded')
  const [announcement, setAnnouncement] = useState('')
  const unavailable = scenario === 'loading' || scenario === 'failed'
  const stale = scenario === 'stale'
  const conditions: ServiceCondition[] = unavailable
    ? []
    : [
        scenario === 'maintenance'
          ? 'maintenance'
          : scenario === 'outage'
            ? 'outage'
            : scenario === 'healthy'
              ? 'operational'
              : scenario === 'unknown'
                ? 'unknown'
                : 'degraded',
        ...(multi ? ['operational' as const] : []),
      ]
  const summary = summarizeServiceStatus(conditions, !stale, scenario !== 'unknown')
  const incident = !unavailable && ['degraded', 'stale'].includes(scenario)
  return (
    <BatchReferenceFrame
      publicSite
      title="Public service status"
      note="Fictional, fixed snapshot from October 5, 2026 at 14:00 UTC. These are not live services or real incidents."
      controls={
        <>
          <Select
            label="Status scenario"
            value={scenario}
            onChange={(event) => {
              setScenario(event.target.value)
              setAnnouncement('')
            }}
            options={[
              { value: 'healthy', label: 'Operational' },
              { value: 'degraded', label: 'Degraded' },
              { value: 'outage', label: 'Service disruption' },
              { value: 'maintenance', label: 'Maintenance' },
              { value: 'unknown', label: 'Unknown / incomplete coverage' },
              { value: 'stale', label: 'Stale snapshot' },
              { value: 'loading', label: 'Loading' },
              { value: 'failed', label: 'Failed request' },
            ]}
          />
          <Link href={`/examples/public-status?context=${multi ? 'single' : 'multi'}`}>
            Open {multi ? 'single-service' : 'multi-service'} context
          </Link>
        </>
      }
    >
      <PageHeader
        title={multi ? 'Service portfolio status' : 'Publishing service status'}
        description="Understand the reported service condition, affected scope, and published incident updates."
      />
      {scenario === 'loading' ? (
        <p role="status">Loading sample status… Health is not yet known.</p>
      ) : (
        <ServiceStatusSummary
          title="Reported service conditions"
          scope={
            multi
              ? 'Scope: Publishing API and asset delivery, all sample regions.'
              : 'Scope: Publishing API, all sample regions.'
          }
          freshness={
            scenario === 'failed'
              ? 'No service snapshot received. Freshness cannot be established.'
              : stale
                ? 'Stale service snapshot: October 5, 2026, 13:50 UTC. The expected update was missed.'
                : 'Sample snapshot: October 5, 2026, 14:00 UTC. No live polling.'
          }
          summary={summary}
          services={conditions.map((condition, index) => ({
            id: String(index),
            name: index ? 'Asset delivery' : 'Publishing API',
            condition,
            detail: stale
              ? 'Last known condition only; current condition is unknown.'
              : condition === 'unknown'
                ? 'The source did not report this service.'
                : undefined,
          }))}
          emptyMessage="The status request failed. No current conditions are available; absence does not mean operational."
        />
      )}
      {scenario === 'maintenance' && (
        <section aria-labelledby="maintenance-heading">
          <h2 id="maintenance-heading" className="text-heading-md font-semibold">
            Planned maintenance
          </h2>
          <p>
            Publishing API · October 5, 2026, 13:30–14:30 UTC. Publishing may be delayed during this
            sample maintenance window. The stated end is an estimate.
          </p>
        </section>
      )}
      <ActivityHistory
        title={incident ? 'Publishing delay · incident updates' : 'Published incident updates'}
        ordering="Newest first"
        coverage={
          incident
            ? 'Sample incident INC-DEMO-01. Two public updates are included. Internal responders and private diagnostics are omitted.'
            : 'This sample includes no incident updates for the selected scenario. This does not establish a complete incident history.'
        }
        events={
          incident
            ? [
                {
                  id: 'identified',
                  description: 'Cause identified; mitigation in progress',
                  timestamp: {
                    dateTime: '2026-10-05T13:45:00Z',
                    label: 'October 5, 2026, 13:45 UTC',
                  },
                  detail: (
                    <p>
                      Publishing requests may take longer than usual. No resolution time has been
                      confirmed.
                    </p>
                  ),
                },
                {
                  id: 'investigating',
                  description: 'Investigating delayed publishing requests',
                  timestamp: {
                    dateTime: '2026-10-05T13:20:00Z',
                    label: 'October 5, 2026, 13:20 UTC',
                  },
                },
              ]
            : []
        }
        emptyMessage="No public incident updates are included in this sample."
      />
      <Button
        variant="outline"
        onClick={() => {
          setScenario('healthy')
          setAnnouncement(
            'Loaded the operational sample snapshot. All listed services report operational; no live request was made.',
          )
        }}
      >
        Load operational sample
      </Button>
      <p role="status">{announcement}</p>
      <p>
        Need context? <Link href="/examples/public-content">Read the sample publishing guide</Link>.
        This preview has no subscription or notification service.
      </p>
    </BatchReferenceFrame>
  )
}
