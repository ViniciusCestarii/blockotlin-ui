import { searchParamsCache } from './search-params'
import ProductList from './product-list'
import { Suspense } from 'react'

export default function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  return (
    <main className="container mx-auto">
      <section className="px-4">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <ProductList search={parsedSearchParams.search} />
        </Suspense>
      </section>
    </main>
  )
}
