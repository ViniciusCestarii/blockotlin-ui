import { searchParamsCache } from './search-params'
import ProductList, { ProductListSkeleton } from './product-list'
import { Suspense } from 'react'
import {
  FeaturedProductList,
  FeaturedProductListSkeleton,
} from './featured-product-list'
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
          <TypographyH2>Produtos em destaque</TypographyH2>
          <Suspense fallback={<FeaturedProductListSkeleton />}>
            <FeaturedProductList />
          </Suspense>
        </section>
      )}
      <section>
        <TypographyH2>Produtos</TypographyH2>
        <Suspense fallback={<ProductListSkeleton />}>
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
