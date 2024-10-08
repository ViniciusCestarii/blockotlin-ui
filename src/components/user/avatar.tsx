'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { User } from 'lucide-react'

const UserAvatar = () => {
  const { auth } = useAuth()
  const initials = auth
    ? auth?.firstName?.charAt(0) + auth?.lastName?.charAt(0)
    : null

  return (
    <button>
      <span className="sr-only">Usuário</span>
      <Avatar className="size-10">
        <AvatarImage src={auth?.avatar} alt="foto de perfil" />
        <AvatarFallback>
          {initials ?? <User className="size-5" />}
        </AvatarFallback>
      </Avatar>
    </button>
  )
}

export default UserAvatar
