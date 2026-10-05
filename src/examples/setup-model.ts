export type SetupOutcome = 'success' | 'failure' | 'partial' | 'unknown'
export type SetupState = {
  phase: 'configure' | 'review' | 'pending' | 'failed' | 'partial' | 'unknown' | 'complete'
  name: string
  region: string
  resourceId?: string
  attempt: number
  error?: string
}
export const initialSetup: SetupState = { phase: 'configure', name: '', region: 'us', attempt: 0 }
export type SetupAction =
  | { type: 'edit'; field: 'name' | 'region'; value: string }
  | { type: 'review' | 'back' | 'start' | 'reconcile' }
  | { type: 'resolve'; attempt: number; outcome: SetupOutcome }
export function setupReducer(state: SetupState, action: SetupAction): SetupState {
  switch (action.type) {
    case 'edit':
      if (state.phase !== 'configure' || state.resourceId) return state
      return { ...state, [action.field]: action.value, error: undefined }
    case 'review':
      if (state.phase !== 'configure') return state
      if (
        !state.name.trim() ||
        state.name.trim().length > 80 ||
        !['us', 'eu'].includes(state.region)
      )
        return {
          ...state,
          error: 'Enter a name of 1–80 characters and select an available region.',
        }
      return { ...state, name: state.name.trim(), phase: 'review', error: undefined }
    case 'back':
      return (state.phase === 'review' || state.phase === 'failed') && !state.resourceId
        ? { ...state, phase: 'configure' }
        : state
    case 'start':
      return ['review', 'failed', 'partial'].includes(state.phase)
        ? { ...state, phase: 'pending', attempt: state.attempt + 1 }
        : state
    case 'resolve': {
      if (state.phase !== 'pending' || state.attempt !== action.attempt) return state
      if (action.outcome === 'unknown') return { ...state, phase: 'unknown' }
      if (action.outcome === 'failure')
        return { ...state, phase: state.resourceId ? 'partial' : 'failed' }
      return {
        ...state,
        resourceId: state.resourceId ?? 'DEMO-RESOURCE-001',
        phase: action.outcome === 'partial' ? 'partial' : 'complete',
      }
    }
    case 'reconcile':
      return state.phase === 'unknown'
        ? { ...state, resourceId: state.resourceId ?? 'DEMO-RESOURCE-001', phase: 'complete' }
        : state
  }
}
