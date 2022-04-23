import { Product } from '@stripe/firestore-stripe-payments'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { goToBillingPortal, loadCheckout } from '../lib/stripe'
import Loader from './Loader'

interface Props {
  products: Product[]
}

const Plans: React.FC<Props> = ({ products }) => {
  const { user } = useAuth()
  const [isBillingLoading, setBillingLoading] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const subscription = useSubscription(user)

  const subscribeToPlan = async (priceId: string, prodId: string) => {
    setBillingLoading(true)
    setSelectedPlan(prodId)
    loadCheckout(priceId)
  }

  const manageSubscription = (prodId: string) => {
    setBillingLoading(true)
    setSelectedPlan(prodId)
    goToBillingPortal()
  }

  return (
    <div className="space-y-8 px-2">
      {subscription && (
        <p className="-mb-2">
          Renewal Date:{' '}
          {new Date(subscription.current_period_end).toLocaleDateString()}
        </p>
      )}
      {products.map((prod) => {
        const isCurrentPackage = prod.name
          .toLowerCase()
          .includes(subscription?.role!)

        return (
          <div className="flex items-center justify-between" key={prod.id}>
            <div>
              <h3 className="font-semibold">{prod.name}</h3>
              <h4 className="text-sm">{prod.description}</h4>
            </div>

            {!isCurrentPackage ? (
              <button
                disabled={isBillingLoading && prod.id === selectedPlan}
                className={`nfBtn w-3/12 ${
                  isBillingLoading && prod.id === selectedPlan && 'opacity-60'
                }`}
                onClick={() =>
                  !isCurrentPackage && subscription
                    ? manageSubscription(prod.id)
                    : subscribeToPlan(prod.prices[0].id, prod.id)
                }
              >
                {isBillingLoading && prod.id === selectedPlan ? (
                  <Loader color="dark:fill-gray-300" />
                ) : (
                  'Subscribe'
                )}
              </button>
            ) : (
              <button
                disabled
                className="w-3/12 rounded-sm bg-[gray] p-2 font-semibold text-gray-300"
              >
                Current Plan
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Plans
