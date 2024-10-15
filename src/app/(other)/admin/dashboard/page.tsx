import {
  FeaturedProductList,
  FeaturedProductListSkeleton,
} from '@/components/product/featured-product-list'
import MainContainer from '@/components/system/main-container'
import TypographyH2 from '@/components/ui/typography-h2'
import { Suspense } from 'react'

export default function AdminDashboardPage() {
  return (
    <MainContainer>
      <section>
        <TypographyH2>Produtos em destaque</TypographyH2>
        <Suspense fallback={<FeaturedProductListSkeleton />}>
          <FeaturedProductList />
        </Suspense>
      </section>
      <section>
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
      </section>
    </MainContainer>
  )
}
