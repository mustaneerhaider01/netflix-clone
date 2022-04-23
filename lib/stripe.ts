import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { app } from '../firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

const payments = getStripePayments(app, {
  customersCollection: 'customers',
  productsCollection: 'products',
})

export const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((session) => window.location.assign(session.url))
    .catch((err) => alert(`An error occured ${err.message}`))
}

export const goToBillingPortal = async () => {
  const instance = getFunctions(app, 'us-central1')
  const functionRef = httpsCallable(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  )

  await functionRef({
    returnUrl: `${window.location.origin}/profile`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((err) => alert(err.message))
}

export default payments
