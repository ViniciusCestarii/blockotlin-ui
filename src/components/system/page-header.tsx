import { cn } from '@/lib/utils'
import React from 'react'

interface MainHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const MainHeader = ({ className, children, ...props }: MainHeaderProps) => {
  return (
    <header
      {...props}
      className={cn(
        'px-4 lg:px-6 h-14 border-b sticky top-0 z-10 shadow-lg backdrop-blur-md bg-background/70',
        className,
      )}
    >
      <div {...props} className={cn('w-full container mx-auto', className)}>
        {children}
      </div>
    </header>
  )
}

export default MainHeader
