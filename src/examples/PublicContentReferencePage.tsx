import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CodeBlock, ContentsNavigation, Link, PageHeader, Select } from '../components'
import { BatchReferenceFrame } from './BatchReferenceFrame'

const deniedCopy = async () => {
  throw new Error('Simulated clipboard denial')
}

export function PublicContentReferencePage() {
  const location = useLocation()
  const technical = new URLSearchParams(location.search).get('context') === 'technical'
  const [copyDenied, setCopyDenied] = useState(false)
  const policy = new URLSearchParams(location.search).get('context') === 'policy'
  const [scenario, setScenario] = useState('available')
  const sections = technical
    ? [
        {
          id: 'configuration',
          label: 'Prepare sample configuration',
          body: (
            <>
              <p>
                This JSON describes a fictional local project. Replace sample labels when adapting
                the example; it contains no credentials and is not sent anywhere.
              </p>
              <CodeBlock
                label="Project configuration"
                language="JSON"
                code={
                  '{\n  "name": "Example publishing project",\n  "region": "sample-region",\n  "targetDate": "2026-11-15"\n}'
                }
                copyText={copyDenied ? deniedCopy : undefined}
              />
            </>
          ),
        },
        {
          id: 'request',
          label: 'Understand the request format',
          body: (
            <>
              <p>
                This HTTP example is documentation only. The reserved example domain is
                illustrative; reading or copying does not execute a request.
              </p>
              <CodeBlock
                label="Example request"
                language="HTTP"
                code={
                  'POST /examples/projects HTTP/1.1\nHost: api.example.invalid\nContent-Type: application/json\nX-Example-Description: A deliberately long descriptive header that demonstrates local code overflow without horizontal scrolling of the complete article.\n\n{"name":"Example publishing project"}'
                }
                copyText={copyDenied ? deniedCopy : undefined}
              />
            </>
          ),
        },
        {
          id: 'result',
          label: 'Expected result',
          body: (
            <p>
              A real implementation validates the configuration and returns its own project
              identifier. This article performs no provisioning. See the Initial Setup reference for
              simulated recovery behavior.
            </p>
          ),
        },
      ]
    : policy
      ? [
          {
            id: 'scope',
            label: 'Scope of this example',
            body: (
              <p>
                This fictional editorial policy describes review of sample public articles. It is
                demonstration content, not an actual organization’s policy.
              </p>
            ),
          },
          {
            id: 'review',
            label: 'Review before publication',
            body: (
              <>
                <p>The example editor checks each article before publication.</p>
                <ul className="list-disc ps-scale-6">
                  <li>Confirm that the title describes the subject.</li>
                  <li>Keep essential qualifications in the main reading order.</li>
                  <li>Check that section links and supporting destinations work.</li>
                </ul>
              </>
            ),
          },
          {
            id: 'corrections',
            label: 'Corrections and version history',
            body: (
              <p>
                Show a revision note when an example article changes materially. Keep retired
                versions clearly marked. Version 2 is the current sample; version 1 is archived.
              </p>
            ),
          },
        ]
      : [
          {
            id: 'before-starting',
            label: 'Before you start',
            body: (
              <p>
                This guide describes a fictional publishing project. You need a project name and an
                editor who can review the draft. Reading this page does not create a project or
                change any settings.
              </p>
            ),
          },
          {
            id: 'prepare-draft',
            label: 'Prepare and review a first draft',
            body: (
              <ol className="list-decimal space-y-scale-3 ps-scale-6">
                <li>Choose a descriptive title and identify the article’s intended readers.</li>
                <li>Write the introduction and divide longer material into named sections.</li>
                <li>Ask an editor to check the facts, links, and essential qualifications.</li>
                <li>Review the complete draft before making it available to readers.</li>
              </ol>
            ),
          },
          {
            id: 'expected-result',
            label: 'Expected result and further help',
            body: (
              <>
                <p>
                  You should have a reviewed draft with a clear title and stable section headings.
                  If publishing is delayed, check the reported service condition before attempting
                  another submission.
                </p>
                <Link href="/examples/public-status">View sample service status</Link>
              </>
            ),
          },
        ]
  const archived = scenario === 'archived'
  return (
    <BatchReferenceFrame
      publicSite
      title={
        technical
          ? 'Configure a sample publishing project'
          : policy
            ? 'Example editorial policy'
            : 'Prepare a publishing project'
      }
      note="Fictional reading examples. The guide is static help; it is not an interactive task. The policy is demonstration content."
      controls={
        <>
          {technical && (
            <Select
              label="Copy scenario"
              value={copyDenied ? 'denied' : 'available'}
              onChange={(event) => setCopyDenied(event.target.value === 'denied')}
              options={[
                { value: 'available', label: 'Available' },
                { value: 'denied', label: 'Denied' },
              ]}
            />
          )}
          {!technical && (
            <Link href="/examples/public-content?context=technical">Open technical guide</Link>
          )}
          <Select
            label="Content scenario"
            value={scenario}
            onChange={(event) => setScenario(event.target.value)}
            options={[
              { value: 'available', label: 'Available' },
              { value: 'archived', label: 'Archived version' },
              { value: 'media-failed', label: 'Optional media unavailable' },
              { value: 'unavailable', label: 'Article unavailable' },
            ]}
          />
          <Link href={`/examples/public-content?context=${policy ? 'guide' : 'policy'}`}>
            Open {policy ? 'guide' : 'policy'} context
          </Link>
        </>
      }
    >
      <article className="space-y-scale-7">
        <PageHeader
          title={
            technical
              ? 'Configure a sample publishing project'
              : policy
                ? 'Example editorial policy'
                : 'Prepare a publishing project'
          }
          description={
            technical
              ? 'Configuration and request snippets for a fictional project.'
              : policy
                ? 'A sample policy for reviewing and updating public articles.'
                : 'A short guide to preparing an article for editorial review.'
          }
          metadata={
            policy
              ? `Example content team · Version ${archived ? '1 (archived)' : '2'} · October 5, 2026`
              : undefined
          }
        />
        {scenario === 'unavailable' ? (
          <p role="status">
            This article is unavailable. Its body and contents navigation cannot be shown. Choose
            Available in the preview controls to restore the sample.
          </p>
        ) : (
          <>
            {archived && (
              <p role="note">
                Archived example. This version is retained for reference and is not current.{' '}
                <Link href={`/examples/public-content?context=${policy ? 'policy' : 'guide'}`}>
                  Read the current sample version
                </Link>
                .
              </p>
            )}
            <ContentsNavigation
              items={sections.map((section) => ({
                id: section.id,
                label: section.label,
                targetId: section.id,
              }))}
            />
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="space-y-scale-3">
                <h2
                  id={section.id}
                  tabIndex={-1}
                  className="m-0 scroll-mt-scale-6 text-heading-md font-semibold break-words"
                >
                  {section.label}
                </h2>
                <div className="space-y-scale-3 text-body-md leading-relaxed break-words">
                  {section.body}
                </div>
              </section>
            ))}
            {scenario === 'media-failed' && (
              <p role="note">
                Optional illustration unavailable. All essential instructions are included in the
                text above.
              </p>
            )}
          </>
        )}
      </article>
    </BatchReferenceFrame>
  )
}
