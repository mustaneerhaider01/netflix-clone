import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import type { GetStaticProps, NextPage } from 'next'
import Header from '../components/Header'
import Plans from '../components/Plans'
import { useAuth } from '../hooks/useAuth'
import payments from '../lib/stripe'

interface ProfileProps {
  products: Product[]
}

const Profile: NextPage<ProfileProps> = ({ products }) => {
  const { user, logout } = useAuth()

  return (
    <div className="pb-10">
      <Header />

      <main
        className="mx-4 max-w-3xl pt-[20%] text-white md:mx-auto md:pt-[13%] 
      lg:pt-[8%]"
      >
        <div>
          <h1 className="mb-5 border-b pb-1 text-5xl">Edit Profile</h1>

          <div className="flex space-x-5">
            {/* Avatar */}
            <img
              className="h-28 cursor-pointer object-contain"
              src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
              alt=""
            />

            {/* Details */}
            <div className="flex flex-1 flex-col">
              <h2 className="bg-[gray] p-4 text-lg font-semibold">
                {user?.email}
              </h2>
              <h3 className="mt-5 mb-2 border-b pb-1 text-2xl">Plans</h3>
              <Plans products={products} />
              <button className="nfBtn mt-10" onClick={() => logout()}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  }).then((res) => res)

  return {
    props: {
      products,
    },
  }
}

export default Profile
