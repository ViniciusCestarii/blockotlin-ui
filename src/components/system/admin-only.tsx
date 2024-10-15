'use client'

import { useAuth } from '@/context/auth-context'

interface AdminOnlyProps {
  children: React.ReactNode
}

const AdminOnly = ({ children }: AdminOnlyProps) => {
  const { auth } = useAuth()

  if (!auth || auth.role !== 'ADMIN') {
    return null
  }

  return children
}

export default AdminOnly
