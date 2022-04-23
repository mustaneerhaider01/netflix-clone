import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<UserCredential | void>
  login: (email: string, password: string) => Promise<UserCredential | void>
  logout: () => Promise<void>
}

interface AuthProps {
  children: React.ReactNode
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
})

const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        } else {
          setUser(null)
          router.replace('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
