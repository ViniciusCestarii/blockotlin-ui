import MainContainer from '@/components/system/main-container'
import TypographyH2 from '@/components/ui/typography-h2'
import { FeaturedProductList } from '../../components/product/featured-product-list'
import ProductList from '../../components/product/product-list'
import { searchParamsCache } from './search-params'

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
          <FeaturedProductList />
        </section>
      )}
      <section>
        <TypographyH2>Produtos</TypographyH2>
        <ProductList search={search} />
      </section>
    </MainContainer>
  )
}
