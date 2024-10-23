'use client'

import { useAuth } from '@/context/auth-context'
import Signup from './signup'
import Login from './login'
import UserAvatarDropdown from './avatar-dropdown'

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
  return <UserAvatarDropdown />
}

export default UserNavbarOptions
