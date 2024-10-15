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
          <DropdownMenuItem>Configurações</DropdownMenuItem>
          <Link href="/cart">
            <DropdownMenuItem>Carrinho</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatarDropdown
