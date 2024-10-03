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
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {products?.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-2 basis-1/3 sm:basis-1/4 lg:basis-1/6"
          >
            <Product product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  )
}
