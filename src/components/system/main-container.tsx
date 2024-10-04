import { cn } from '@/lib/style/utils'
import React from 'react'

interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const MainContainer = ({
  className,
  children,
  ...props
}: MainContainerProps) => {
  return (
    <main {...props} className={cn('container mx-auto px-4 pt-4', className)}>
      {children}
    </main>
  )
}

export default MainContainer
