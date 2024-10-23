import React from 'react'
import { Product as ProductType } from '../../lib/product/types'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/style/utils'
import AdminOnly from '../system/admin-only'
import EditProductDialog from './edit-product-dialog'
import { Edit2 } from 'lucide-react'

export interface ProductProps {
  product: ProductType
  size?: 'default' | 'sm'
}

const ProductBase = ({ product, size = 'default' }: ProductProps) => {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <article className="rounded-md overflow-hidden h-full">
        <div className="w-full h-fit bg-white">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={480}
            className="object-contain aspect-[1/1.2]"
          />
        </div>
        <div className="px-3 py-2">
          <h3
            title={product.name}
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
            }}
            className={cn(
              'max-h-9 leading-4 text-sm text-ellipsis overflow-hidden hover:underline group-hover:underline',
              size === 'sm' && 'text-xs lg:text-sm',
            )}
          >
            {product.name}
          </h3>
          <span
            className={cn(
              'font-bold text-2xl',
              size === 'sm' && 'text-xl lg:text-2xl',
            )}
          >
            <span className="sr-only">Preço</span>
            {formatPrice(product.price)}
          </span>
        </div>
      </article>
    </Link>
  )
}

const Product = (props: ProductProps) => {
  return (
    <div className="relative">
      <ProductBase {...props} />
      <AdminOnly>
        <EditProductDialog
          product={props.product}
          buttonProps={{
            className: cn(
              'absolute top-1 right-1 bg-transparent group',
              props.size === 'sm' && 'scale-75 top-[0.125rem] right-[0.125rem]',
            ),
            size: 'icon',
            children: (
              <Edit2 className="text-background group-hover:text-inherit transition-colors" />
            ),
          }}
        />
      </AdminOnly>
    </div>
  )
}

export default Product
