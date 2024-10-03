import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { StarIcon } from 'lucide-react'
import { fetchProduct } from '@/lib/product/fetch'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/format'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProduct(params.id)

  if (!product) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6 md:px-8 lg:py-10">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="h-full bg-white flex items-center justify-center rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="w-full object-cover rounded-lg"
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              {product.description}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                4.3 (123 reviews)
              </span>
            </div>
            <div className="text-4xl font-bold">
              {formatPrice(product.price)}
            </div>
          </div>
          <Button size="lg" className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-12 md:mt-16 lg:mt-20 grid gap-8 lg:gap-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Product Specifications
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Material</div>
              <div>60% combed ringspun cotton, 40% polyester</div>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">Size</div>
              <div>S, M, L, XL</div>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">Color</div>
              <div>Black, White, Blue</div>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">Care Instructions</div>
              <div>Machine wash cold, tumble dry low</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Customer Reviews</h2>
          <div className="mt-4 grid gap-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I&apos;ve been wearing this t-shirt for a few weeks now and
                  it&apos;s quickly become one of my favorites. The fabric is
                  soft and breathable, and the fit is perfect. Highly recommend!
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Alex Smith</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I&apos;m really impressed with the quality of this t-shirt.
                  The fabric is durable and the design is stylish. I&apos;ve
                  washed it several times and it still looks great.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
