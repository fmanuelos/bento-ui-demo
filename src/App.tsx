import { useCallback, useEffect, useState } from 'react'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Modal } from './components/Modal'

const ArrowUpRight = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" />
  </svg>
)

const Spark = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c.7 5.9 4.1 9.3 10 10-5.9.7-9.3 4.1-10 10-.7-5.9-4.1-9.3-10-10 5.9-.7 9.3-4.1 10-10Z" />
  </svg>
)

const labelClasses = 'text-[10px] font-extrabold uppercase leading-none tracking-[.12em] text-muted dark:text-dark-muted'
const cardClasses = 'relative overflow-hidden rounded-lg border border-primary/8 bg-surface dark:border-dark-line dark:bg-dark-surface'

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('morrow-theme') === 'dark')
  const [modalOpen, setModalOpen] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('morrow-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <>
      <div className="mx-auto min-h-screen w-[min(1240px,calc(100%-3rem))] max-sm:w-[calc(100%-1.75rem)]">
        <header className="grid h-22 grid-cols-[1fr_auto_1fr] items-center border-b border-line dark:border-dark-line max-sm:h-18 max-sm:grid-cols-[1fr_auto]">
          <a className="flex w-fit items-center gap-2.5 text-xl font-extrabold tracking-[-.04em] no-underline" href="#top" aria-label="Morrow home">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-sun dark:bg-sun dark:text-primary"><Spark className="size-4" /></span>
            morrow
          </a>
          <nav className="flex gap-2 max-sm:hidden" aria-label="Primary navigation">
            <a className="rounded-full bg-white/55 px-4 py-2.5 text-[13px] font-bold dark:bg-white/8" href="#overview">Overview</a>
            <a className="rounded-full px-4 py-2.5 text-[13px] font-bold text-muted hover:text-primary dark:text-dark-muted dark:hover:text-white" href="#schedule">Schedule</a>
            <a className="rounded-full px-4 py-2.5 text-[13px] font-bold text-muted hover:text-primary dark:text-dark-muted dark:hover:text-white" href="#projects">Projects</a>
          </nav>
          <div className="flex items-center justify-self-end gap-3">
            <Button variant="ghost" size="icon" aria-label={darkMode ? 'Use light mode' : 'Use dark mode'} onClick={() => setDarkMode((value) => !value)}>
              {darkMode ? (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              ) : (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 15.4A8.5 8.5 0 0 1 8.6 4a8.5 8.5 0 1 0 11.4 11.4Z" /></svg>
              )}
            </Button>
            <div className="grid size-11 place-items-center rounded-full border-2 border-surface bg-sage-deep text-sm font-extrabold text-white dark:border-dark-surface" aria-label="Profile for Mira">M</div>
          </div>
        </header>

        <main id="top">
          <section className="flex items-end justify-between px-1 pb-7 pt-14 max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:pt-10" aria-labelledby="page-title">
            <div>
              <p className={labelClasses}>Friday, August 28</p>
              <h1 id="page-title" className="mt-1.5 font-display text-[clamp(34px,4vw,52px)] leading-none tracking-display">Good morning, Mira.</h1>
            </div>
            <p className="mb-1 w-72 text-sm leading-relaxed text-muted dark:text-dark-muted max-sm:w-auto">You have space to do meaningful work today.</p>
          </section>

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-12" id="overview" aria-label="Daily overview">
            <article className="relative min-h-[430px] overflow-hidden rounded-lg bg-sage-deep p-9 text-white lg:col-span-8 max-sm:min-h-[570px] max-sm:p-6">
              <div className="relative z-10 flex h-full max-w-[55%] flex-col items-start max-sm:max-w-none">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[.11em]">
                  <span className="size-1.5 rounded-full bg-current" /> Today’s intention
                </span>
                <h2 className="my-8 font-display text-[clamp(44px,5vw,68px)] leading-[.94] tracking-[-.045em] max-sm:text-[46px]">Make room<br />for better work.</h2>
                <p className="max-w-96 text-sm leading-relaxed text-white/72">Protect your clearest hours. The small things can wait until the important thing has momentum.</p>
                <Button
                  variant="secondary"
                  className="mt-auto border-white bg-white text-primary hover:border-sun hover:bg-sun dark:border-white dark:bg-white dark:text-primary max-sm:mt-6"
                  icon={<ArrowUpRight className="size-4" />}
                  onClick={() => setModalOpen(true)}
                >
                  {sessionActive ? 'Focus session active' : 'Start a focus session'}
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 w-[45%] max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:h-56 max-sm:w-full" aria-hidden="true">
                <div className="absolute right-[-82px] top-10 size-[330px] rounded-full border border-white/20 max-sm:right-[-55px] max-sm:top-0 max-sm:size-[250px]" />
                <div className="absolute right-[-34px] top-[88px] size-[235px] rounded-full border border-white/20 max-sm:right-[-7px] max-sm:top-12 max-sm:size-[155px]" />
                <div className="absolute right-2.5 top-[132px] grid size-[148px] place-items-center rounded-full bg-sun text-primary ring-12 ring-sun/8 max-sm:right-4 max-sm:top-[68px] max-sm:size-28">
                  <Spark className="size-12 max-sm:size-9" />
                </div>
                <div className="absolute bottom-12 right-37 grid size-[90px] rotate-[-8deg] place-content-center rounded-full bg-sage text-center text-sm font-extrabold leading-none text-primary max-sm:bottom-6 max-sm:left-9">
                  09:30<span className="mt-1 text-[8px] uppercase tracking-[.1em]">deep work</span>
                </div>
              </div>
            </article>

            <article className={`${cardClasses} flex min-h-[430px] flex-col p-7 lg:col-span-4`}>
              <div className="flex items-start justify-between">
                <div><p className={labelClasses}>Weekly focus</p><h3 className="mt-1.5 text-2xl font-bold tracking-heading">Quiet progress</h3></div>
                <Button variant="ghost" size="icon" aria-label="Open weekly focus"><ArrowUpRight /></Button>
              </div>
              <div className="relative mx-auto my-5 grid size-[194px] place-items-center rounded-full bg-[conic-gradient(var(--color-sage-deep)_72%,var(--color-sage)_0)] after:absolute after:size-[154px] after:rounded-full after:bg-surface dark:after:bg-dark-surface">
                <div className="relative z-10 flex flex-col text-center"><strong className="font-display text-5xl font-normal leading-none tracking-display">72%</strong><span className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[.11em] text-muted dark:text-dark-muted">complete</span></div>
              </div>
              <p className="mt-auto text-center text-xs text-muted dark:text-dark-muted"><span className="font-extrabold text-sage-deep dark:text-sage">↗ 12%</span> from last week</p>
            </article>

            <article className={`${cardClasses} min-h-[360px] p-7 lg:col-span-5`} id="schedule">
              <div className="flex items-start justify-between">
                <div><p className={labelClasses}>On your desk</p><h3 className="mt-1.5 text-2xl font-bold tracking-heading">Today’s rhythm</h3></div>
                <span className="grid size-10 place-items-center rounded-sm bg-primary font-display text-lg text-surface dark:bg-sun dark:text-primary">28</span>
              </div>
              <ol className="mt-7">
                {[
                  ['09:30', 'bg-sage-deep', 'Deep work', 'Brand direction', '90m'],
                  ['12:00', 'bg-coral', 'Studio sync', '4 teammates', '30m'],
                  ['15:30', 'bg-sun', 'Open space', 'Unscheduled', '60m'],
                ].map(([time, color, title, detail, duration]) => (
                  <li className="grid min-h-[71px] grid-cols-[43px_4px_1fr_auto] items-center gap-3 border-t border-line dark:border-dark-line" key={time}>
                    <time className="text-[10px] font-extrabold text-muted dark:text-dark-muted">{time}</time>
                    <span className={`h-9 w-1 rounded-full ${color}`} />
                    <span className="flex flex-col gap-1"><strong className="text-[13px]">{title}</strong><span className="text-[10px] text-muted dark:text-dark-muted">{detail}</span></span>
                    <span className="rounded-full bg-paper px-2 py-1 text-[10px] text-muted dark:bg-primary dark:text-dark-muted">{duration}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="flex min-h-[360px] flex-col rounded-lg border border-primary/8 bg-sun p-7 text-primary lg:col-span-3">
              <div className="font-display text-7xl leading-[.7]">“</div>
              <blockquote className="mt-7 font-display text-[27px] leading-[1.17] tracking-[-.035em]">Clarity comes from engagement, not thought.</blockquote>
              <div className="mt-auto flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[.08em]">
                <span>— Marie Forleo</span>
                <Button variant="primary" size="icon" aria-label="Save quote" className="text-xl">+</Button>
              </div>
            </article>

            <article className="relative flex min-h-[360px] flex-col overflow-hidden rounded-lg bg-primary p-7 text-white lg:col-span-4" id="projects">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-sage px-3 py-2 text-[9px] font-extrabold uppercase tracking-[.11em] text-sage-deep"><span className="size-1.5 rounded-full bg-current" /> In motion</span>
                <div className="flex" aria-label="Three collaborators">
                  {['R', 'J', 'N'].map((person, index) => <span className={`-ml-2 grid size-8 place-items-center rounded-full border-2 border-primary text-[9px] font-extrabold text-primary ${['bg-coral','bg-sun','bg-sage'][index]}`} key={person}>{person}</span>)}
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-white/50">Featured project · 03</p>
                <h3 className="mt-2.5 text-3xl font-bold leading-none tracking-heading">Field Notes<br />identity system</h3>
                <div className="mt-6 flex justify-between text-[10px] text-white/55"><span>12 of 16 tasks</span><span>Due Friday</span></div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/16"><span className="block h-full w-3/4 rounded-full bg-sun" /></div>
              </div>
              <Button variant="secondary" size="icon" className="absolute bottom-[74px] right-6 border-white bg-white text-primary" aria-label="Open Field Notes project"><ArrowUpRight /></Button>
            </article>

            <article className={`${cardClasses} grid min-h-[178px] items-center gap-6 p-7 sm:grid-cols-[1fr_auto_1fr] lg:col-span-12`}>
              <div><p className={labelClasses}>System check</p><h3 className="mt-2 font-display text-2xl leading-tight">Made from<br /><code className="rounded-sm bg-paper px-1.5 py-0.5 font-mono text-lg font-bold dark:bg-primary">DESIGN.md</code></h3></div>
              <div className="flex rounded-full bg-paper p-2 dark:bg-primary" aria-label="Theme colors">
                {['bg-primary','bg-sage','bg-sun','bg-coral'].map((color) => <span className={`-ml-1 first:ml-0 size-12 rounded-full border-3 border-surface dark:border-dark-surface ${color}`} key={color} />)}
              </div>
              <p className="justify-self-end max-w-52 text-xs leading-relaxed text-muted dark:text-dark-muted max-sm:justify-self-start">One readable source. Tailwind CSS and DTCG exports included.</p>
            </article>
          </section>
        </main>

        <footer className="flex justify-between px-1 pb-10 pt-7 text-[10px] font-bold uppercase tracking-[.08em] text-muted dark:text-dark-muted max-sm:flex-col max-sm:gap-5">
          <span>Morrow Workroom</span><span>Designed for unhurried momentum.</span>
        </footer>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Protect your focus"
        description="Name the one outcome that deserves your clearest attention."
        footer={
          <>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            <Button onClick={() => { setSessionActive(true); closeModal() }}>Begin 90 minutes</Button>
          </>
        }
      >
        <Input label="Focus outcome" hint="Keep it specific" placeholder="Complete the brand direction" helperText="You can change this when the session begins." autoFocus />
      </Modal>
    </>
  )
}

export default App
