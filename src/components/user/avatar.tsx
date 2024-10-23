'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { formatUserInitials } from '@/lib/format'
import { cn } from '@/lib/style/utils'
import { AvatarProps } from '@radix-ui/react-avatar'
import { Cog } from 'lucide-react'
import AdminOnly from '../system/admin-only'

interface UserAvatarProps extends AvatarProps {}

const UserAvatar = ({ className, ...props }: UserAvatarProps) => {
  const { auth } = useAuth()
  if (!auth) return null

  return (
    <Avatar
      {...props}
      className={cn('size-10 relative overflow-visible', className)}
    >
      <AvatarImage src={auth?.avatar} alt="foto de perfil" />
      <AvatarFallback>{formatUserInitials(auth)}</AvatarFallback>
      <AdminOnly>
        <Cog className="absolute -bottom-1 -right-1 size-4 bg-foreground text-background rounded-full" />
      </AdminOnly>
    </Avatar>
  )
}

export default UserAvatar
