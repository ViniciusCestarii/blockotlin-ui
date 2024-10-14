'use client'

import { verifyToken } from '@/lib/auth/fetch'
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
  account?: Account | null
}

export const AuthProvider = ({
  children,
  account = null,
}: AuthProviderProps) => {
  const [auth, setAuth] = useState<Account | null>(account)

  const updateAuth = (account: Account | null) => {
    setAuth(account)
  }

  const value = {
    auth,
    updateAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
