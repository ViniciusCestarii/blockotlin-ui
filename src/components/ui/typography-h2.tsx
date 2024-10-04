import { cn } from '@/lib/style/utils'
import React from 'react'

interface TypographyH2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const TypographyH2 = ({ className, children, ...props }: TypographyH2Props) => {
  return (
    <h2 {...props} className={cn('text-3xl font-bold', className)}>
      {children}
    </h2>
  )
}

export default TypographyH2
