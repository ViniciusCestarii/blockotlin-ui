import React from 'react'
import Product from './product'
import { fetchProducts } from '../fetch'

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
