import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

export const toastStyle = {
  backgroundColor: 'white',
  color: 'black',
  fontSize: '16px',
  borderRadius: '9999px',
  padding: '15px',
  fontWeight: 'bold',
}

interface FormInputs {
  email: string
  password: string
}

const Auth: React.FC = ({}) => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const { login, signUp } = useAuth()
  const router = useRouter()

  const submitHandler: SubmitHandler<FormInputs> = ({ email, password }) => {
    if (isLogin) {
      login(email, password)
        .then(() => {
          router.replace('/')
        })
        .catch((err) => alert(err.message))
    } else {
      signUp(email, password)
        .then((_) => {
          router.replace('/')
          toast.success('Account created succesfully.', {
            duration: 3000,
            style: toastStyle,
            position: 'bottom-center',
          })
        })
        .catch((err) => alert(err.message))
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-w-[300px] bg-black/75 py-10 px-12 md:min-w-[400px]">
        <h1 className="mb-3 text-left text-2xl font-semibold">Sign in</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3 flex flex-col ">
            <input
              {...registerField('email', { required: true })}
              type="email"
              placeholder="Email Address"
              className={`rounded bg-zinc-900 p-3 outline-none ${
                errors.email && 'border-b-2 border-red-500'
              }`}
            />
            {errors.email && (
              <p className="p-1 text-[13px] text-red-500">
                Please enter a valid email.
              </p>
            )}
          </div>
          <div className="mb-6 flex flex-col ">
            <input
              {...registerField('password', { required: true, min: 6 })}
              type="password"
              placeholder="Password"
              className={`rounded bg-zinc-900 p-3 outline-none ${
                errors.password && 'border-b-2 border-red-500'
              }`}
            />
            {errors.password && (
              <p className="p-1 text-[13px] text-red-500">
                Password should be atleast 6 characters.
              </p>
            )}
          </div>
          <button
            className="mb-5 w-full rounded bg-red-600 p-3 font-semibold text-white hover:bg-red-700"
            type="submit"
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>

          <div className="text-left font-semibold">
            <span className="text-stone-400">New to Netflix?</span>{' '}
            <button
              type="submit"
              className="cursor-pointer hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Sign up now.
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Auth
