import { useEffect, useReducer, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  Button,
  Checkbox,
  CompletionSummary,
  FlowStepNavigation,
  FormSection,
  Link,
  OrderSummary,
  PageHeader,
  Progress,
  Select,
} from '../components'
import { BatchReferenceFrame } from './BatchReferenceFrame'
import {
  checkoutReducer,
  initialCheckout,
  type CheckoutContext,
  type PaymentOutcome,
} from './checkout-model'

const money = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    amount === 0 ? 0 : amount / 100,
  )

export function CheckoutReferencePage() {
  const location = useLocation()
  const context =
    new URLSearchParams(location.search).get('context') === 'subscription'
      ? 'subscription'
      : 'download'
  return <Checkout key={context} context={context} />
}

function Checkout({ context }: { context: CheckoutContext }) {
  const [state, dispatch] = useReducer(checkoutReducer, context, initialCheckout)
  const [outcome, setOutcome] = useState<PaymentOutcome>('success')
  const [checkOutcome, setCheckOutcome] = useState<'confirmed' | 'unpaid' | 'unresolved'>(
    'confirmed',
  )
  const [leaving, setLeaving] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const exitButton = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const subscription = context === 'subscription'
  const mutable = ['selection', 'review', 'declined', 'cancelled'].includes(state.phase)
  const committed = !mutable
  const quote = committed && state.request ? state.request.quote : state.quote
  const dirty = state.phase !== 'selection' && state.phase !== 'complete'
  const titles = {
    selection: 'Choose your order',
    review: 'Review before payment',
    pending: 'Payment in progress',
    verification: 'Additional verification required',
    declined: 'Payment not completed',
    cancelled: 'Verification cancelled',
    unknown: 'Payment outcome unknown',
    paid: 'Payment confirmed; delivery pending',
    complete: 'Order complete',
  }
  useEffect(() => {
    if (state.phase !== 'pending') return
    const timer = window.setTimeout(
      () => dispatch({ type: 'payment-result', attempt: state.attempt, outcome }),
      900,
    )
    return () => window.clearTimeout(timer)
  }, [state.phase, state.attempt, outcome])
  useEffect(() => {
    if (!state.checking) return
    const timer = window.setTimeout(
      () =>
        dispatch({
          type: 'check-result',
          attempt: state.attempt,
          checkSequence: state.checkSequence,
          outcome: checkOutcome,
        }),
      700,
    )
    return () => window.clearTimeout(timer)
  }, [state.checking, state.attempt, state.checkSequence, checkOutcome])
  useEffect(() => {
    if (state.phase !== 'pending') heading.current?.focus()
  }, [state.phase])
  useEffect(() => {
    if (!dirty) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])
  return (
    <BatchReferenceFrame
      title={subscription ? 'Subscription checkout' : 'Digital purchase checkout'}
      note="Simulation only: no card fields, provider connection, charge, order, or subscription. Fictional USD prices and tax. State is in memory; leaving or reloading resets this preview."
      controls={
        <>
          <Select
            label="Payment scenario"
            value={outcome}
            disabled={!mutable}
            onChange={(event) => setOutcome(event.target.value as PaymentOutcome)}
            options={[
              { value: 'success', label: 'Confirmed' },
              { value: 'declined', label: 'Declined' },
              { value: 'verification', label: 'Verification' },
              { value: 'unknown', label: 'Unknown' },
              { value: 'fulfillment-pending', label: 'Paid; pending' },
            ]}
          />
          <Select
            label="Result check scenario"
            value={checkOutcome}
            disabled={state.checking || state.phase === 'pending' || state.phase === 'complete'}
            onChange={(event) => setCheckOutcome(event.target.value as typeof checkOutcome)}
            options={[
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'unresolved', label: 'Unresolved' },
              { value: 'unpaid', label: 'Not paid', disabled: state.phase === 'paid' },
            ]}
          />
          <Select
            label="Quote scenario"
            value={state.availability}
            disabled={!mutable}
            onChange={(event) =>
              dispatch({
                type: 'availability',
                availability: event.target.value as typeof state.availability,
              })
            }
            options={[
              { value: 'current', label: 'Current quote' },
              { value: 'stale', label: 'Expired quote' },
              { value: 'unavailable', label: 'Unavailable' },
            ]}
          />
          <Link href={`/examples/checkout?context=${subscription ? 'download' : 'subscription'}`}>
            Open {subscription ? 'digital purchase' : 'subscription'} context
          </Link>
        </>
      }
    >
      <PageHeader
        title={
          subscription
            ? 'Subscribe to the sample editorial service'
            : 'Purchase the sample digital library'
        }
        description={
          subscription
            ? 'Review the first payment and monthly renewal commitment.'
            : 'Review a one-time purchase with digital delivery and no shipping.'
        }
      />
      <FlowStepNavigation
        label="Checkout steps"
        busy={state.phase === 'pending' || state.checking}
        steps={[
          {
            id: 'selection',
            label: 'Order',
            status: state.phase === 'selection' ? 'current' : 'completed',
            onActivate: state.phase === 'review' ? () => dispatch({ type: 'edit' }) : undefined,
          },
          {
            id: 'review',
            label: 'Review and payment',
            status:
              state.phase === 'selection'
                ? 'blocked'
                : ['review', 'declined', 'cancelled'].includes(state.phase)
                  ? 'current'
                  : 'completed',
          },
          {
            id: 'result',
            label: 'Result',
            status: ['selection', 'review', 'declined', 'cancelled'].includes(state.phase)
              ? 'blocked'
              : 'current',
          },
        ]}
      />
      <h2 ref={heading} tabIndex={-1} className="m-0 text-heading-lg font-semibold break-words">
        {titles[state.phase]}
      </h2>
      <p role="status" aria-live="polite">
        {state.message}
      </p>
      {state.phase === 'selection' && (
        <FormSection
          title="Order details"
          description={
            subscription
              ? 'Choose the number of monthly service seats.'
              : 'Choose the number of one-time digital licenses.'
          }
        >
          <Select
            label={subscription ? 'Service seats' : 'Digital licenses'}
            value={String(quote.quantity)}
            onChange={(event) =>
              dispatch({ type: 'quantity', quantity: Number(event.target.value) })
            }
            options={[1, 2, 3].map((value) => ({ value: String(value), label: String(value) }))}
          />
        </FormSection>
      )}
      <OrderSummary
        title={committed ? 'Submitted order' : 'Order summary'}
        currency="USD"
        availability={state.availability}
        notice={
          committed
            ? `Captured quote ${quote.id} for ${state.request?.id}.`
            : `Sample quote ${quote.id}. Amounts are illustrative, not an offer.`
        }
        items={[
          {
            id: context,
            name: subscription
              ? 'Editorial service · monthly seat'
              : 'Digital publishing library · one-time license',
            quantity: String(quote.quantity),
            unitPrice: money(quote.unitAmount),
            lineTotal: money(quote.subtotal),
          },
        ]}
        charges={[
          { id: 'subtotal', label: 'Subtotal', amount: money(quote.subtotal) },
          {
            id: 'discount',
            label: subscription ? 'First-month discount' : 'Multi-license discount',
            amount: money(-quote.discount),
          },
          { id: 'tax', label: 'Illustrative tax', amount: money(quote.tax) },
          { id: 'shipping', label: 'Shipping (digital delivery)', amount: money(0) },
        ]}
        total={{
          label: ['paid', 'complete'].includes(state.phase)
            ? 'Paid in this simulation'
            : subscription
              ? 'First payment'
              : 'Total due',
          amount: money(quote.total),
        }}
        recurring={
          subscription ? (
            <p>
              Renews monthly at <bdi>{money(quote.renewalTotal!)} USD</bdi> for {quote.quantity}{' '}
              {quote.quantity === 1 ? 'seat' : 'seats'}, including illustrative tax and without the
              introductory discount. First renewal is one month after activation. This sample
              assumes renewal until cancellation before the next billing period; cancellation
              settings are not implemented. No real subscription is created.
            </p>
          ) : (
            <p>
              One-time payment. No recurring charge. Delivery is a simulated library-access
              confirmation, not a real download.
            </p>
          )
        }
        corrections={
          state.phase === 'review' ? (
            <Button variant="outline" onClick={() => dispatch({ type: 'edit' })}>
              Change order quantity
            </Button>
          ) : undefined
        }
      />
      {mutable && (
        <Button variant="outline" onClick={() => dispatch({ type: 'refresh' })}>
          Load changed quote (+$4.00 per item)
        </Button>
      )}
      {state.phase === 'selection' && (
        <Button
          disabled={state.availability !== 'current'}
          onClick={() => dispatch({ type: 'review' })}
        >
          Review order
        </Button>
      )}
      {state.phase === 'review' && (
        <FormSection
          title="Payment review"
          description="Demo payment method: no payment data is entered or stored. In a real product, a secure payment provider would handle payment details."
        >
          <Checkbox
            id="checkout-review"
            label={
              subscription
                ? 'I reviewed the sample first payment and monthly renewal amount.'
                : 'I reviewed the sample items and total.'
            }
            description="This acknowledges the preview only; it does not accept a real agreement."
            checked={state.acknowledged}
            disabled={state.availability !== 'current'}
            onChange={(event) => dispatch({ type: 'acknowledge', value: event.target.checked })}
          />
          <Button
            disabled={state.availability !== 'current' || !state.acknowledged}
            onClick={() => dispatch({ type: 'submit' })}
          >
            {state.availability === 'current'
              ? `Simulate payment of ${money(quote.total)} USD`
              : state.availability === 'stale'
                ? 'Refresh quote before payment'
                : 'Payment unavailable'}
          </Button>
        </FormSection>
      )}
      {state.phase === 'pending' && <Progress label="Waiting for sample payment outcome" />}
      {['declined', 'cancelled'].includes(state.phase) && (
        <Button
          disabled={state.availability !== 'current'}
          onClick={() => dispatch({ type: 'review' })}
        >
          Review before retrying
        </Button>
      )}
      {state.phase === 'verification' && (
        <section aria-labelledby="provider-step" className="space-y-scale-4">
          <h3 id="provider-step" className="text-heading-md font-semibold">
            Simulated provider step
          </h3>
          <p>
            This local panel represents a provider handoff. No real provider or security challenge
            is opened. A return alone is not proof of payment.
          </p>
          <div className="flex flex-wrap gap-scale-3">
            <Button onClick={() => dispatch({ type: 'verify' })}>Simulate provider return</Button>
            <Button variant="outline" onClick={() => dispatch({ type: 'cancel-verification' })}>
              Cancel sample verification
            </Button>
          </div>
        </section>
      )}
      {['unknown', 'paid'].includes(state.phase) && (
        <section aria-labelledby="check-payment" className="space-y-scale-4">
          <h3 id="check-payment" className="text-heading-md font-semibold">
            Check the existing attempt
          </h3>
          <p>
            Attempt <bdi>{state.request?.id}</bdi>.{' '}
            {state.phase === 'paid'
              ? `Receipt ${state.receipt}. Payment is confirmed, but delivery has not completed.`
              : 'There is no confirmed receipt yet. Payment may have succeeded.'}{' '}
            Checking reuses this attempt and never starts another payment. Real support would
            reconcile this identifier with the provider.
          </p>
          <Button disabled={state.checking} onClick={() => dispatch({ type: 'check' })}>
            Check simulated result
          </Button>
          {state.checking && <Progress label="Checking existing attempt" />}
        </section>
      )}
      {state.phase === 'complete' && (
        <CompletionSummary
          title="Sample order confirmed"
          description={
            subscription
              ? 'Sample payment and service activation are confirmed. No real subscription was created.'
              : 'Sample payment and digital delivery are confirmed. No real purchase or download was created.'
          }
          details={[
            { id: 'receipt', label: 'Simulated receipt', value: state.receipt },
            { id: 'attempt', label: 'Payment attempt', value: state.request?.id },
            { id: 'amount', label: 'Simulated amount paid', value: `${money(quote.total)} USD` },
          ]}
          nextSteps={<Link href="/docs/templates/checkout">Read the Checkout contract</Link>}
        />
      )}
      <Button
        ref={exitButton}
        variant="outline"
        onClick={() => (dirty ? setLeaving(true) : navigate('/docs/templates'))}
      >
        Leave checkout
      </Button>
      <AlertDialog
        open={leaving}
        onClose={() => setLeaving(false)}
        onConfirm={() => navigate('/docs/templates')}
        returnFocusRef={exitButton}
        title="Leave this checkout preview?"
        description="This preview will lose its in-memory order and outcome. In a real checkout, leaving does not cancel a payment already submitted; reconcile the existing attempt before paying again."
        confirmLabel="Leave preview"
        cancelLabel="Keep reviewing"
      />
    </BatchReferenceFrame>
  )
}
