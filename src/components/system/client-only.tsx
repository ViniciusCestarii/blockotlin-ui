'use client'

import { useAuth } from '@/context/auth-context'

interface ClientOnlyProps {
  children: React.ReactNode
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const { auth } = useAuth()

  if (auth?.role === 'ADMIN') {
    return null
  }

  return children
}

export default ClientOnly
