import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { fetchProducts } from '@/lib/product/fetch'
import Product from './product'
import ProductSkeleton from './product-skeleton'

interface FeaturedProductListProps {
  search?: string
}

export async function FeaturedProductList({
  search,
}: FeaturedProductListProps) {
  const products = await fetchProducts(search)

  return (
    <Carousel
      autoplay={{
        delay: 2000,
        stopOnInteraction: true,
      }}
      opts={{
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-3">
        {products?.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-3 basis-1/3 sm:basis-1/4 lg:basis-1/6"
          >
            <Product product={product} size="sm" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  )
}

export const FeaturedProductListSkeleton = () => (
  <div className="flex space-x-3">
    <ProductSkeleton className="w-52 aspect-[1/1.2] hidden sm:block" />
    <ProductSkeleton className="w-52 aspect-[1/1.2] hidden lg:block" />
    <ProductSkeleton className="w-52 aspect-[1/1.2] hidden lg:block" />
    <ProductSkeleton className="w-52 aspect-[1/1.2]" />
    <ProductSkeleton className="w-52 aspect-[1/1.2]" />
    <ProductSkeleton className="w-52 aspect-[1/1.2]" />
  </div>
)
