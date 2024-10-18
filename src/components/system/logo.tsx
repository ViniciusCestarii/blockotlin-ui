import { cn } from '@/lib/style/utils'
import { Bitcoin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  heading?: boolean
}

const Logo = ({ className, heading, ...props }: LogoProps) => {
  const Comp = heading ? 'h1' : 'span'
  return (
    <Link
      {...props}
      className={cn('flex items-center justify-center', className)}
      href="/"
    >
      <Bitcoin className="h-6 w-6" />
      <Comp className="ml-2 text-lg font-bold">Blockotlin</Comp>
    </Link>
  )
}

export default Logo
