import { cn } from '@/lib/style/utils'
import { Bitcoin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {}

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <Link
      {...props}
      className={cn('flex items-center justify-center', className)}
      href="/"
    >
      <Bitcoin className="h-6 w-6" />
      <span className="ml-2 text-lg font-bold">Blockotlin</span>
    </Link>
  )
}

export default Logo
