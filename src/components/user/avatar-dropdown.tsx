import { useAuth } from '@/context/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import UserAvatar from './avatar'
import { formatUserName } from '@/lib/format'
import AdminOnly from '../system/admin-only'
import ClientOnly from '../system/client-only'

const UserAvatarDropdown = () => {
  const { auth } = useAuth()
  if (!auth) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <UserAvatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{formatUserName(auth)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/me">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
          </Link>
          <AdminOnly>
            <Link href="/admin/dashboard">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
          </AdminOnly>
          <AdminOnly>
            <Link href="/admin/products">
              <DropdownMenuItem>Gerenciar produtos</DropdownMenuItem>
            </Link>
          </AdminOnly>
          <ClientOnly>
            <Link href="/cart">
              <DropdownMenuItem>Carrinho</DropdownMenuItem>
            </Link>
          </ClientOnly>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatarDropdown
