import Product from '@/app/(main)/product'
import { Card, CardHeader } from '@/components/ui/card'
import { fetchProducts } from '@/lib/product/fetch'
import { HeartCrack } from 'lucide-react'
import React from 'react'

interface ProductListProps {
  search: string
}

const ProductList = async ({ search }: ProductListProps) => {
  const products = await fetchProducts(search)

  if (!products || products.length === 0) {
    return (
      <Card className="max-w-lg mx-auto pt-6">
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

export default ProductList
