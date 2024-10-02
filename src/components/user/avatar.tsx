'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { User } from 'lucide-react'

const UserAvatar = () => {
  const { auth } = useAuth()
  const initials = auth?.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <Avatar className="size-10">
      <AvatarImage src={auth?.avatar} alt="foto de perfil" />
      <AvatarFallback>{initials ?? <User className="size-5" />}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
