import { useCallback, useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Modal } from './components/Modal'
import { docsRoutes } from './docs/routes'

const ArrowUpRight = ({ className = 'size-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 15 15 5M7 5h8v8" />
  </svg>
)

const Spark = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c.7 5.9 4.1 9.3 10 10-5.9.7-9.3 4.1-10 10-.7-5.9-4.1-9.3-10-10 5.9-.7 9.3-4.1 10-10Z" />
  </svg>
)

const labelClasses =
  'text-label-overline font-label-overline leading-label-overline font-semibold tracking-label-overline text-text-secondary uppercase'
const cardClasses =
  'relative overflow-hidden rounded-shape-lg border border-border-subtle bg-surface-primary'

function DemoPage() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('bento-ui-admin-theme') === 'dark',
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const focusSessionButtonRef = useRef<HTMLButtonElement>(null)
  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('bento-ui-admin-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <>
      <div
        className="mx-auto box-content min-h-screen max-w-container-page px-page-padding-mobile sm:px-page-padding-tablet lg:px-page-padding-desktop"
        inert={modalOpen ? true : undefined}
      >
        <header className="grid h-22 grid-cols-[1fr_auto_1fr] items-center border-b border-border-secondary max-sm:h-18 max-sm:grid-cols-[1fr_auto]">
          <a
            className="flex w-fit items-center gap-space-3 text-heading-sm font-bold tracking-[-.02em] whitespace-nowrap no-underline"
            href="#top"
            aria-label="Bento UI Admin home"
          >
            <span className="grid size-7 place-items-center rounded-shape-full bg-brand-background text-brand-on-background">
              <Spark className="size-4" />
            </span>
            Bento UI Admin
          </a>
          <nav className="hidden gap-space-2 sm:flex" aria-label="Primary navigation">
            <a
              className="rounded-shape-md bg-background-accent px-space-4 py-space-2 text-label-sm font-semibold text-text-accent"
              href="#overview"
            >
              Overview
            </a>
            <a
              className="rounded-shape-md px-space-4 py-space-2 text-label-sm font-semibold text-text-secondary hover:bg-action-ghost-background-hover hover:text-text-primary"
              href="#schedule"
            >
              Schedule
            </a>
            <a
              className="rounded-shape-md px-space-4 py-space-2 text-label-sm font-semibold text-text-secondary hover:bg-action-ghost-background-hover hover:text-text-primary"
              href="#projects"
            >
              Projects
            </a>
          </nav>
          <div className="flex items-center gap-space-3 justify-self-end">
            <Button
              variant="ghost"
              size="medium"
              iconOnly
              className="sm:hidden"
              aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-primary-navigation"
              onClick={() => setMobileNavOpen((value) => !value)}
            >
              <svg
                className="size-5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                {mobileNavOpen ? (
                  <path d="m5 5 10 10m0-10L5 15" />
                ) : (
                  <path d="M3 5h14M3 10h14M3 15h14" />
                )}
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="medium"
              iconOnly
              aria-label={darkMode ? 'Use light mode' : 'Use dark mode'}
              onClick={() => setDarkMode((value) => !value)}
            >
              {darkMode ? (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M20 15.4A8.5 8.5 0 0 1 8.6 4a8.5 8.5 0 1 0 11.4 11.4Z" />
                </svg>
              )}
            </Button>
            <div
              className="hidden size-control-height-medium place-items-center rounded-shape-full border-2 border-brand-border bg-brand-background text-label-md font-bold text-brand-on-background sm:grid"
              aria-label="Profile for Mira"
            >
              M
            </div>
          </div>
        </header>

        {mobileNavOpen && (
          <nav
            id="mobile-primary-navigation"
            className="grid gap-space-1 border-b border-border-secondary py-space-3 sm:hidden"
            aria-label="Primary navigation"
          >
            {[
              ['Overview', '#overview'],
              ['Schedule', '#schedule'],
              ['Projects', '#projects'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-shape-md px-space-4 py-space-2 text-label-md font-semibold text-text-secondary hover:bg-action-ghost-background-hover hover:text-text-primary"
                onClick={() => setMobileNavOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        <main id="top">
          <section
            className="flex items-end justify-between px-space-1 pt-space-12 pb-space-6 max-sm:flex-col max-sm:items-start max-sm:gap-space-4 max-sm:pt-space-8"
            aria-labelledby="page-title"
          >
            <div>
              <p className={labelClasses}>Friday, August 28</p>
              <h1
                id="page-title"
                className="mt-space-2 text-[clamp(34px,4vw,52px)] leading-none font-bold tracking-heading-xl"
              >
                Good morning, Mira.
              </h1>
            </div>
            <p className="mb-space-1 w-72 text-body-sm leading-relaxed text-text-secondary max-sm:w-auto">
              You have space to do meaningful work today.
            </p>
          </section>

          <section
            className="grid grid-cols-1 gap-grid-gutter-mobile sm:gap-grid-gutter-tablet lg:grid-cols-12 lg:gap-grid-gutter-desktop"
            id="overview"
            aria-label="Daily overview"
          >
            <article className="relative min-h-[430px] overflow-hidden rounded-shape-lg bg-background-inverse p-space-8 text-text-inverse max-sm:min-h-[570px] max-sm:p-space-6 lg:col-span-8">
              <div className="relative z-10 flex h-full max-w-[55%] flex-col items-start max-sm:max-w-none">
                <span className="inline-flex items-center gap-space-2 rounded-shape-full bg-navigation-sidebar-item-hover px-space-3 py-space-2 font-label-overline text-label-overline leading-label-overline font-semibold tracking-label-overline uppercase">
                  <span className="size-1.5 rounded-shape-full bg-current" /> Today’s intention
                </span>
                <h2 className="my-space-8 text-display-lg leading-[1.08] font-bold tracking-display-lg max-sm:text-heading-xl">
                  Make room
                  <br />
                  for better work.
                </h2>
                <p className="max-w-96 text-body-sm leading-relaxed text-text-inverse/72">
                  Protect your clearest hours. The small things can wait until the important thing
                  has momentum.
                </p>
                <Button
                  ref={focusSessionButtonRef}
                  variant="secondary"
                  size="large"
                  className="mt-auto max-sm:mt-space-6"
                  icon={<ArrowUpRight />}
                  onClick={() => setModalOpen(true)}
                >
                  {sessionActive ? 'Focus session active' : 'Start a focus session'}
                </Button>
              </div>
              <div
                className="absolute inset-y-0 right-0 w-[45%] max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:h-56 max-sm:w-full"
                aria-hidden="true"
              >
                <div className="absolute top-10 right-[-82px] size-[330px] rounded-shape-full border border-border-inverse max-sm:top-0 max-sm:right-[-55px] max-sm:size-[250px]" />
                <div className="absolute top-[88px] right-[-34px] size-[235px] rounded-shape-full border border-border-inverse max-sm:top-12 max-sm:right-[-7px] max-sm:size-[155px]" />
                <div className="absolute top-[132px] right-2.5 grid size-[148px] place-items-center rounded-shape-full bg-brand-background-subtle text-brand-foreground ring-12 ring-brand-background-subtle/10 max-sm:top-[68px] max-sm:right-4 max-sm:size-28">
                  <Spark className="size-12 max-sm:size-9" />
                </div>
                <div className="absolute right-37 bottom-12 grid size-[90px] rotate-[-8deg] place-content-center rounded-shape-full bg-status-info-background text-center text-body-sm leading-none font-bold text-status-info-foreground max-sm:bottom-6 max-sm:left-9">
                  09:30
                  <span className="mt-1 font-label-overline text-label-overline leading-label-overline font-semibold tracking-label-overline uppercase">
                    deep work
                  </span>
                </div>
              </div>
            </article>

            <article
              className={`${cardClasses} flex min-h-[430px] flex-col p-space-6 lg:col-span-4`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={labelClasses}>Weekly focus</p>
                  <h3 className="mt-space-2 text-heading-md font-semibold">Quiet progress</h3>
                </div>
                <Button variant="ghost" size="medium" iconOnly aria-label="Open weekly focus">
                  <ArrowUpRight />
                </Button>
              </div>
              <div className="relative mx-auto my-space-6 grid size-[194px] place-items-center rounded-shape-full bg-[conic-gradient(var(--color-chart-positive)_72%,var(--color-status-positive-background)_0)] after:absolute after:size-[154px] after:rounded-shape-full after:bg-surface-primary">
                <div className="relative z-10 flex flex-col text-center">
                  <strong className="text-display-lg leading-none font-bold tracking-display-lg">
                    72%
                  </strong>
                  <span className="mt-space-2 text-label-sm font-semibold tracking-[.08em] text-text-secondary uppercase">
                    complete
                  </span>
                </div>
              </div>
              <p className="mt-auto text-center text-body-xs text-text-secondary">
                <span className="font-bold text-chart-positive">↗ 12%</span> from last week
              </p>
            </article>

            <article
              className={`${cardClasses} min-h-[360px] p-space-6 lg:col-span-5`}
              id="schedule"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={labelClasses}>On your desk</p>
                  <h3 className="mt-space-2 text-heading-md font-semibold">Today’s rhythm</h3>
                </div>
                <span className="grid size-control-height-small place-items-center rounded-shape-sm bg-background-inverse text-data-sm font-semibold text-text-inverse">
                  28
                </span>
              </div>
              <ol className="mt-space-6">
                {[
                  ['09:30', 'bg-chart-series-3', 'Deep work', 'Brand direction', '90m'],
                  ['12:00', 'bg-chart-series-5', 'Studio sync', '4 teammates', '30m'],
                  ['15:30', 'bg-chart-series-4', 'Open space', 'Unscheduled', '60m'],
                ].map(([time, color, title, detail, duration]) => (
                  <li
                    className="grid min-h-[71px] grid-cols-[43px_4px_1fr_auto] items-center gap-space-3 border-t border-table-border"
                    key={time}
                  >
                    <time className="text-body-xs font-semibold text-text-secondary">{time}</time>
                    <span className={`h-9 w-1 rounded-shape-full ${color}`} />
                    <span className="flex flex-col gap-space-1">
                      <strong className="text-body-sm">{title}</strong>
                      <span className="text-body-xs text-text-secondary">{detail}</span>
                    </span>
                    <span className="rounded-shape-full bg-background-tertiary px-space-2 py-space-1 text-body-xs text-text-secondary">
                      {duration}
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="flex min-h-[360px] flex-col rounded-shape-lg border border-border-accent bg-background-accent p-space-6 text-text-primary lg:col-span-3">
              <div className="text-display-lg leading-[.7] font-bold text-text-accent">“</div>
              <blockquote className="mt-space-6 text-heading-md leading-[1.3] font-semibold">
                Clarity comes from engagement, not thought.
              </blockquote>
              <div className="mt-auto flex items-center justify-between text-caption font-medium">
                <span>— Marie Forleo</span>
                <Button
                  variant="primary"
                  size="medium"
                  iconOnly
                  aria-label="Save quote"
                  className="text-xl"
                >
                  +
                </Button>
              </div>
            </article>

            <article
              className="relative flex min-h-[360px] flex-col overflow-hidden rounded-shape-lg bg-background-inverse p-space-6 text-text-inverse lg:col-span-4"
              id="projects"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-space-2 rounded-shape-full bg-status-positive-background px-space-3 py-space-2 text-label-sm font-semibold tracking-[.08em] text-status-positive-foreground uppercase">
                  <span className="size-1.5 rounded-shape-full bg-current" /> In motion
                </span>
                <div className="flex" aria-label="Three collaborators">
                  {['R', 'J', 'N'].map((person) => (
                    <span
                      className="-ml-space-2 grid size-8 place-items-center rounded-shape-full border-2 border-background-inverse bg-brand-background-subtle text-label-sm font-bold text-brand-foreground"
                      key={person}
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto">
                <p className="font-label-overline text-label-overline leading-label-overline font-semibold tracking-label-overline text-text-inverse/60 uppercase">
                  Featured project · 03
                </p>
                <h3 className="mt-space-3 text-heading-lg leading-none font-bold tracking-heading-lg">
                  Field Notes
                  <br />
                  identity system
                </h3>
                <div className="mt-space-6 flex justify-between text-body-xs text-text-inverse/70">
                  <span>12 of 16 tasks</span>
                  <span>Due Friday</span>
                </div>
                <div className="mt-space-3 h-1.5 overflow-hidden rounded-shape-full bg-border-inverse">
                  <span className="block h-full w-3/4 rounded-shape-full bg-chart-series-1" />
                </div>
              </div>
              <Button
                variant="secondary"
                size="medium"
                iconOnly
                className="absolute right-6 bottom-[74px]"
                aria-label="Open Field Notes project"
              >
                <ArrowUpRight />
              </Button>
            </article>

            <article
              className={`${cardClasses} grid min-h-[178px] items-center gap-space-6 p-space-6 sm:grid-cols-[1fr_auto_1fr] lg:col-span-12`}
            >
              <div>
                <p className={labelClasses}>System check</p>
                <h3 className="mt-space-2 text-heading-md leading-tight font-semibold">
                  Made from
                  <br />
                  <code className="rounded-shape-sm bg-background-tertiary px-1.5 py-0.5 font-mono text-lg font-bold">
                    DESIGN.md
                  </code>
                </h3>
              </div>
              <div
                className="flex rounded-shape-full bg-background-tertiary p-space-2"
                aria-label="Theme colors"
              >
                {[
                  'bg-brand-background',
                  'bg-chart-series-3',
                  'bg-chart-series-4',
                  'bg-chart-series-5',
                ].map((color) => (
                  <span
                    className={`-ml-space-1 size-12 rounded-shape-full border-3 border-surface-primary first:ml-0 ${color}`}
                    key={color}
                  />
                ))}
              </div>
              <p className="max-w-52 justify-self-end text-body-xs leading-relaxed text-text-secondary max-sm:justify-self-start">
                One readable source. Tailwind CSS and DTCG exports included.
              </p>
            </article>
          </section>
        </main>

        <footer className="flex justify-between px-space-1 pt-space-6 pb-space-8 text-label-sm font-semibold tracking-[.08em] text-text-secondary uppercase max-sm:flex-col max-sm:gap-space-4">
          <span>Bento UI Admin</span>
          <span>Designed for unhurried momentum.</span>
        </footer>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        returnFocusRef={focusSessionButtonRef}
        title="Protect your focus"
        description="Name the one outcome that deserves your clearest attention."
        footer={
          <>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setSessionActive(true)
                closeModal()
              }}
            >
              Begin 90 minutes
            </Button>
          </>
        }
      >
        <Input
          label="Focus outcome"
          hint="Keep it specific"
          placeholder="Complete the brand direction"
          helperText="You can change this when the session begins."
          autoFocus
        />
      </Modal>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      {docsRoutes}
      <Route path="/" element={<DemoPage />} />
      <Route path="*" element={<DemoPage />} />
    </Routes>
  )
}
