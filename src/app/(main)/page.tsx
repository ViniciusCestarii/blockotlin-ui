import { searchParamsCache } from './search-params'
import ProductList from './product-list'
import { Suspense } from 'react'
import { FeaturedProductList } from './featured-product-list'

export default function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const { search } = parsedSearchParams

  return (
    <main className="container mx-auto px-4">
      {!search && (
        <section>
          <h2 className="text-3xl font-bold">Produtos destaque</h2>
          <Suspense fallback={<p>Loading...</p>}>
            <FeaturedProductList />
          </Suspense>
        </section>
      )}
      <section>
        <h2 className="text-3xl font-bold">Produtos</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <ProductList search={search} />
        </Suspense>
      </section>
      {/* <section>
        <h2 className="text-3xl font-bold">Featured Electronics</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <FeaturedProductList search="2" />
        </Suspense>
      </section>
      <section>
        <h2 className="text-3xl font-bold">Featured Jewerly</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <FeaturedProductList search="gold" />
        </Suspense>
      </section> */}
    </main>
  )
}
