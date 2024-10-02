'use client'

import {
  verifyToken,
  login as serverLogin,
  logout as serverLogout,
} from '@/lib/auth/fetch'
import { Account, Authenticate } from '@/lib/auth/types'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface AuthContextType {
  auth: Account | null
  login: (auth: Authenticate) => Promise<boolean>
  logout: () => Promise<void>
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

  const login = async (auth: Authenticate) => {
    const account = await serverLogin(auth)

    if (account) {
      setAuth(account)
    }

    return !!account
  }

  const logout = async () => {
    await serverLogout()
  }

  const value = {
    auth,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
