import { searchParamsCache } from '@/app/(main)/search-params'
import CreateProductDialog from '@/components/product/create-product-dialog'
import ProductList, {
  ProductListSkeleton,
} from '@/components/product/product-list'
import SearchProduct from '@/components/product/search-product'
import MainContainer from '@/components/system/main-container'
import TypographyH2 from '@/components/ui/typography-h2'
import { Suspense } from 'react'

export default function AdminProductPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const { search } = parsedSearchParams

  return (
    <MainContainer>
      <section>
        <TypographyH2>Gerenciar produtos</TypographyH2>
        <SearchProduct />
        <CreateProductDialog />
      </section>
      <section>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList search={search} />
        </Suspense>
      </section>
    </MainContainer>
  )
}
