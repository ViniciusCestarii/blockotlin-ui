import { searchParamsCache } from './search-params'
import ProductList from './product-list'
import { Suspense } from 'react'
import { FeaturedProductList } from './featured-product-list'
import MainContainer from '@/components/system/main-container'
import TypographyH2 from '@/components/ui/typography-h2'

export default function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const { search } = parsedSearchParams

  return (
    <MainContainer>
      {!search && (
        <section>
          <TypographyH2>Produtos destaque</TypographyH2>
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
        <TypographyH2>Featured Electronics</TypographyH2>
        <Suspense fallback={<p>Loading...</p>}>
          <FeaturedProductList search="2" />
        </Suspense>
      </section>
      <section>
        <TypographyH2>Featured Jewerly</TypographyH2>
        <Suspense fallback={<p>Loading...</p>}>
          <FeaturedProductList search="gold" />
        </Suspense>
      </section> */}
    </MainContainer>
  )
}
