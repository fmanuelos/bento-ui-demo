export type JourneyKind = 'onboarding' | 'application'
export type JourneyValues = {
  name: string
  audience: 'individual' | 'organization'
  organization: string
  preference: string
}
export type JourneyState = {
  kind: JourneyKind
  values: JourneyValues
  step: number
  reached: number
  skipped: boolean
  status: 'editing' | 'pending' | 'failed' | 'unknown' | 'complete'
  errors: Record<string, string>
}
export type JourneyAction =
  | { type: 'edit'; field: keyof JourneyValues; value: string }
  | { type: 'next' }
  | { type: 'skip' }
  | { type: 'go'; step: number }
  | { type: 'submit' }
  | { type: 'resolve'; outcome: 'success' | 'failed' | 'unknown' }
  | { type: 'reconcile' }
export function initialJourney(kind: JourneyKind): JourneyState {
  return {
    kind,
    values: { name: '', audience: 'individual', organization: '', preference: '' },
    step: 0,
    reached: 0,
    skipped: false,
    status: 'editing',
    errors: {},
  }
}
export function validateJourney(state: JourneyState, all = false) {
  const errors: Record<string, string> = {}
  if ((all || state.step === 0) && !state.values.name.trim())
    errors.name = 'Enter a sample display name.'
  if (
    (all || state.step === 1) &&
    state.kind === 'application' &&
    state.values.audience === 'organization' &&
    !state.values.organization.trim()
  )
    errors.organization = 'Enter the organization name.'
  return errors
}
export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  if (action.type === 'resolve') {
    if (state.status !== 'pending') return state
    return { ...state, status: action.outcome === 'success' ? 'complete' : action.outcome }
  }
  if (action.type === 'reconcile')
    return state.status === 'unknown' ? { ...state, status: 'complete' } : state
  if (['pending', 'unknown', 'complete'].includes(state.status)) return state
  if (action.type === 'edit') {
    if (action.field === 'audience' && !['individual', 'organization'].includes(action.value))
      return state
    const values = { ...state.values, [action.field]: action.value }
    if (action.field === 'audience' && action.value !== state.values.audience)
      values.organization = ''
    return {
      ...state,
      values,
      errors: {},
      status: 'editing',
      reached: Math.min(state.reached, state.step),
      skipped: action.field === 'preference' ? false : state.skipped,
    }
  }
  if (action.type === 'go')
    return action.step >= 0 && action.step <= state.reached && action.step <= 2
      ? { ...state, step: action.step, errors: {}, status: 'editing' }
      : state
  if (action.type === 'skip')
    return state.kind === 'onboarding' && state.step === 1
      ? {
          ...state,
          values: { ...state.values, preference: '' },
          step: 2,
          reached: 2,
          skipped: true,
          errors: {},
        }
      : state
  if (action.type === 'next') {
    const errors = validateJourney(state)
    if (Object.keys(errors).length) return { ...state, errors }
    const step = Math.min(2, state.step + 1)
    return { ...state, step, reached: Math.max(state.reached, step), errors: {}, status: 'editing' }
  }
  if (action.type === 'submit' && state.step === 2) {
    const errors = validateJourney(state, true)
    if (Object.keys(errors).length) return { ...state, step: errors.name ? 0 : 1, errors }
    return { ...state, status: 'pending', errors: {} }
  }
  return state
}
export function saveJourney(state: JourneyState, context: string, now: number) {
  return JSON.stringify({
    version: 1,
    context,
    expires: now + 60 * 60 * 1000,
    kind: state.kind,
    values: state.values,
    step: state.step,
    skipped: state.skipped,
  })
}
export function restoreJourney(
  raw: string | null,
  kind: JourneyKind,
  context: string,
  now: number,
): JourneyState | null {
  try {
    const draft = JSON.parse(raw ?? 'null')
    if (
      !draft ||
      draft.version !== 1 ||
      draft.kind !== kind ||
      draft.context !== context ||
      !Number.isFinite(draft.expires) ||
      draft.expires <= now ||
      draft.expires > now + 60 * 60 * 1000 ||
      !draft.values
    )
      return null
    const { name, audience, organization, preference } = draft.values
    if (
      ![name, organization, preference].every(
        (value) => typeof value === 'string' && value.length <= 200,
      ) ||
      !['individual', 'organization'].includes(audience)
    )
      return null
    const state = {
      ...initialJourney(kind),
      values: {
        name,
        audience,
        organization: audience === 'organization' ? organization : '',
        preference,
      },
      skipped: kind === 'onboarding' && draft.skipped === true,
    }
    const errors = validateJourney(state, true)
    const step = errors.name
      ? 0
      : errors.organization
        ? 1
        : [0, 1, 2].includes(draft.step)
          ? draft.step
          : 0
    return { ...state, step, reached: step }
  } catch {
    return null
  }
}
