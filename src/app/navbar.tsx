import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user/avatar'
import { Bell, Bitcoin, Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 z-10 shadow-lg backdrop-blur-md bg-background/70">
      <Link className="flex items-center justify-center" href="/">
        <Bitcoin className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">Blockotlin</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Markets
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Portfolio
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          News
        </Link>
      </nav>
      <div className="flex gap-2 ml-4">
        <Button size="icon" variant="ghost">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <button>
          <span className="sr-only">User</span>
          <UserAvatar />
        </button>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}

export default Navbar
