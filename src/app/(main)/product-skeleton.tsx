import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/style/utils'

interface ProductSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const randomWidth = () => {
  const random = Math.random()
  if (random > 0.5) return 'w-3/4'
  if (random > 0.25) return 'w-1/2'
  return 'w-full'
}

const ProductSkeleton = ({ className, ...props }: ProductSkeletonProps) => {
  return (
    <div
      {...props}
      className={cn(
        'space-y-2 pb-2 lg:pb-3 animate-in fade-in ease-step-end duration-500',
        className,
      )}
    >
      <Skeleton className="w-full aspect-[1/1.2] px-2 rounded-b-none" />
      <Skeleton className="w-full h-8" />
      <Skeleton className={cn('w-full h-6', randomWidth())} />
    </div>
  )
}

export default ProductSkeleton
