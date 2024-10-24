import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import UserNavbarOptions from '../user/navbar-options'
import ClientOnly from './client-only'

interface MainNavProps extends React.HTMLAttributes<HTMLDivElement> {}

const MainNav = (props: MainNavProps) => {
  return (
    <nav {...props}>
      <ul className="flex gap-4 items-center">
        <ClientOnly>
          <li>
            <Button size="icon" variant="ghost" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Carrinho</span>
              </Link>
            </Button>
          </li>
        </ClientOnly>
        <li>
          <UserNavbarOptions />
        </li>
      </ul>
    </nav>
  )
}

export default MainNav
