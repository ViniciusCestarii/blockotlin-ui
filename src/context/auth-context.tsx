'use client'

import { verifyToken } from '@/lib/auth/actions'
import { Account } from '@/lib/auth/types'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface AuthContextType {
  auth: Account | null
  updateAuth: (account: Account | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Account | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const account = await verifyToken()

      if (account) {
        setAuth(account)
      }
    }

    checkAuth()
  }, [])

  const updateAuth = (account: Account | null) => {
    setAuth(account)
  }

  const value = {
    auth,
    updateAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
