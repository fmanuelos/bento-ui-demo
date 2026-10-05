export type CheckoutContext = 'download' | 'subscription'
export type PaymentOutcome =
  'success' | 'declined' | 'verification' | 'unknown' | 'fulfillment-pending'
export type CheckoutQuote = {
  id: string
  revision: number
  currency: 'USD'
  quantity: number
  unitAmount: number
  subtotal: number
  discount: number
  tax: number
  total: number
  renewalTotal?: number
}

/** Fictional integer-cent fixtures, not a pricing or tax service. */
export function checkoutQuote(
  context: CheckoutContext,
  quantity: number,
  revision = 1,
): CheckoutQuote {
  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 3 ||
    !Number.isInteger(revision) ||
    revision < 1
  )
    throw new Error('Unsupported sample quote')
  const unitAmount = (context === 'subscription' ? 3600 : 2400) + (revision - 1) * 400
  const subtotal = unitAmount * quantity
  const discount = context === 'subscription' ? 600 * quantity : quantity > 1 ? 400 : 0
  const tax = (subtotal - discount) / 10
  return {
    id: `DEMO-${context}-${revision}-${quantity}`,
    revision,
    currency: 'USD',
    quantity,
    unitAmount,
    subtotal,
    discount,
    tax,
    total: subtotal - discount + tax,
    renewalTotal: context === 'subscription' ? subtotal + subtotal / 10 : undefined,
  }
}

export type CheckoutState = {
  context: CheckoutContext
  phase:
    | 'selection'
    | 'review'
    | 'pending'
    | 'verification'
    | 'declined'
    | 'cancelled'
    | 'unknown'
    | 'paid'
    | 'complete'
  quote: CheckoutQuote
  availability: 'current' | 'stale' | 'unavailable'
  acknowledged: boolean
  attempt: number
  checking: boolean
  checkSequence: number
  request?: { id: string; quote: CheckoutQuote }
  receipt?: string
  message: string
}
export function initialCheckout(context: CheckoutContext): CheckoutState {
  return {
    context,
    phase: 'selection',
    quote: checkoutQuote(context, 1),
    availability: 'current',
    acknowledged: false,
    attempt: 0,
    checking: false,
    checkSequence: 0,
    message: '',
  }
}
export type CheckoutAction =
  | { type: 'quantity'; quantity: number }
  | { type: 'availability'; availability: CheckoutState['availability'] }
  | { type: 'acknowledge'; value: boolean }
  | { type: 'review' | 'edit' | 'refresh' | 'submit' | 'cancel-verification' | 'verify' | 'check' }
  | { type: 'payment-result'; attempt: number; outcome: PaymentOutcome }
  | {
      type: 'check-result'
      attempt: number
      checkSequence: number
      outcome: 'confirmed' | 'unpaid' | 'unresolved'
    }

const mutable = (state: CheckoutState) =>
  ['selection', 'review', 'declined', 'cancelled'].includes(state.phase)
export function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'quantity':
      if (
        state.phase !== 'selection' ||
        !Number.isInteger(action.quantity) ||
        action.quantity < 1 ||
        action.quantity > 3
      )
        return state
      return {
        ...state,
        quote: checkoutQuote(state.context, action.quantity, state.quote.revision),
        acknowledged: false,
        message: '',
      }
    case 'availability':
      if (!mutable(state)) return state
      return {
        ...state,
        availability: action.availability,
        acknowledged: false,
        message:
          action.availability === 'stale'
            ? 'The quote expired. Refresh it before continuing.'
            : action.availability === 'unavailable'
              ? 'The offer is unavailable. No payment can begin.'
              : 'Sample availability restored. Review before continuing.',
      }
    case 'review':
      if (!mutable(state) || state.availability !== 'current') return state
      return { ...state, phase: 'review', acknowledged: false, message: '' }
    case 'edit':
      return mutable(state)
        ? { ...state, phase: 'selection', acknowledged: false, message: '' }
        : state
    case 'acknowledge':
      return state.phase === 'review' && state.availability === 'current'
        ? { ...state, acknowledged: action.value }
        : state
    case 'refresh':
      if (!mutable(state)) return state
      return {
        ...state,
        quote: checkoutQuote(state.context, state.quote.quantity, state.quote.revision + 1),
        availability: 'current',
        acknowledged: false,
        message:
          'A new sample quote increased the unit price by $4.00 USD. Review the updated total and any renewal amount before paying.',
      }
    case 'submit': {
      if (state.phase !== 'review' || state.availability !== 'current' || !state.acknowledged)
        return state
      const attempt = state.attempt + 1
      return {
        ...state,
        phase: 'pending',
        attempt,
        acknowledged: false,
        request: { id: `DEMO-ATTEMPT-${attempt}`, quote: { ...state.quote } },
        message: 'Waiting for the simulated payment provider…',
      }
    }
    case 'payment-result': {
      if (state.phase !== 'pending' || action.attempt !== state.attempt || !state.request)
        return state
      const phases = {
        success: 'complete',
        declined: 'declined',
        verification: 'verification',
        unknown: 'unknown',
        'fulfillment-pending': 'paid',
      } as const
      const messages = {
        success: 'Sample payment and delivery confirmed.',
        declined:
          'Sample payment declined. No charge was confirmed. Review before another attempt.',
        verification: 'The sample provider requires an additional verification step.',
        unknown: 'Payment may have succeeded. Check this attempt before trying again.',
        'fulfillment-pending':
          'Sample payment confirmed; delivery is still pending. Do not pay again.',
      }
      return {
        ...state,
        phase: phases[action.outcome],
        message: messages[action.outcome],
        receipt: ['success', 'fulfillment-pending'].includes(action.outcome)
          ? `DEMO-RECEIPT-${state.attempt}`
          : undefined,
      }
    }
    case 'cancel-verification':
      return state.phase === 'verification'
        ? {
            ...state,
            phase: 'cancelled',
            message:
              'Sample verification cancelled before payment. No charge was made in this simulation.',
          }
        : state
    case 'verify':
      return state.phase === 'verification'
        ? {
            ...state,
            phase: 'unknown',
            message:
              'Sample verification returned. Check the provider result; returning alone does not confirm payment.',
          }
        : state
    case 'check':
      return ['unknown', 'paid'].includes(state.phase) && !state.checking
        ? {
            ...state,
            checking: true,
            checkSequence: state.checkSequence + 1,
            message: 'Checking the existing sample attempt…',
          }
        : state
    case 'check-result': {
      if (
        !state.checking ||
        !['unknown', 'paid'].includes(state.phase) ||
        state.attempt !== action.attempt ||
        state.checkSequence !== action.checkSequence
      )
        return state
      if (
        action.outcome === 'unresolved' ||
        (state.phase === 'paid' && action.outcome === 'unpaid')
      )
        return {
          ...state,
          checking: false,
          message:
            'The result is still unresolved. Keep the attempt identifier and check again; do not submit another payment.',
        }
      if (action.outcome === 'unpaid')
        return {
          ...state,
          phase: 'declined',
          checking: false,
          message:
            'The sample provider confirmed this attempt was not paid. Review before starting a new attempt.',
        }
      return {
        ...state,
        phase: 'complete',
        checking: false,
        receipt: state.receipt ?? `DEMO-RECEIPT-${state.attempt}`,
        message: 'Sample payment and delivery confirmed for the existing attempt.',
      }
    }
  }
}
