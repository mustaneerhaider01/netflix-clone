import type { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import Auth from '../components/Auth'
import { User } from 'firebase/auth'

const Login: NextPage = () => {
  const [signIn, setSignIn] = useState<boolean>(false)

  return (
    <div className="relative h-screen w-screen">
      <img
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        className="fixed left-4 z-20 w-36 cursor-pointer object-contain"
      />
      <button
        className="fixed right-5 top-5 z-20 bg-red-600 py-2 px-5 font-bold text-white hover:bg-red-700"
        onClick={() => setSignIn(true)}
      >
        Sign In
      </button>

      <Image
        src="https://rb.gy/p2hphi"
        alt=""
        layout="fill"
        objectFit="cover"
      />

      <div
        className="absolute top-0 left-0 z-10 h-full w-full 
      bg-[#00000066]"
      />

      <main className="absolute z-10 flex h-full w-full flex-col items-center justify-center p-4 text-center text-white">
        {signIn ? (
          <Auth />
        ) : (
          <>
            <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
              Unlimited films, TV programmes and more.
            </h1>
            <h2 className="mb-7 text-2xl">
              Watch anywhere. Cancel at anytime.
            </h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="mt-5">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="min-w-[200px] p-2 text-gray-600 outline-none md:min-w-[420px]"
                />
                <button
                  className="bg-red-600 py-2 px-5 text-xs font-semibold hover:bg-red-700 md:text-base"
                  onClick={() => setSignIn(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Login
