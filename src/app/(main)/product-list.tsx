import Product from '@/app/(main)/product'
import { fetchProducts } from '@/lib/product/fetch'
import React from 'react'

interface ProductListProps {
  search: string
}

const ProductList = async ({ search }: ProductListProps) => {
  const products = await fetchProducts(search)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
