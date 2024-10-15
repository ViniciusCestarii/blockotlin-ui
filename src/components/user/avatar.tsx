'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { formatUserInitials } from '@/lib/format'
import { cn } from '@/lib/style/utils'
import { AvatarProps } from '@radix-ui/react-avatar'

interface UserAvatarProps extends AvatarProps {}

const UserAvatar = ({ className, ...props }: UserAvatarProps) => {
  const { auth } = useAuth()
  if (!auth) return null

  return (
    <Avatar {...props} className={cn('size-10', className)}>
      <AvatarImage src={auth?.avatar} alt="foto de perfil" />
      <AvatarFallback>{formatUserInitials(auth)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
