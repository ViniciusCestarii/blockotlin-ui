import { fetchProducts } from '@/lib/product/fetch'
import Image from 'next/image'
import { searchParamsCache } from './search-params'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const products = await fetchProducts(parsedSearchParams.search)

  return (
    <main className="container mx-auto">
      <section className="px-4">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products?.map((product) => (
            <article
              key={product.id}
              className="border rounded-md overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover aspect-[1/1.2]"
              />
              <div className="px-3 py-2">
                <h3
                  title={product.title}
                  className="h-6 text-sm text-ellipsis whitespace-nowrap overflow-hidden"
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
          ))}
        </div>
      </section>
    </main>
  )
}
