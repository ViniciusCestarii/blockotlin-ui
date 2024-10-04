import Product from '@/app/(main)/product'
import { Card, CardHeader } from '@/components/ui/card'
import { fetchProducts } from '@/lib/product/fetch'
import { HeartCrack } from 'lucide-react'
import React from 'react'
import ProductSkeleton from './product-skeleton'
import { cn } from '@/lib/style/utils'

interface ProductListProps {
  search: string
}

const ProductList = async ({ search }: ProductListProps) => {
  const products = await fetchProducts(search)

  if (!products || products.length === 0) {
    return (
      <Card className="max-w-lg mx-auto mt-6">
        <CardHeader className="flex flex-col items-center">
          <HeartCrack size={48} />
          <p className="text-center">
            Nenhum produto encontrado para a busca &quot;{search}&quot;
          </p>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export const ProductListSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {[...Array(16)].map((_, index) => (
      <ProductSkeleton
        key={index}
        className={cn(index > 7 && 'hidden sm:block')}
      />
    ))}
  </div>
)

export default ProductList
