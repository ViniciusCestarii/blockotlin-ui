import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/style/utils'

interface ProductSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProductSkeleton = ({ className, ...props }: ProductSkeletonProps) => (
  <div {...props} className={cn('space-y-2', className)}>
    <Skeleton className="w-full aspect-[1/1.2] rounded-b-none" />
    <Skeleton className="w-full h-6" />
  </div>
)

export default ProductSkeleton
