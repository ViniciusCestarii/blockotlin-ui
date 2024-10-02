'use client'

import { useAuth } from '@/context/auth-context'
import Signup from './signup'
import UserAvatar from './avatar'
import Login from './login'

const UserNavbarOptions = () => {
  const { auth } = useAuth()

  if (!auth) {
    return (
      <div className="flex gap-4 items-center">
        <Login />
        <Signup />
      </div>
    )
  }
  return <UserAvatar />
}

export default UserNavbarOptions
