import React from 'react'
import { Product as ProductType } from '../../lib/product/types'
import Image from 'next/image'

interface ProductProps {
  product: ProductType
}

const Product = ({ product }: ProductProps) => {
  return (
    <article className="border rounded-md overflow-hidden h-full">
      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={480}
        className="object-cover aspect-[1/1.2]"
      />
      <div className="px-3 py-2">
        <h3
          title={product.title}
          style={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
          }}
          className="max-h-8 leading-4 text-sm text-ellipsis overflow-hidden"
        >
          {product.title}
        </h3>
        <span className="font-bold text-3xl">
          <span className="sr-only">Price</span>
          {product.price.toLocaleString('pt', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
    </article>
  )
}

export default Product
